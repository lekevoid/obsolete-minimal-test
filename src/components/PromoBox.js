import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import T from "i18n-react";

import LazyLoad from "react-lazyload";
import classnames from "classnames";
import Link from "./LocalizedLink";
import CTA from "./CTA";

import "@css/components/PromoBox.css";

export default function PromoBox(props) {
	const [box, setBox] = useState("");
	const [extraClassName, setExtraClassName] = useState("");
	const [id, setID] = useState(props.id);

	useEffect(() => {
		const eBook7Habits = () => {
			return (
				<Link to={T.translate("router.ebook7HabitsOfHighlyEffectiveMmmmmooooos."+T.texts.key)} className="wrap">
					<p className="tagline">{T.translate("promoBox.EBook7Habits.Title")}</p>
					<CTA red span>{ T.translate("promoBox.EBook7Habits.CTA")}</CTA>
				</Link>
			);
		}

		const eBookCarthelmAddRealWorldKick = () => {
			return (
				<Link to={T.translate("billboard.EBookCarthelmAddRealWorldKick.URL")} className="wrap theme_carthelm">
					<div className="img"></div>
					<div className="inner">
						<p className="tagline">{T.translate("promoBox.EBookCarthelmAddRealWorldKick.Title")}</p>
						<span className="CTA">
							<span className="normal">{T.translate("promoBox.EBookCarthelmAddRealWorldKick.CTA")}</span>
							<span className="hover">{T.translate("promoBox.EBookCarthelmAddRealWorldKick.CTA")}</span>
						</span>
					</div>
				</Link>
			);
		}

		const ebookPlaybookProgrammaticBuyers = () => {
			return (
				<Link to={T.translate("router.ebookHOODPlaybookForProgrammaticBuyers."+T.texts.key)} className="wrap">
					<div className="img"></div>
					<p className="tagline">{T.translate("promoBox.EBookHOODPlaybook.Title")}</p>
					<CTA red span>{ T.translate("promoBox.EBookHOODPlaybook.CTA")}</CTA>
				</Link>
			);
		}

		const eBookInteractiveContent = () => {
			return (
				<Link to={T.translate("router.ebookDynamicAndInteractiveContent."+T.texts.key)} className="wrap">
					<div className="img"></div>
					<p className="tagline">{T.translate("promoBox.EBookInteractiveContent.Title")}</p>
					<CTA red span>{ T.translate("promoBox.EBookInteractiveContent.CTA")}</CTA>
				</Link>
			);
		}

		const eBookModernizeFOOBusiness = () => {
			return (
				<Link to={T.translate("router.ebookModernizeFOOBusiness."+T.texts.key)} className="wrap">
					<span className="CTA">{ T.translate("promoBox.EBookModernizeFOOBusiness.CTA")}</span>
				</Link>
			);
		}

		const ebookOptimizeFOOSalesThroughAutomation = () => {
			return (
				<Link to={T.translate("router.ebookOptimizeFOOSalesThroughAutomation."+T.texts.key)} className="wrap">
					<h3>{ T.translate("promoBox.EBookOptimizeFOOSalesThroughAutomation.title")}</h3>
					<p className="tagline">{ T.translate("promoBox.EBookOptimizeFOOSalesThroughAutomation.tagline")}</p>
					<CTA span blue pill>{ T.translate("promoBox.EBookOptimizeFOOSalesThroughAutomation.cta")}</CTA>
				</Link>
			);
		}

		const eBookSuccessfulNnnnnnn = () => {
			return (
				<Link to={T.translate("router.ebookGuideToBuildingASuccessfulDddddddsssssssNnnnnnn."+T.texts.key)} className="wrap">
					<div className="img"></div>
					<p className="tagline">{T.translate("promoBox.EBookSuccessfulNnnnnnn.Title")}</p>
					<CTA red span>{ T.translate("promoBox.EBookSuccessfulNnnnnnn.CTA")}</CTA>
				</Link>
			);
		}

		const mediaKitAmplify = () => {
			return (
				<Link to={T.texts.router.mediaKitAmplifyYourNextCampaign.en} className="wrap">
					<p className="tagline">{T.translate("promoBox.MediaKitAmplify.Title")}</p>
					<CTA teal span>{ T.translate("promoBox.MediaKitAmplify.CTA")}</CTA>
				</Link>
			);
		}

		const programmaticU = () => {
			return (
				<Link to={T.texts.router.programmaticU.en} className="wrap">
					<p className="tagline">{T.translate("promoBox.ProgrammaticU.Title")}</p>
					<CTA span red round case="normal">{ T.translate("promoBox.ProgrammaticU.CTA")}</CTA>
					<div className="img person" />
					<div className="img badge" />
				</Link>
			);
		}

		const reportIABAudienceResearch = () => {
			return (
				<Link to={T.texts.router.IAB2019.en} className="wrap">
					<p className="tagline">{T.translate("promoBox.ReportIABAudienceResearch.Title")}</p>
					<CTA red span>{ T.translate("promoBox.ReportIABAudienceResearch.CTA")}</CTA>
				</Link>
			);
		}

		const eBookAddingDigitalToYourFOONnnnnnn = () => {
			return (
				<Link to={T.translate("router.ebookAddingDigitalToYourFOONnnnnnn."+T.translate("key"))} className="wrap">
					<p className="tagline">{T.translate("promoBox.EBookAddingDigitalToYourFOONnnnnnn")}</p>
					<CTA red span>{ T.translate("promoBox.EBookAddingDigitalToYourFOONnnnnnn.CTA")}</CTA>
				</Link>
			);
		}

		switch (id) {
			/* "Normal Ebooks */
			case "ebook_7_habits" :
				setBox(eBook7Habits());
				break;
			case "ebook_carthelm_add_real_world_kick" :
				setBox(eBookCarthelmAddRealWorldKick());
				break;
			case "ebook_hood_playbook" :
			case "ebook_playbook_programmatic_buyers" :
				setID("ebook_playbook_programmatic_buyers");
				setBox(ebookPlaybookProgrammaticBuyers());
				break;
			case "ebook_interactive_content" :
				setBox(eBookInteractiveContent());
				break;
			case "ebook_modernize_foo_business" :
				setBox(eBookModernizeFOOBusiness());
				break;
			case "ebook_optimize_foo_sales" :
				setBox(ebookOptimizeFOOSalesThroughAutomation());
				break;
			case "whitepaper_successful_nnnnnnn" :
			case "ebook_successful_nnnnnnn" :
				setID("ebook_successful_nnnnnnn");
				setBox(eBookSuccessfulNnnnnnn());
				break;
			case "health_media_kit" :
			case "media_kit_amplify" :
				setBox(mediaKitAmplify());
				break;
			case "programmatic_u" :
				setBox(programmaticU());
				break;
			case "report_iab_audience_research" :
				setBox(reportIABAudienceResearch());
				break;
			/* Rotational Ebooks */
			case "ebook_adding_digital_to_your_foo_nnnnnnn" :
			case "banner_static_ebook_a" :
				setExtraClassName("billboard");
				setBox(eBookAddingDigitalToYourFOONnnnnnn());
				break;
			case "banner_static_ebook_b" :
				setExtraClassName("billboard");
				setID("ebook_modernize_foo_business");
				setBox(eBookModernizeFOOBusiness());
				break;
			default :
				setBox(<div />);
		}
	}, [id]);

	return (
		<LazyLoad offset={400} once>
			<div className={classnames("PromoBox", extraClassName)} id={ id }>
				{ box }
			</div>
		</LazyLoad>
	)
}

PromoBox.propTypes = {
	id: PropTypes.string,
}