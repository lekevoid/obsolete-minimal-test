import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import T from 'i18n-react';
import Helmet from 'react-helmet';
import router from "../i18n/config/router";

export default function Head({ seo = {}, path, lang }) {
	const availableTrans = useMemo(() => {
		const sanitizedPath = path.replace(/^\/|\/$/g, "") || "/";
		let r = {};

		Object.values(router).map((translations) => {
			if (Object.values(translations).includes(sanitizedPath) || Object.values(translations).includes(sanitizedPath+"/")) {
				Object.keys(translations).map((k) => {
					if (k !== "js" && translations[k] !== "") {
						r[k] = translations[k];
					}
					return true;
				});
			}
			return true;
		});

		return r;
	}, [path]);

	function generateAlternates({site, availableTrans}) {
		let out = [];
		for (const [lang, path] of Object.entries(availableTrans)) {
			out.push(<link rel="alternate" href={site.url+path} hreflang={lang} key={lang} />);
		}
		return out;
	}

	return (
		<StaticQuery
			query={graphql`
				query HeadQuery {
					site {
						siteMetadata {
							title
							description
							type
							name
							url
							sameAs
							facebookAppID
							twitterSiteID
							twitterUserID
						}
					}
				}
			`}
			render = {
				data => {
					const site = data.site.siteMetadata;
					const canonical = (site.url + path).replace("com//", "com/").replace("8000//", "8000/").replace(/\/$/, "");
					const title = seo.title || site.title;
					const description = seo.description || site.description;

					let titleTemplate = `%s | ${site.name}`;
					if (canonical === site.url) {
						titleTemplate = `${site.name} - %s`;
					}

					let featureImageAlt = title;
					let featureImageHeight = 630;
					let featureImageWidth = 1200;

					const l = T.translate("key");

					let filename = path.replace(/\//g, "-").replace(/^-|-$/g, "");

					if (path === "/" || path === "/fr" || path === "/es" || path === "/fr/" || path === "/es/") {
						filename = "company";
					} else if (l !== "en" && availableTrans.en) {
						filename = availableTrans.en.replace(/\//g, "");
					}

					const featureImage = `${site.url}meta/meta.jpg`;

					let robots = "index, follow";
					if (seo.robots) {
						if (seo.robots.includes("noindex")) {
							robots = robots.replace("index", "noindex");
						}
						if (seo.robots.includes("nofollow")) {
							robots = robots.replace("follow", "nofollow");
						}
					}

					var schemaOrgJSONLD = [
						{
							'@context': 'http://schema.org',
							'@type': 'WebSite',
							url: canonical,
							name: title,
							description: description,
							image: featureImage
						},
					]

					if (seo.article) {
						const article = seo.article
						schemaOrgJSONLD.push({
							'@context': 'http://schema.org',
							'@type': 'Article',
							headline: article.title || null,
							image: article.image || null,
							author: article.author || null,
							url: article.url || null,
							paradeer: article.paradeer || null,
							datePublished: article.date.paradeed || null,
							dateCreated: article.date.created || null,
							dateModified: article.date.modified || null,
							description: article.description || null
						})
					}

					return (
						<Helmet titleTemplate={titleTemplate} defaultTitle={title}>
							<html lang={T.translate('key')} />
							<meta charSet="UTF-8" />
							<title>{ title }</title>
							<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=0.86, maximum-scale=1"></meta>
							<meta name="robots" content={robots}></meta>
							<meta name="msapplication-config" content="/browserconfig.xml" />
							<meta name="author" content={seo.author || site.authors} />
							<meta name="description" content={description} />
							<link rel="canonical" href={canonical}></link>
							<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" sizes="180x180" />
							<link rel="icon" href="/icons/favicon-32x32.png" sizes="32x32" type="image/png" />
							<link rel="icon" href="/icons/favicon-16x16.png" sizes="16x16" type="image/png" />
							<link rel="mask-icon" href="/icons/img.svg" color="#663399" />
							<meta property="og:site_name" content={site.title} />
							<meta property="og:locale" content={T.translate('key')} />
							<meta property="og:title" content={title} />
							<meta property="og:type" content={seo.type || 'website'} />
							<meta property="og:description" content={description} />
							<meta property="og:url" content={canonical} />
							<meta property="og:image" content={featureImage} />
							<meta property="og:image:secure_url" content={featureImage} />
							<meta property="og:image:width" content={featureImageWidth} />
							<meta property="og:image:height" content={featureImageHeight} />
							<meta property="og:image:alt" content={featureImageAlt} />
							{/* ARTICLES ; FILL THESE OUT */}
							<meta property="article:section" content="" />
							<meta property="article:author" content={seo.author || site.authors} />
							<meta property="article:paradeed_time" content="" />
							{/* SOCIAL MEDIA */}
							{site.facebookAppID ? (
								<meta property="fb:app_id" content={site.facebookAppID} />
							) : null}
							{site.twitterSiteID ? (
								<meta name="twitter:site" content={site.twitterSiteID} />
							) : null}
							{site.twitterUserID ? (
								<meta name="twitter:creator" content={site.twitterUserID} />
							) : null}
							<meta name="twitter:title" content={title} />
							<meta name="twitter:description" content={description} />
							<meta name="twitter:card" content="summary_large_image" />
							<meta name="twitter:image" content={featureImage} />
							<script type="application/ld+json">
								{JSON.stringify(schemaOrgJSONLD)}
							</script>
							{generateAlternates({site:site, availableTrans:availableTrans})}
						</Helmet>
					)
				}
			}
		/>
	)
}

Head.propTypes = {
	seo: PropTypes.object,
	path: PropTypes.string.isRequired
}