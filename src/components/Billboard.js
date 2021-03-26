import React from "react";
import T from 'i18n-react'
import PropTypes from "prop-types";

import CTA from "@components/CTA";
import Link from "@components/LocalizedLink";
import Tank from "@components/Tank";

import "@css/components/Billboard.css";

export default function Billboard(props) {
	const {id} = props;

	switch(id) {
		case "big_voice_award":
			return (
				<section id={id} className="Billboard">
					<Tank className="inner">
						<div className="img" />
						<div className="text">
							<h3>{T.translate("billboard.BigVoiceAward.text")}</h3>
							<CTA red round to={T.translate("billboard.BigVoiceAward.url")}>{T.translate("billboard.BigVoiceAward.cta")}</CTA>
						</div>
					</Tank>
				</section>
			);
		case "ebook_adding_digital_to_your_foo_nnnnnnn":
			return (
				<section id={id} className="Billboard">
					<Tank className="inner">
						<h3>{T.translate("billboard.EBookAddingDigitalToYourFOONnnnnnn.title")}</h3>
						<CTA to={T.translate("router.ebookAddingDigitalToYourFOONnnnnnn")} red>{T.translate("billboard.EBookAddingDigitalToYourFOONnnnnnn.cta")}</CTA>
					</Tank>
				</section>
			);
		case "ebook_carthelm_add_real_world_kick":
			return (
				<section id={id} className="Billboard theme_carthelm">
					<Tank className="inner">
						<div className="img logo"></div>
						<h3>{T.translate("billboard.EBookCarthelmAddRealWorldKick.Title")}</h3>
						<Link to={T.translate("billboard.EBookCarthelmAddRealWorldKick.URL")} className="CTA">
							<span className="normal">{T.translate("billboard.EBookCarthelmAddRealWorldKick.CTA")}</span>
							<span className="hover">{T.translate("billboard.EBookCarthelmAddRealWorldKick.CTA")}</span>
						</Link>
					</Tank>
				</section>
			);
		case "soc2":
			return (
				<section id={id} className="Billboard">
					<Tank className="inner">
						<div className="img badge" />
						<div className="text_wrap">
							<div className="text">
								<h3>{T.translate("billboard.SOC2.title")}</h3>
								<p>{T.translate("billboard.SOC2.text")}</p>
								<CTA to="/blog/company-updates-soc-ii-isae3402-reports-now-include-proof-play-campaign-performance" teal>{T.translate("billboard.SOC2.cta")}</CTA>
							</div>
						</div>
					</Tank>
				</section>
			);
		/* SUCCESSFUL_NNNNNNN_EBOOK_BILLBOARD MUST DIE */
		case "successful_nnnnnnn_ebook_billboard":
		case "ebook_successful_nnnnnnn":
			return (
				<section id="ebook_successful_nnnnnnn" className="Billboard">
					<div className="img triangle"/>
					<Tank className="inner">
						<div className="text">
							<h3>{T.translate("billboard.SuccessfulNnnnnnn.text")}</h3>
							<Link className="caret" to={T.translate("router.ebookGuideToBuildingASuccessfulDddddddsssssssNnnnnnn."+T.texts.key)}>{T.translate("billboard.SuccessfulNnnnnnn.cta")}</Link>
						</div>
						<div className="ebook" />
					</Tank>
				</section>
			);
		/* FIVE_MISTAKES_EBOOK_BILLBOARD MUST DIE */
		case "five_mistakes_ebook_billboard":
		case "ebook_5_mistakes":
			return (
				<section id={id} className="Billboard">
					<Tank className="inner">
						<h3>{T.translate("billboard.EBook5MistakesToAvoid.text")}</h3>
						<Link className="caret" to={T.translate("router.ebook5CommonMistakesInDddddddsssssss."+T.texts.key)}>{T.translate("billboard.EBook5MistakesToAvoid.cta")}</Link>
					</Tank>
				</section>
			);
		case "ebook_modernize_foo_business":
			return (
				<section id={id} className="Billboard">
					<Tank className="inner">
						<h3>{T.translate("billboard.EBookModernizeFOOBusiness.title")}</h3>
						<CTA to={T.translate("router.ebookModernizeFOOBusiness."+T.texts.key)}>{T.translate("billboard.EBookModernizeFOOBusiness.cta")}</CTA>
					</Tank>
				</section>
			);
		case "ebook_optimize_foo_sales":
			return (
				<section id={id} className="Billboard">
					<Tank className="inner">
						<h3>{T.translate("billboard.EBookOptimizeFOOSalesThroughAutomation.title")}</h3>
						<p className="tagline">{T.translate("billboard.EBookOptimizeFOOSalesThroughAutomation.tagline")}</p>
						<CTA pill blue to={T.translate("router.ebookOptimizeFOOSalesThroughAutomation."+T.texts.key)}>{T.translate("billboard.EBookOptimizeFOOSalesThroughAutomation.cta")}</CTA>
					</Tank>
				</section>
			);
		case "programmatic_u":
			return (
				<Link id={id} className="Billboard" to={T.translate("router.programmaticU."+T.texts.key)}>
					<div className="img person" />
					<div className="img badge" />
					<Tank className="inner">
						<h3>{T.translate("billboard.ProgrammaticU.title")}</h3>
						<CTA to={T.translate("router.programmaticU."+T.texts.key)} span round case="normal">{T.translate("billboard.ProgrammaticU.cta")}</CTA>
					</Tank>
				</Link>
			);
		case "programmatic_u_certified":
				return (
					<section id={id} className="Billboard">
						<div className="img person" />
						<Tank className="inner" div>
							<div className="tagline_container">
							<h3>{T.translate("billboard.ProgrammaticU.title")}</h3>
							<CTA to={T.translate("router.programmaticUCertificate."+T.texts.key)} round case="normal">{T.translate("billboard.ProgrammaticU.cta")}</CTA>
							</div>
						</Tank>
					</section>
				);


		default:
			return (
				<div></div>
			)
	}
}

Billboard.propTypes = {
	id: PropTypes.string.isRequired,
}
