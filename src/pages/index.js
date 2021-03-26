import React, { useEffect, useMemo, useState } from "react";
import T from "i18n-react";
import { graphql } from "gatsby";
import classnames from "classnames";
import { htmlChars } from "@assets/annex.js";

import CTA from "@components/CTA";
import Hero from "@components/Hero";
import Img from "gatsby-image/withIEPolyfill";
import Layout from "@components/layout";
import LazyLoad from "react-lazyload";
import Link from "@components/LocalizedLink";
import LogosList from "@components/LogosList";
import Tank from "@components/Tank";
import VideoPoster from "@components/VideoPoster";

import icon from "@img/ui/img.svg";

import "@css/pages/home.css";
import "@css/components/ImgFlank.css";


export default function IndexPage({pageContext: { lang }, location: { pathname }, data}) {
	const [quotePosition, setQuotePosition] = useState(0);

	T.setTexts(lang);
	const l = T.translate("lipsum");

	const seo = {
		...T.texts.home.seo
	}

	let allQuotes = {};
	let allQuotesQty = 0;

	allQuotes = Object.values(lang.home.quotes);
	allQuotesQty = allQuotes.length;

	useEffect(() => {
		if (quotePosition >= allQuotesQty) {
			setQuotePosition(0);
		}
	}, [quotePosition, allQuotesQty]);

	const blogPosts = useMemo(() => {
		try {
			return data.blogPosts.edges;
		} catch(e) {
			return [];
		}
	}, [data]);

	/* useEffect(() => {
		fetch("/.netlify/functions/hs_contacts")
		.then(res => console.log(res))
		// .then(res => res.json())
		// .then(data => console.log(data))
	}, []); */

	if (l === "cn") { return <Layout path={pathname} /> }

	return (
		<Layout path={pathname} seo={seo} id="home">
			<Hero>
				<Tank div>
					<div className="text">
						<h1 className="title">{T.translate("lipsum")}</h1>
						<p className="tagline">{T.translate("lipsum")}</p>
						<div className="ctas">
							<Link id="freeTrial" to={T.translate("lipsum")}>
								<span className="CTA midnightBlue">{T.translate("lipsum")}</span>
								<span className="CTA midnightBlue arrow"><img src={icon} alt="" /></span>
							</Link>
						</div>
					</div>
					<Img className="person" fluid={data.HeroPerson.childImageSharp.fluid} objectPosition="center top"
						style={{
							bottom: "0px",
							position: "absolute",
							transformOrigin: "center bottom",
							top: "auto"
						}} />
				</Tank>
				<div className="bg">
					<div className="gradient top_right"></div>
					<div className="gradient bottom_right"></div>
					<div className="gradient bottom_center"></div>
					<div className="gradient middle_left"></div>
				</div>
			</Hero>
			<Tank>
				<Link to={T.translate("lipsum")} className="icon">
					<img src={icon} alt="Company Air" />
					<span className="inner">
						<span className="badge">{T.translate("lipsum")}!</span>
						<p className="tagline">{T.translate("lipsum")}</p>
						<span className="find_out_more">{T.translate("lipsum")}</span>
					</span>
				</Link>
			</Tank>
			<VideoPoster
				title={T.translate("lipsum")}
				className="client_reel"
				YTid="mWA31Igrvk0"
				playBtnStyle="solid"
				bg="transparent"
				poster={data.clientReelVideoPoster.childImageSharp.fluid}>
					<span className="client_reel_title">{T.translate("lipsum")}</span>
			</VideoPoster>
			<Tank fluid className={classnames("quotes", "pos_"+quotePosition)}>
				<img className="icon" src={icon} alt="" />
				{Object.values(T.texts.home.quotes).map((q, k) => {
					return (
						<blockquote className={classnames("Tank", k === quotePosition ? "active" : "")} key={k}>
							<p className="font_size_2_4 font_alt_lighter">{q.quote}</p>
							<cite className={classnames(q.id)} />
						</blockquote>
					)
				})}
				<div className="quote_num"><span style={{ color: "#FFF" }}>{(quotePosition+1).toString().padStart(2, "0")}</span>/{allQuotesQty.toString().padStart(2, "0")}</div>
				<button className="CTA next pink" onClick={() => setQuotePosition(quotePosition+1) }>
					{T.translate("lipsum")}
					<img src={icon} alt="" />
				</button>
			</Tank>
			<Tank className="resources blog_posts">
				<aside>
					<h2 className="font_size_3">{T.translate("lipsum")}</h2>
					<Link className="see_all blue font_size_1_6" to={T.translate("lipsum")}>Blah</Link>
				</aside>
				<div className="resources_hull">
					{blogPosts.map((p, k) => {
						const post = p.node;
						return (
							<Link className="resource resource_post" to={`/${T.translate("lipsum")}/${post.slug}`} key={k}>
								<Img className="feature_img" fluid={post.featuredImage.node.localFile.childImageSharp.fluid} />
								<h3 className="font_size_2">{htmlChars(post.title)}</h3>
								<CTA span gradient round clear>{T.translate("lipsum")}</CTA>
							</Link>
						)
					})}
				</div>
			</Tank>
			<Tank className="resources ebooks">
				<aside>
					<h2 className="font_size_3">{T.translate("lipsum")}</h2>
					<Link className="see_all blue font_size_1_6" to={T.translate("lipsum")}>Blah</Link>
				</aside>
				<LazyLoad offset={400}>
					<div className="resources_hull">
						<Link to={T.translate("lipsum")} className="resource resource_ebook">
							<div className="ImgFlank ebook_row">
								<aside>
									<div className="ebook">
										<Img fluid={data.EBookCover.childImageSharp.fluid} alt="" className="page cover" />
										<Img fluid={data.EBookPage1.childImageSharp.fluid} alt="" className="page page_2" />
										<Img fluid={data.EBookPage2.childImageSharp.fluid} alt="" className="page page_1" />
										<Img fluid={data.EBookPage3.childImageSharp.fluid} alt="" className="page page_3" />
										<Img fluid={data.EBookPage4.childImageSharp.fluid} alt="" className="page page_4" />
										<Img fluid={data.EBookPage5.childImageSharp.fluid} alt="" className="page back_cover" />
									</div>
								</aside>
								<div className="lead">
									<h3 className="font_size_2_4">{T.translate("lipsum")}</h3>
									<p className="font_size_1_8">{T.translate("lipsum")}</p>
									<CTA span gradient round clear>{T.translate("lipsum")}</CTA>
								</div>
							</div>
						</Link>
						<Link to={T.translate("lipsum")} className="resource resource_ebook">
							<div className="ImgFlank ebook_row">
								<aside>
									<div className="ebook">
										<Img fluid={data.EBookCover.childImageSharp.fluid} alt="" className="page cover" />
										<Img fluid={data.EBookPage1.childImageSharp.fluid} alt="" className="page page_2" />
										<Img fluid={data.EBookPage2.childImageSharp.fluid} alt="" className="page page_1" />
										<Img fluid={data.EBookPage3.childImageSharp.fluid} alt="" className="page page_3" />
										<Img fluid={data.EBookPage4.childImageSharp.fluid} alt="" className="page page_4" />
										<Img fluid={data.EBookPage5.childImageSharp.fluid} alt="" className="page back_cover" />
									</div>
								</aside>
								<div className="lead">
									<h3 className="font_size_2_4">{T.translate("lipsum")}</h3>
									<p className="font_size_1_8">{T.translate("lipsum")}</p>
									<CTA span gradient round clear>{T.translate("lipsum")}</CTA>
								</div>
							</div>
						</Link>
						<Link to={T.translate("lipsum")} className="resource resource_ebook">
							<div className="ImgFlank ebook_row">
								<aside>
									<div className="ebook">
										<Img fluid={data.EBookCover.childImageSharp.fluid} alt="" className="page cover" />
										<Img fluid={data.EBookPage1.childImageSharp.fluid} alt="" className="page page_2" />
										<Img fluid={data.EBookPage2.childImageSharp.fluid} alt="" className="page page_1" />
										<Img fluid={data.EBookPage3.childImageSharp.fluid} alt="" className="page page_3" />
										<Img fluid={data.EBookPage4.childImageSharp.fluid} alt="" className="page page_4" />
										<Img fluid={data.EBookPage5.childImageSharp.fluid} alt="" className="page back_cover" />
									</div>
								</aside>
								<div className="lead">
									<h3 className="font_size_2_4">{T.translate("lipsum")}</h3>
									<p className="font_size_1_8">{T.translate("lipsum")}</p>
									<CTA span gradient round clear>{T.translate("lipsum")}</CTA>
								</div>
							</div>
						</Link>
					</div>
				</LazyLoad>
			</Tank>
			<LogosList variation="media_owners grey">
				<h2 before="true" className="font_size_3_4">{T.translate("lipsum")}</h2>
			</LogosList>
			<section className="shin">
				<Tank div>
					<CTA pink to={T.translate("lipsum")}>Blah</CTA>
					<CTA darkBlue to={T.translate("lipsum")}>Blah</CTA>
				</Tank>
			</section>
		</Layout>
	)
}

export const queryIndex = graphql `
	query IndexContent($langRegex: String!) {
		HeroPerson: file(relativePath: { eq: "heroes/img.png" }) {
			...basicFluid
		}

		FOOFromHomeBannerBg: file(relativePath: { eq: "ui/img.jpg" }) {
			...fluidHeader
		}
		FOOFromHomeBannerBgES: file(relativePath: { eq: "ui/img.png" }) {
			...fluidHeader
		}
		FOOFromHomeBannerLogo: file(relativePath: { eq: "ui/img.png" }) {
			...basicFluid
		}
		FOOFromHomeBannerLogoXS: file(relativePath: { eq: "company/img.png" }) {
			...basicFluid
		}

		EBookCover: file(relativePath: { eq: "resources/ebooks/img.png" }) {
			...ebookFluid
		}
		EBookPage1: file(relativePath: { eq: "resources/ebooks/img.png" }) {
			...ebookFluid
		}
		EBookPage2: file(relativePath: { eq: "resources/ebooks/img.png" }) {
			...ebookFluid
		}
		EBookPage3: file(relativePath: { eq: "resources/ebooks/img.png" }) {
			...ebookFluid
		}
		EBookPage4: file(relativePath: { eq: "resources/ebooks/img.png" }) {
			...ebookFluid
		}
		EBookPage5: file(relativePath: { eq: "resources/ebooks/img.png" }) {
			...ebookFluid
		}


		clientReelVideoPoster: file(relativePath: { eq: "video_posters/img.jpg" }) {
			...basicFluid
		}

		blogPosts: allWpPost(limit: 2, filter: {language: {slug: { regex: $langRegex }}, featuredImage: {node: {localFile: {url: {regex: "/\\\\w+/"}}}}}) {
			edges {
				node {
					id
					title
					slug
					date
					categories {
						nodes {
							name
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
			}
		}
	}
`