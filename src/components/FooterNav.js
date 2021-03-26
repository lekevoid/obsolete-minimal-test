import React from "react";
import T from "i18n-react";
import router from "../i18n/config/router";

import Column from "./Column";
import Link from "@components/LocalizedLink";
import Tank from "./Tank";

import "@css/components/FooterNav.css";

export default function FooterNav() {
	const l = T.translate("key");

	if (l === "es") {
		return (
			<Tank id="FooterNav">
				<Column className="products">
					<h3>{T.translate("nav.products")}</h3>
					<Tank div>
						<Link className="company_pppppppp" to={router.companyPppppppp.en}>{T.translate("nav.companyPppppppp")}</Link>
						<Link className="company_dorade" to={router.companyDddddd[l]}>Company Dddddd</Link>
						<Link className="company_carousel" to={router.companyCarousel[l]}>Company Carousel</Link>
						<Link className="company_parade" to={router.companyPpppppp[l]}>Company Ppppppp</Link>
						<Link className="company_rattan" to={router.companyRrrrr[l]}>Company Rrrrr</Link>
						<Link className="aille" to={router.aillePppppppp.en}>{T.translate("nav.aille")}</Link>
						<Link className="aille_jjjjj" to={router.ailleJjjjj.en}>{T.translate("nav.ailleJjjjj")}</Link>
						<Link className="aille_ssssss" to={router.ailleSsssss.en}>{T.translate("nav.ailleSsssss")}</Link>
						<Link className="carthelm" to={router.carthelm.en}>{T.translate("nav.carthelm")}</Link>
					</Tank>
				</Column>
				<Column className="news">
					<h3>{T.translate("nav.resources")}</h3>
					<Link className="" to={router.blog[l]}>{T.translate("nav.blog")}</Link>
					<Link className="" to={router.resources[l]}>{T.translate("nav.resources")}</Link>
					<Link className="" to={router.privacyPolicy[l]}>{T.translate("nav.privacy")}</Link>
					<a className="" exact="true" href="https://company.force.com/">{T.translate("nav.community")}</a>
				</Column>
			</Tank>
		)
	}

	return (
		<Tank id="FooterNav">
			<Column className="products">
				<h3>{T.translate("nav.products")}</h3>
				<Tank div>
					<Link className="company_pppppppp en fr" to={router.companyPppppppp[l]}>{T.translate("nav.companyPppppppp")}</Link>
					<Link className="company_dorade en fr" to={router.companyDddddd[l]}>Company Dddddd</Link>
					<Link className="ssssssssss_plugin en fr" to={router.partnersSsssssssssPlugin[l]}>{T.translate("nav.ssssssssssPlugin")}</Link>
					<Link className="company_carousel en fr" to={router.companyCarousel[l]}>Company Carousel</Link>
					<Link className="company_carousel en fr" to={router.companyAir[l]}>Company Air</Link>
					<Link className="company_parade en fr" to={router.companyPpppppp[l]}>Company Ppppppp</Link>
					<Link className="company_rattan en fr" to={router.companyRrrrr[l]}>Company Rrrrr</Link>
					<Link className="aille en fr" to={router.aillePppppppp[l]}>{T.translate("nav.aille")}</Link>
					<Link className="aille_jjjjj en fr" to={router.ailleJjjjj[l]}>{T.translate("nav.ailleJjjjj")}</Link>
					<Link className="aille_ssssss en fr" to={router.ailleSsssss[l]}>{T.translate("nav.ailleSsssss")}</Link>
					<Link className="carthelm en fr" to={router.carthelm[l]}>{T.translate("nav.carthelm")}</Link>
					<Link className="en fr" to={router.pricing[l]}>{T.translate("nav.pricing")}</Link>
				</Tank>
			</Column>
			<Column className="vvvvvvvvs">
				<h3>{T.translate("nav.vvvvvvvvs")}</h3>
				<Tank div>
					<Link className="en fr" to={router.vvvvvvvvAirports[l]}>{T.translate("nav.aleports")}</Link>
					<Link className="en fr" to={router.vvvvvvvvBanking[l]}>{T.translate("nav.banking")}</Link>
					<Link className="en fr" to={router.vvvvvvvvCasino[l]}>{T.translate("nav.casino")}</Link>
					<Link className="en fr" to={router.vvvvvvvvCinema[l]}>{T.translate("nav.cinema")}</Link>
					<Link className="en fr" to={router.vvvvvvvvGasStations[l]}>{T.translate("nav.gasStations")}</Link>
					<Link className="en fr" to={router.vvvvvvvvHealthcare[l]}>{T.translate("nav.healthcare")}</Link>
					<Link className="en fr" to={router.vvvvvvvvHotels[l]}>{T.translate("nav.hotels")}</Link>
					<Link className="en fr" to={router.vvvvvvvvInternalCommunications[l]}>{T.translate("nav.internalCommunications")}</Link>
					<Link className="en fr" to={router.vvvvvvvvOutdoor[l]}>{T.translate("nav.outdoor")}</Link>
					<Link className="en fr" to={router.vvvvvvvvShoppingMall[l]}>{T.translate("nav.shoppingMalls")}</Link>
					<Link className="en fr" to={router.vvvvvvvvSmartCities[l]}>{T.translate("nav.smartCities")}</Link>
					<Link className="en fr" to={router.vvvvvvvvTransit[l]}>{T.translate("nav.transit")}</Link>
				</Tank>
			</Column>
			<Column className="news">
				<h3>{T.translate("nav.news")}</h3>
				<Tank div>
					<Link className="en fr" to={router.blog[l]}>{T.translate("nav.blog")}</Link>
					<Link className="en fr" to={router.resources[l]}>{T.translate("nav.resources")}</Link>
					{/* l === "en" && <Link className="events en" to={router.events[l]}>{T.translate("nav.events")}</Link> */}
					{l === "en" && <Link className="en" to={router.fooFromHome[l]}>{T.translate("nav.fooFromHome")}</Link>}
				</Tank>
			</Column>
			<Column className="company">
				<h3>{T.translate("nav.company")}</h3>
				<Tank div>
					<Link className="en fr" to={router.whoWeAre[l]}>{T.translate("nav.whoWeAre")}</Link>
					<Link className="en fr" to={router.contact[l]}>{T.translate("nav.contact")}</Link>
					<Link className="en fr" to={router.careers[l]}>{T.translate("nav.careers")}</Link>
					<Link className="en fr es" to={router.privacyPolicy[l]}>{T.translate("nav.privacy")}</Link>
					<Link className="en fr" to={router.programmaticPrivacyPolicy[l]}>{T.translate("nav.programmaticPrivacy")}</Link>
				</Tank>
			</Column>
			<Column className="partners">
				<h3>{T.translate("nav.partners")}</h3>
				<Tank div>
					<Link className="en fr" to={router.partnersDddddddsssssssProvider[l]}>{T.translate("nav.dddddddSssssssContent")}</Link>
					<Link className="en fr" to={router.partnersDddddddsssssssAudience[l]}>{T.translate("nav.audienceMeasurement")}</Link>
					<Link className="en fr" to={router.partnersDddddddsssssssHardware[l]}>{T.translate("nav.hardware")}</Link>
				</Tank>
			</Column>
			<Column className="portal">
				<h3>{T.translate("nav.portal")}</h3>
				<Tank div>
					<Link className="en fr" to={router.documentation[l]}>{T.translate("nav.documentation")}</Link>
					<Link className="en fr" to={router.training[l]}>{T.translate("nav.training")}</Link>
					<a className="en fr" exact="true" href="https://company.force.com/">{T.translate("nav.community")}</a>
				</Tank>
			</Column>
		</Tank>
	)
}