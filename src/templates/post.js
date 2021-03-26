import React , { useMemo } from "react";
import Layout from "@components/layout";
import T from "i18n-react";
import { graphql } from "gatsby";
import classnames from "classnames";
import { blogPostSlug, excerpt, formatDate, htmlChars /*, wpTag*/ } from "@assets/annex";

import CTA from "@components/CTA";
import Form from "@components/Form";
import Hero from "@components/Hero";
import Img from "gatsby-image/withIEPolyfill";
import Link from "@components/LocalizedLink";
import { StickyContainer, Sticky } from "react-sticky";
import Tank from "@components/Tank";
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";

import icon_social_media_email from "@img/icons/img.svg";
import icon_social_media_facebook from "@img/icons/img.svg";
// import icon_social_media_google from "@img/icons/img.svg";
import icon_social_media_linkedin from "@img/icons/img.svg";
// import icon_social_media_slack from "@img/icons/img.svg";
import icon_social_media_twitter from "@img/icons/img.svg";

import "@css/components/Billboard.css";
import "@css/components/PromoBox.css";

export default function BlogPost(props) {
	const {location: {pathname}, data, pageContext: {dico}} = props;

	T.setTexts({
		...dico,
		translations: data.thePost.translations
	});


	const post = useMemo(() => {
		return data.thePost;
	}, [data]);

	const hero = useMemo(() => {
		if (data && post && post.featuredImage && post.featuredImage.node.localFile && post.featuredImage.node.localFile.childImageSharp) {
			return post.featuredImage.node.localFile.childImageSharp.fluid;
		}
		return false;
	}, [data]);

	const title = useMemo(() => {
		return htmlChars(post.title);
	}, [post]);

	const content = useMemo(() => {
		const formatContent = (c) => {
			function makeHTTPS(c) {
				c = c.replace(/http:\/\/broadsignposts/g, "https://broadsignposts");
				return c;
			}

			function removeShortcodes(c) {
				c = c.replace(/\[blog_banner\s[^\]]+\]/g, "");
				c = c.replace(/\[banner_\w+\s[^\]]+\]/g, "");
				c = c.replace(/\[caption\s[^\]]+\]/g, "");
				return c;
			}

			function makePathsRelative(c) {
				c = c.replace(/https*:\/\/company.com\//g, "/");
				c = c.replace(/https*:\/\/company-react.netlify.com\//g, "/");
				c = c.replace(/https*:\/\/staging.dfu8r1qr7gcam.amplifyapp.com\//g, "/");
				c = c.replace(/https*:\/\/staging.company.com\//g, "/");
				return c;
			}

			function removePressReleases(c) {
				c = c.replace(/\/press-releases\//g, T.translate("blog.slug"));
				return c;
			}

			function handleMediaPaths(c) {
				/* Special case for hosted videos, until such time when we can host them somewhere actually relevant */
				c = c.replace(/"\/hub\/video\//g, "https://broadsignposts.wpengine.com/hub/video/");
				return c;
			}

			c = makeHTTPS(c);
			c = removeShortcodes(c);
			c = makePathsRelative(c);
			c = removePressReleases(c);
			c = handleMediaPaths(c);

			return c;
		}

		return formatContent(post.content);
	}, [post]);

	const seoDescription = useMemo(() => {
		function formatExcerpt(str) {
			function removeTags(str) {
				return str.replace(/<[\w\s\-.":;=/_]+>/gmi, "");
			}

			let out = str.slice(0, 1000);
			out = removeTags(removeTags(removeTags(out)));
			out = out.replace(/by\s.+/gi, "");
			out = out.replace(/\s+/g, " ").replace(" .", ".").trim();
			out = excerpt(out, 320);
			return out;
		}

		if (post.seo && post.seo.metaDesc) {
			return post.seo.metaDesc;
		}

		return formatExcerpt(post.content);
	}, [post]);

	const categories = useMemo(() => {
		if (post.categories && post.categories.nodes.length > 0) {
			return Object.values(post.categories.nodes).map(category => {
				return category.name;
			});
		}
		return [];
	}, [post]);

	const relatedPosts = useMemo(() => {
		const now = Date.now();
		if (post.related_posts && post.related_posts.nodes.length > 0) {
			return Object.values(post.related_posts.nodes)
					.filter(rp => rp.databaseId !== post.databaseId)
					.sort(() => (.5 - Math.random()))
					.slice(0, 3);
		}
		return [];
	}, [post]);


	const hasDemoForm = useMemo(() => {
		if (content.match(/\[demo_form\]/g)) {
			return true;
		}
		return false;
	}, [content]);


	const seo = {
		title: title,
		description: seoDescription,
		featureImage: {
			src: hero.src,
			width: hero.presentationWidth,
			height:  hero.presentationHeight,
			// alt: post.featured_media.alt_text,
		}
	}

	return (
		<Layout seo={seo} path={pathname} className="blog single">
			<Tank className="hat">
				<aside className="social_media" />
				<div className="post_body">
					<p className="publish_info">
						<span className="author">{ categories[0] }</span>&nbsp;|&nbsp;<span className="date">{ formatDate(post.date, dico.key) }</span>
					</p>
					<h1 className="post_title">{ title }</h1>
				</div>
				<aside className="related_posts" />
			</Tank>
			<Hero img={hero} />
			<StickyContainer className="Tank hull">
				<aside className="social_media">
					<Sticky topOffset={-60} className="the_sticky">
						{({ style }) => (
							<div style={Object.assign({ height: 'auto' }, style)}>
								<TwitterShareButton url={props.location.href}>
									<img src={icon_social_media_twitter} alt="Share on Twitter" title="Share on Twitter" />
								</TwitterShareButton>
								<FacebookShareButton url={props.location.href}>
									<img src={icon_social_media_facebook} alt="Share on Facebook" title="Share on Facebook" />
								</FacebookShareButton>
								<LinkedinShareButton url={props.location.href}>
									<img src={icon_social_media_linkedin} alt="Share on LinkedIn" title="Share on LinkedIn" />
								</LinkedinShareButton>
								<EmailShareButton url={props.location.href}>
									<img src={icon_social_media_email} alt="Share by email" title="Share by email" />
								</EmailShareButton>
							</div>
						)}
					</Sticky>
				</aside>
				<div className={classnames("post_body", relatedPosts.length === 0 ? "no_related_posts" : "")}>
					<div className="content" dangerouslySetInnerHTML={{ __html: content }} />
					{hasDemoForm &&
						<Panel color="whisper" className="Panel">
							<h3>{T.translate("blog.demoFormTitle")}</h3>
							<Form
								fields="boxes" bg="light"
								formId={T.translate("form.demo")} />
						</Panel>
					}
				</div>
				{relatedPosts.length > 0 &&
					<aside className="related_posts">
						<Sticky topOffset={-60} className="the_sticky">
							{({ style }) => (
								<div style={Object.assign({ backgroundColor:'#FFF', height: 'auto' }, style)}>
									<h3>{T.translate("blog.similarStories")}</h3>
									{relatedPosts.map((post, k) => {
										return (
											<Link to={blogPostSlug(post.slug)} className="related_post" key={k}>
												{post.featuredImage.node.localFile && <Img fluid={post.featuredImage.node.localFile.childImageSharp.fluid} className="thumb" />}
												<p className="title">{htmlChars(post.title)}</p>
												<p className="read_more">{T.translate("cta.readArticle")}</p>
											</Link>
										);
									})}
									<CTA campsite clear pill to={T.translate("router.blog."+T.translate("key"))}>{T.translate("cta.seeMorePosts")}</CTA>
								</div>
							)}
						</Sticky>
					</aside>
				}
			</StickyContainer>
		</Layout>
	)
}

export const pageQuery = graphql`
	query currentPostQuery($id: Int) {
		thePost: wpPost(databaseId: { eq: $id }) {
			title
			content
			databaseId
			date
			author {
				node {
					name
				}
			}
			categories {
				nodes {
					name
				}
			}
			tags {
				nodes {
					name
				}
			}
			translations {
				slug
				language {
					slug
				}
			}
			featuredImage {
				node {
					localFile {
						childImageSharp {
							fluid {
								...GatsbyImageSharpFluid_withWebp
							}
						}
					}
				}
			}
		}

        site {
        	siteMetadata {
            	title
            }
        }
    }
`

/*
export const pageQuery = graphql`
	query currentPostQuery($id: Int) {
		thePost: wpPost(databaseId: { eq: $id }) {
			title
			content
			databaseId
			date
			author {
				node {
					name
				}
			}
			categories {
				nodes {
					name
				}
			}
			tags {
				nodes {
					name
				}
			}
			translations {
				slug
				language {
					slug
				}
			}
			featuredImage {
				node {
					localFile {
						childImageSharp {
							fluid {
								...GatsbyImageSharpFluid_withWebp
							}
						}
					}
				}
			}
		}

        site {
        	siteMetadata {
            	title
            }
        }
    }
`
 */