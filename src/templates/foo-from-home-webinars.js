import React, { useEffect } from "react";
import T from "i18n-react";
import { navigate } from "gatsby";
import classnames from "classnames";
import { StaticQuery, graphql } from "gatsby"

import Hero from "@components/Hero";
import Img from "gatsby-image/withIEPolyfill";
import Layout from "@components/layout";
import Tank from "@components/Tank";

import loader from "@icons/loader.svg"

import "@css/pages/foo_from_home.css";


export default function ViewFOOFromHomePage({pathname, lang, seo, webinarID}) {
	T.setTexts(lang);
	const l = lang.key;

	useEffect(() => {
		if (webinarID) {
			const redirectTo = "/"+T.translate(`router.fooFromHome.${l}`);
			navigate(redirectTo,
				{ state: {
					webinarID: webinarID
				}}
			);
		}
	}, [webinarID, l]);

	return (
		<StaticQuery
			query={graphql`
				query OFHWebinarsImg {
					Bg: file(relativePath: { eq: "bg/foo_from_home_recordings.jpg" }) {
						...fluidHeader
					}
					FOOFromHomeLogo: file(relativePath: { eq: "company/foo_from_home_logo.png" }) {
						...fluidHeader
					}
				}
			`}

			render={layoutImages => (
				<Layout seo={seo} path={pathname} id="page_foo_from_home" className={classnames("page_foo_from_home", "recordings")}>
					<Hero img={layoutImages.Bg.childImageSharp.fluid}>
						<Img className="logo" fluid={layoutImages.FOOFromHomeLogo.childImageSharp.fluid} objectFit="contain" />
						<Tank id="neck">
							{T.translate("fooFromHome.hero")}
						</Tank>
					</Hero>
					<Tank className="hull">
						<img className="loader" src={loader} alt="" />
					</Tank>
				</Layout>
			)}
		/>
	)
}