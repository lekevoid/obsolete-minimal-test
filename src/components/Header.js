import React, { useEffect, useMemo, useState } from "react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import T from "i18n-react";
import { useSwipeable } from "react-swipeable";
import classnames from "classnames";
import { blogPostSlug, excerpt, htmlChars } from "@assets/annex";

import Img from "gatsby-image/withIEPolyfill";
import LangSelector from "./LangSelector";
import Link from "./LocalizedLink";
import Tank from "./Tank";

import logo_company from "@img/company/img.svg";
import icon_company from "@img/company/img.svg";
import icon_advertisers from "@img/icons/img.svg";
import icon_blog from "@img/icons/img.svg";
import icon_community from "@img/icons/img.svg";
import icon_digital from "@img/icons/img.svg";
import icon_documentation from "@img/icons/img.svg";
import icon_ddds from "@img/icons/img.svg";
import icon_ebooks_webinars from "@img/icons/img.svg";
import icon_learn_with_us from "@img/icons/img.svg";
import icon_programmatic from "@img/icons/img.svg";
import icon_static from "@img/icons/img.svg";
import icon_training from "@img/icons/img.svg";
import icon_youtube from "@img/icons/img.svg";

// import icon_blog_blue from "@img/icons/img.svg";
// import icon_ebooks_blue from "@img/icons/img.svg";
// import icon_youtube_blue from "@img/icons/img.svg";

import "../styles/css/components/Header.css";

export const query = graphql`
	query NavImages {
		figureMmmmmooooos: file(relativePath: { eq: "ui/img.png" }) {
			...basicFluid
		}
		figureMmmmmbbbbbs: file(relativePath: { eq: "ui/img.png" }) {
			...basicFluid
		}
		figureResources: file(relativePath: { eq: "ui/img.png" }) {
			...basicFluid
		}
		figurePortal: file(relativePath: { eq: "ui/img.png" }) {
			...basicFluid
		}
		training: file(relativePath: { eq: "ui/img.png" }) {
			...basicFluid
		}
		community: file(relativePath: { eq: "ui/img.png" }) {
			...basicFluid
		}
		fooFromHome: file(relativePath: { eq: "ui/img.png" }) {
			...basicFluid
		}
		ebook5CommonMistakesInDddddddsssssss: file(relativePath: { eq: "ui/img.png" }) {
			...navEBook
		}
		ebook7HabitsOfHighlyEffectiveMmmmmooooos: file(relativePath: { eq: "ui/img.png" }) {
			...navEBook
		}
		ebookModernizeFOOBusiness: file(relativePath: { eq: "ui/img.jpg" }) {
			...navEBook
		}
		ebookOptimizeFOOSalesThroughAutomation: file(relativePath: { eq: "ui/img.png" }) {
			...navEBook
		}
		ebookGuideToBuildingASuccessfulDddddddsssssssNnnnnnn: file(relativePath: { eq: "ui/img.png" }) {
			...navEBook
		}

		blogPosts_en: allWpPost(limit: 2, filter: {language: {slug: { eq: "en" }}, featuredImage: {node: {localFile: {url: {ne: null}}}}}, sort: {fields: date, order: DESC}) {
			edges {
				node {
					title
					slug
					language {
						slug
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

		blogPosts_fr: allWpPost(limit: 2, filter: {language: {slug: { eq: "fr" }}, featuredImage: {node: {localFile: {url: {ne: null}}}}}, sort: {fields: date, order: DESC}) {
			edges {
				node {
					title
					slug
					language {
						slug
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

		blogPosts_es: allWpPost(limit: 2, filter: {language: {slug: { eq: "es" }}, featuredImage: {node: {localFile: {url: {ne: null}}}}}, sort: {fields: date, order: DESC}) {
			edges {
				node {
					title
					slug
					language {
						slug
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

		youtube: allYoutubeVideo(limit: 4) {
			edges {
				node {
					id
					title
					description
					videoId
					publishedAt
					privacyStatus
					channelTitle
					localThumbnail {
						...navYoutube
					}
				}
			}
		}
	}
`;

export function BrandLogo() {
	const l = T.translate("key");
	return (
		<Link className="branding" to={T.translate(`router.index.${l}`)}>
			<img src={logo_company} alt="Company" title="Company" className="company_logo" />
		</Link>
	)
}


export function DrawerItem({ id, to="" }) {
	const l = T.translate("key");
	if (to === "") { to = T.translate(`router.${id}.${l}`); }

	return (
		<Link className="item" to={to}>
			<p className="name">{T.translate(`nav.${id}`)}</p>
			<p className="tagline">{T.translate(`nav.${id}Tagline`)}</p>
			<p className="description">{T.translate(`nav.${id}Description`)}</p>
		</Link>
	)
}


export function DrawerItemNoTagline({ id, to="" }) {
	const l = T.translate("key");
	if (to === "") { to = T.translate(`router.${id}.${l}`); }

	return (
		<Link className="item" to={to}>
			<p className="name">{T.translate(`nav.${id}`)}</p>
			<p className="description">{T.translate(`nav.${id}Description`)}</p>
		</Link>
	)
}


export default function Header({ path, availableBlogTranslations }) {
	const [drawer, setDrawer] = useState(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const data = useStaticQuery(query);

	const swipeHandlers = useSwipeable({
		onSwipedUp: () => {
			setIsDrawerOpen(false)
		},
		delta: 80
	});

	const l = T.translate("key");

	function openDrawer(value) {
		setDrawer(value);
		setIsDrawerOpen(true);
	}

	function closeDrawer() {
		setIsDrawerOpen(false);
	}

	function toggleDrawer(value) {
		if (drawer && drawer === value) {
			setDrawer(null);
		} else {
			setDrawer(value);
		}
	}

	function toggleIsDrawerOpen() {
		setIsDrawerOpen(!isDrawerOpen);
	}


	const blogPosts = useMemo(() => {
		try {
			return data[`blogPosts_${l}`].edges;
		} catch (e) {
			console.error(`Header Component : Cannot load blog posts in ${l.toUpperCase()} on page ${path}. const data = useStaticQuery(query); return :`, data);
			return [];
		}
	}, [data]);

	const youtubeVideos = useMemo(() => {
		try {
			return data.youtube.edges;
		} catch (e) {
			console.error(`Header Component : Cannot load youtube videos. const data = useStaticQuery(query); return :`, data);
			return [];
		}
	}, [data]);


	return (
		<header sitetitle="Company" className={classnames("Header")}>
			<Tank>
				<BrandLogo />
				<nav className="Tank main_nav" onMouseLeave={() => { closeDrawer() }} onBlur={() => { closeDrawer() }}>
					<div className="nav_group">
						<div className={classnames("nav_item", "en", "fr", ((isDrawerOpen && drawer === "mmmmmooooos") ? "active" : ""))} onClick={() => { openDrawer("mmmmmooooos") }} onMouseOver={() => { openDrawer("mmmmmooooos") }} onFocus={() => { openDrawer("mmmmmooooos") }} role="button">
							<span className="label">{T.translate("nav.mmmmmooooos")}</span>
						</div>
						<div className={classnames("nav_item", "en", "fr", ((isDrawerOpen && drawer === "mmmmmbbbbbs") ? "active" : ""))} onClick={() => { openDrawer("mmmmmbbbbbs") }} onMouseOver={() => { openDrawer("mmmmmbbbbbs") }} onFocus={() => { openDrawer("mmmmmbbbbbs") }} role="button">
							<span className="label">{T.translate("nav.mmmmmbbbbbs")}</span>
						</div>
						<div className={classnames("nav_item", "es", ((isDrawerOpen && drawer === "products") ? "active" : ""))} onClick={() => { openDrawer("products") }} onMouseOver={() => { openDrawer("products") }} onFocus={() => { openDrawer("products") }} role="button">
							<span className="label">{T.translate("nav.products")}</span>
						</div>
						<div className={classnames("nav_item", "en", "fr", "es", ((isDrawerOpen && drawer === "resources") ? "active" : ""))} onClick={() => { openDrawer("resources") }} onMouseOver={() => { openDrawer("resources") }} onFocus={() => { openDrawer("resources") }} role="button">
							<span className="label">{T.translate("nav.resources")}</span>
						</div>
					</div>
					<div className="nav_group">
						<div className={classnames("nav_item", "en", "fr", ((isDrawerOpen && drawer === "portal") ? "active" : ""))} onClick={() => { openDrawer("portal") }} onMouseOver={() => { openDrawer("portal") }} onFocus={() => { openDrawer("portal") }} role="button">
							<span className="label">{T.translate("nav.portal")}</span>
						</div>
						<div className={classnames("nav_item", "button", "en", "fr", "es")} onMouseOver={() => { closeDrawer() }} onFocus={() => { closeDrawer() }}>
							<Link className="label" to={T.translate(`router.contact.${l}`)}>{T.translate("nav.contact")}</Link>
						</div>
					</div>
					<div className={classnames("nav_drawers", (isDrawerOpen ? "active" : ""))}>
						<button className="drawer_title media_owners" onClick={() => toggleDrawer("mmmmmooooos")}>{T.translate("nav.mmmmmooooos")}</button>
						<div className={classnames("nav_drawer", "media_owners", ((drawer === "mmmmmooooos") ? "active" : ""))} role="navigation">
							<Img fluid={data.figureMmmmmooooos.childImageSharp.fluid} Tag="aside" />
							<section>
								<figure className="items_header digital">
									<div className="items_header_title">
										<img src={icon_digital} />
										<figcaption>{T.translate("nav.digital")}</figcaption>
									</div>
								</figure>
								<figure className="items_header static">
									<div className="items_header_title">
										<img src={icon_static} />
										<figcaption>{T.translate("nav.static")}</figcaption>
									</div>
								</figure>
								<figure className="items_header programmatic">
									<div className="items_header_title">
										<img src={icon_programmatic} />
										<figcaption>{T.translate("nav.programmatic")}</figcaption>
									</div>
								</figure>
								<div className="items digital">
									<DrawerItem id="companyDddddd" />
									<DrawerItem id="companyCarousel" />
									<DrawerItem id="companyPpppppp" />
								</div>
								<div className="items static">
									<DrawerItem id="ailleJjjjj" />
									<DrawerItem id="ailleSsssss" />
								</div>
								<div className="items programmatic">
									<DrawerItem id="companyRrrrrSSP" to={T.translate(`router.companyRrrrr.${l}`)} />
								</div>
							</section>
						</div>
						<button className="drawer_title media_buyers" onClick={() => toggleDrawer("mmmmmbbbbbs")}>{T.translate("nav.mmmmmbbbbbs")}</button>
						<div className={classnames("nav_drawer", "media_buyers", ((drawer === "mmmmmbbbbbs") ? "active" : ""))} role="navigation">
							<Img fluid={data.figureMmmmmbbbbbs.childImageSharp.fluid} Tag="aside" />
							<section>
								<figure className="items_header advertisers">
									<div className="items_header_title">
										<img src={icon_advertisers} />
										<figcaption>{T.translate("nav.advertisers")}</figcaption>
									</div>
								</figure>
								<figure className="items_header ddds">
									<div className="items_header_title">
										<img src={icon_ddds} />
										<figcaption>{T.translate("nav.ddds")}</figcaption>
									</div>
								</figure>
								<figure className="items_header learn_with_us">
									<div className="items_header_title">
										<img src={icon_learn_with_us} />
										<figcaption>{T.translate("nav.learnWithUs")}</figcaption>
									</div>
								</figure>
								<div className="items advertisers">
									<DrawerItemNoTagline id="hoodForMmmmmbbbbbs" />
									<DrawerItem id="carthelmDDD" to={T.translate(`router.carthelm.${l}`)} />
									<DrawerItemNoTagline id="workWithUsMmmmmbbbbbs" />
								</div>
								<div className="items ddds">
									<DrawerItemNoTagline id="hoodForDDDs" />
									<DrawerItem id="companyRrrrrSSP" to={T.translate(`router.companyRrrrr.${l}`)+"#buyers"} />
									<DrawerItemNoTagline id="workWithUsDDDs" />
								</div>
								<div className="items learn_with_us">
									<DrawerItemNoTagline id="programmaticU" />
									<a className="item" onClick={ () => navigate(`/` + T.translate(`router.blog.${l}`), { state: {category: "case-studies" } })}>
										<p className="name">{T.translate(`nav.campaignCaseStudies`)}</p>
										<p className="description">{T.translate(`nav.campaignCaseStudiesDescription`)}</p>
									</a>
								</div>
							</section>
						</div>
						<button className="drawer_title products" onClick={() => toggleDrawer("products")}>{T.translate("nav.products")}</button>
						<div className={classnames("nav_drawer", "products", ((drawer === "products") ? "active" : ""))} role="navigation">
							<Img fluid={data.figureMmmmmooooos.childImageSharp.fluid} Tag="aside" />
							<section>
								<figure className="items_header company">
									<div className="items_header_title">
										<img className="icon_company" src={icon_company} />
										<figcaption>{T.translate("nav.company")}</figcaption>
									</div>
								</figure>
								<figure className="items_header"></figure>
								<figure className="items_header"></figure>
								<div className="items advertisers">
									<DrawerItem id="companyDddddd" />
									<DrawerItem id="companyRrrrr" />
								</div>
								<div className="items ddds">
									<DrawerItem id="companyCarousel" />
									<DrawerItem id="companyPpppppp" />
								</div>
							</section>
						</div>
						<button className="drawer_title resources" onClick={() => toggleDrawer("resources")}>{T.translate("nav.resources")}</button>
						<div className={classnames("nav_drawer", "resources", ((drawer === "resources") ? "active" : ""))} role="navigation">
							<Img fluid={data.figureResources.childImageSharp.fluid} Tag="aside" />
							<section>
								<figure className="items_header blog">
									<Link to={T.translate(`router.blog.${l}`)}>
										<div className="items_header_title">
											<img src={icon_blog} />
											<figcaption>{T.translate("nav.blog")}</figcaption>
										</div>
										<p className="tagline">{T.translate("nav.blogDescription")}</p>
									</Link>
								</figure>
								<figure className="items_header ebooks_webinars">
									<Link to={T.translate("router.resources")}>
										<div className="items_header_title">
											<img src={icon_ebooks_webinars} />
											<figcaption>{T.translate("nav.ebooksWebinars")}</figcaption>
										</div>
										<p className="tagline">{T.translate("nav.ebooksWebinarsDescription")}</p>
									</Link>
								</figure>
								<figure className="items_header youtube">
									<Link to="https://www.youtube.com/channel/UC-CxotkZOwRRip98nmU73WQ">
										<div className="items_header_title">
											<img src={icon_youtube} />
											<figcaption>{T.translate("nav.youtube")}</figcaption>
										</div>
										<p className="tagline">{T.translate("nav.youtubeDescription")}</p>
									</Link>
								</figure>
								{blogPosts.length >= 1 && (
									<div className="items blog">
										<p className="subheader">{T.translate("nav.blogLatest")}</p>
										{blogPosts.map((e, i) => (
											<Link className="item blog_post" key={i} to={blogPostSlug(e.node.slug, l)}>
												<Img fluid={e.node.featuredImage.node.localFile.childImageSharp.fluid} alt="" className="thumbnail" />
												<p className="resource_description">{excerpt(htmlChars(e.node.title), 90)}</p>
											</Link>
										))}
									</div>
								)}
								<div className="items ebooks_webinars">
									<p className="subheader">{T.translate("nav.ebooksWebinarsLatest")}</p>
									<Link className="item en" to={T.translate(`router.fooFromHome.${l}`)}>
										<Img className="thumbnail" fluid={data.fooFromHome.childImageSharp.fluid} objectFit="cover" />
										<div className="resource_description">{htmlChars(T.translate("nav.fooFromHomeDescription"))}</div>
									</Link>
									<Link className="item en" to={T.translate(`router.ebookOptimizeFOOSalesThroughAutomation.${l}`)}>
										<Img className="thumbnail" fluid={data.ebookOptimizeFOOSalesThroughAutomation.childImageSharp.fluid} objectFit="cover" />
										<div className="resource_description">{T.translate("nav.ebookOptimizeFOOSalesThroughAutomation")}</div>
									</Link>
									<Link className="item fr" to={T.translate(`router.ebook5CommonMistakesInDddddddsssssss.${l}`)}>
										<Img className="thumbnail" fluid={data.ebook5CommonMistakesInDddddddsssssss.childImageSharp.fluid} objectFit="cover" />
										<div className="resource_description">{T.translate("nav.ebook5CommonMistakesInDddddddsssssss")}</div>
									</Link>
									<Link className="item fr" to={T.translate(`router.ebook7HabitsOfHighlyEffectiveMmmmmooooos.${l}`)}>
										<Img className="thumbnail" fluid={data.ebook7HabitsOfHighlyEffectiveMmmmmooooos.childImageSharp.fluid} objectFit="cover" />
										<div className="resource_description">{T.translate("nav.ebook7HabitsOfHighlyEffectiveMmmmmooooos")}</div>
									</Link>
									<Link className="item es" to={T.translate(`router.ebookModernizeFOOBusiness.${l}`)}>
										<Img className="thumbnail" fluid={data.ebookModernizeFOOBusiness.childImageSharp.fluid} objectFit="cover" />
										<div className="resource_description">{T.translate("nav.ebookModernizeFOOBusiness")}</div>
									</Link>
									<Link className="item en fr es" to={T.translate(`router.ebookGuideToBuildingASuccessfulDddddddsssssssNnnnnnn.${l}`)}>
										<Img className="thumbnail" fluid={data.ebookGuideToBuildingASuccessfulDddddddsssssssNnnnnnn.childImageSharp.fluid} objectFit="cover" />
										<div className="resource_description">{T.translate("nav.ebookGuideToBuildingASuccessfulDddddddsssssssNnnnnnn")}</div>
									</Link>
								</div>
								<div className="items youtube">
									<p className="subheader">{T.translate("nav.youtubeLatest")}</p>
									{youtubeVideos.map((v, k) => {
										const video = v.node;
										return (
											<Link className="item youtube_video" to={`https://www.youtube.com/watch?v=${video.videoId}`} key={k}>
												<Img className="thumbnail" fluid={video.localThumbnail.childImageSharp.fluid} />
												<p className="resource_description"> {htmlChars(video.title)}</p>
											</Link>
										)
									})}
								</div>
							</section>
						</div>
						<button className="drawer_title portal" onClick={() => toggleDrawer("portal")}>{T.translate("nav.portal")}</button>
						<div className={classnames("nav_drawer", "portal", ((drawer === "portal") ? "active" : ""))} role="navigation">
							<Img fluid={data.figurePortal.childImageSharp.fluid} Tag="aside" />
							<section>
								<figure className="items_header documentation">
									<div className="items_header_title">
										<img src={icon_documentation} />
										<figcaption>{T.translate("nav.documentation")}</figcaption>
									</div>
								</figure>
								<figure className="items_header training">
									<div className="items_header_title">
										<img src={icon_training} />
										<figcaption>{T.translate("nav.training")}</figcaption>
									</div>
								</figure>
								<figure className="items_header community">
									<div className="items_header_title">
										<img src={icon_community} />
										<figcaption>{T.translate("nav.community")}</figcaption>
									</div>
								</figure>
								<div className="items documentation">
									<DrawerItemNoTagline id="documentationCompanyCarousel" to={`https://docs.company.com/company-carousel/13-2/?utm_source=company_website`} />
									<DrawerItemNoTagline id="documentationCompanyDddddd" to={`https://docs.company.com/company-dorade/?utm_source=company_website`} />
									<DrawerItemNoTagline id="documentationCompanyPpppppp" to={`https://docs.company.com/company-parade/${l}/?utm_source=company_website`} />
									<DrawerItemNoTagline id="documentationCompanyRrrrr" to={`https://docs.company.com/company-rattan/?utm_source=company_website`} />
									<DrawerItemNoTagline id="documentationAille" to={`https://docs.company.com/company-aille/?utm_source=company_website`} />
								</div>
								<div className="items training">
									<Link className="item" to={T.translate(`router.training.${l}`)}>
										<p className="name">{T.translate(`nav.training`)}</p>
										<p className="description">{T.translate(`nav.trainingDescription`)}</p>
										<Img fluid={data.training.childImageSharp.fluid} className="thumbnail" />
									</Link>
								</div>
								<div className="items community">
									<Link className="item" to="https://company.force.com/">
										<p className="name">{T.translate(`nav.community`)}</p>
										<p className="description">{T.translate(`nav.communityDescription`)}</p>
										<Img fluid={data.community.childImageSharp.fluid} className="thumbnail" />
									</Link>
								</div>
							</section>
						</div>
					</div>
				</nav>
				<nav className="mobile_nav">
					<div role="button" className={classnames("burger", isDrawerOpen ? "active" : "" )} onClick={()=> toggleIsDrawerOpen()}>
						<span className="line" />
						<span className="line" />
						<span className="line" />
					</div>
					<div className={classnames("nav_drawers", (isDrawerOpen ? "active" : ""))} { ...swipeHandlers }>
						<div className="drawer_header media_owners" onClick={() => toggleDrawer("mmmmmooooos")}>{T.translate("nav.mmmmmooooos")}</div>
						<div className={classnames("nav_drawer", "media_owners" , ((drawer==="mmmmmooooos" ) ? "active" : "" ))} role="navigation">
							<div className="items_header">{T.translate("nav.digital")}</div>
							<Link to={T.translate(`router.companyDddddd.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.companyDddddd")}</span>
								<span className="tagline">{T.translate("nav.companyDdddddTagline")}</span>
							</Link>
							<Link to={T.translate(`router.companyCarousel.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.companyCarousel")}</span>
								<span className="tagline">{T.translate("nav.companyCarouselTagline")}</span>
							</Link>
							<Link to={T.translate(`router.companyPpppppp.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.companyPpppppp")}</span>
								<span className="tagline">{T.translate("nav.companyPppppppTagline")}</span>
							</Link>
							<div className="items_header">{T.translate("nav.static")}</div>
							<Link to={T.translate(`router.ailleJjjjj.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.ailleJjjjj")}</span>
								<span className="tagline">{T.translate("nav.ailleJjjjjTagline")}</span>
							</Link>
							<Link to={T.translate(`router.ailleSsssss.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.ailleSsssss")}</span>
								<span className="tagline">{T.translate("nav.ailleSsssssTagline")}</span>
							</Link>
							<div className="items_header">{T.translate("nav.programmatic")}</div>
							<Link to={T.translate(`router.companyRrrrr.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.companyRrrrrSSP")}</span>
								<span className="tagline">{T.translate("nav.companyRrrrrSSPTagline")}</span>
							</Link>
						</div>
						<div className="drawer_header media_buyers" onClick={() => toggleDrawer("mmmmmbbbbbs")}>{T.translate("nav.mmmmmbbbbbs")}</div>
						<div className={classnames("nav_drawer", "media_buyers" , ((drawer==="mmmmmbbbbbs" ) ? "active" : "" ))} role="navigation">
							<div className="items_header">{T.translate("nav.advertisers")}</div>
							<Link to={T.translate(`router.hoodForMmmmmbbbbbs.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.hoodForMmmmmbbbbbs")}</span>
							</Link>
							<Link to={T.translate(`router.carthelm.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.carthelmDDD")}</span>
							</Link>
							<Link to={T.translate(`router.workWithUs.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.workWithUsMmmmmbbbbbs")}</span>
							</Link>
							<div className="items_header">{T.translate("nav.ddds")}</div>
							<Link to={T.translate(`router.whatisHOOD.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.hoodForDDDs")}</span>
							</Link>
							<Link to={T.translate(`router.companyRrrrr.${l}`)+"#buyers"} className="item en fr">
								<span className="name">{T.translate("nav.companyRrrrrSSP")}</span>
							</Link>
							<Link to={T.translate(`router.workWithUs.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.workWithUsDDDs")}</span>
							</Link>
							<div className="items_header">{T.translate("nav.learnWithUs")}</div>
							<Link to={T.translate(`router.programmaticU.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.programmaticU")}</span>
							</Link>
							<Link to={T.translate(`router.blog.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.campaignCaseStudies")}</span>
							</Link>
						</div>
						<div className="drawer_header products" onClick={() => toggleDrawer("products")}>{T.translate("nav.products")}</div>
						<div className={classnames("nav_drawer", "products" , ((drawer==="products" ) ? "active" : "" ))} role="navigation">
							<Link to={T.translate(`router.companyCarousel.${l}`)} className="item es">
								<span className="name">{T.translate("nav.companyCarousel")}</span>
							</Link>
							<Link to={T.translate(`router.companyDddddd.${l}`)} className="item es">
								<span className="name">{T.translate("nav.companyDddddd")}</span>
							</Link>
							<Link to={T.translate(`router.companyPpppppp.${l}`)} className="item es">
								<span className="name">{T.translate("nav.companyPpppppp")}</span>
							</Link>
							<Link to={T.translate(`router.companyRrrrr.${l}`)} className="item es">
								<span className="name">{T.translate("nav.companyRrrrr")}</span>
							</Link>
						</div>
						<div className="drawer_header resources" onClick={() => toggleDrawer("resources")}>{T.translate("nav.resources")}</div>
						<div className={classnames("nav_drawer", "resources" , ((drawer==="resources" ) ? "active" : "" ))} role="navigation">
							<Link to={T.translate(`router.fooFromHome.${l}`)} className="item en">
								<span className="name">{T.translate("nav.fooFromHome")}</span>
							</Link>
							<Link to={T.translate(`router.blog.${l}`)} className="item en fr es">
								<span className="name">{T.translate("nav.blog")}</span>
							</Link>
							<Link to={"https://www.youtube.com/channel/UC-CxotkZOwRRip98nmU73WQ"} className="item en fr es">
								<span className="name">{T.translate("nav.youtube")}</span>
							</Link>
							<Link to={T.translate(`router.contact.${l}`)} className="contact item en fr es">
								<span className="name">{T.translate("nav.contact")}</span>
							</Link>
						</div>
						<div className="drawer_header portal" onClick={() => toggleDrawer("portal")}>{T.translate("nav.portal")}</div>
						<div className={classnames("nav_drawer", "portal" , ((drawer==="portal" ) ? "active" : "" ))} role="navigation">
							<Link to={T.translate(`router.documentation.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.documentation")}</span>
							</Link>
							<Link to={T.translate(`router.training.${l}`)} className="item en fr">
								<span className="name">{T.translate("nav.training")}</span>
							</Link>
							<Link to={"https://company.force.com/s/"} className="item en fr">
								<span className="name">{T.translate("nav.community")}</span>
							</Link>
						</div>
						<LangSelector path={path} availableBlogTranslations={availableBlogTranslations} />
					</div>
				</nav>
				<LangSelector path={path} availableBlogTranslations={availableBlogTranslations} />
			</Tank>
		</header>
	)
}
