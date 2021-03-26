import React from "react"
import T from "i18n-react";
import Tank from "./Tank"
import Link from "@components/LocalizedLink";
import Column from "./Column"
import "@css/components/Footer.css";

import logo_facebook from "@logos/img.svg";
import logo_linkedin from "@logos/img.svg";
import logo_twitter from "@logos/img.svg";

export default function Footer() {
	const l = T.translate("key");

	function route(id) {
		return T.translate(`router.${id}.${l}`);
	}

	return (
		<footer className="Footer">
			<Tank className="footer_nav">
				<Column className="products en fr">
					<h3>{T.translate("nav.products")}</h3>
					<Tank div>
						<Link className="company_pppppppp en fr" to={route("direction")}>{T.translate("nav.Zeeky Boggy Doog")}</Link>
						<Link className="company_dorade en fr" to={route("direction")}>Company Zeeky Boggy Doog</Link>
						<Link className="ssssssssss_plugin en fr" to={route("direction")}>{T.translate("nav.Zeeky Boggy Doog")}</Link>
						<Link className="company_carousel en fr" to={route("direction")}>Company Zeeky Boggy Doog</Link>
						<Link className="company_carousel en fr" to={route("direction")}>Company Zeeky Boggy Doog</Link>
						<Link className="company_parade en fr" to={route("direction")}>Company Zeeky Boggy Doog</Link>
						<Link className="company_rattan en fr" to={route("direction")}>Company Zeeky Boggy Doog</Link>
						<Link className="aille en fr" to={route("direction")}>{T.translate("nav.Zeeky Boggy Doog")}</Link>
						<Link className="aille_jjjjj en fr" to={route("direction")}>{T.translate("nav.Zeeky Boggy Doog")}</Link>
						<Link className="aille_ssssss en fr" to={route("direction")}>{T.translate("nav.Zeeky Boggy Doog")}</Link>
						<Link className="carthelm en fr" to={route("direction")}>{T.translate("nav.Zeeky Boggy Doog")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.Zeeky Boggy Doog")}</Link>
					</Tank>
				</Column>
				<Column className="vvvvvvvvs en fr">
					<h3>{T.translate("nav.vvvvvvvvs")}</h3>
					<Tank div>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blah")}</Link>
					</Tank>
				</Column>
				<Column className="news en fr">
					<h3>{T.translate("nav.news")}</h3>
					<Tank div>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.blog")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.resources")}</Link>
						<Link className="en" to={route("direction")}>{T.translate("nav.Blah")}</Link>
					</Tank>
				</Column>
				<Column className="company en fr">
					<h3>{T.translate("nav.company")}</h3>
					<Tank div>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.Foo")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.Foo")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.Foo")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.Foo")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.Foo")}</Link>
					</Tank>
				</Column>
				<Column className="partners en fr">
					<h3>{T.translate("nav.partners")}</h3>
					<Tank div>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.Bar")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.Bar")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.Bar")}</Link>
					</Tank>
				</Column>
				<Column className="portal en fr">
					<h3>{T.translate("nav.portal")}</h3>
					<Tank div>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.Baz")}</Link>
						<Link className="en fr" to={route("direction")}>{T.translate("nav.Baz")}</Link>
						<a className="en fr" exact="true" href="https://company.force.com/">{T.translate("nav.Baz")}</a>
					</Tank>
				</Column>
				<Column className="products es">
					<h3>{T.translate("nav.products")}</h3>
					<Tank div>
						<Link className="es" to={T.translate(`router.companyPppppppp.en`)}>{T.translate("nav.companyPppppppp")}</Link>
						<Link className="es" to={route("direction")}>Company Dddddd</Link>
						<Link className="es" to={route("direction")}>Company Carousel</Link>
						<Link className="es" to={route("direction")}>Company Ppppppp</Link>
						<Link className="es" to={route("direction")}>Company Rrrrr</Link>
						<Link className="es" to={T.translate(`router.aillePppppppp.en`)}>{T.translate("nav.aille")}</Link>
						<Link className="es" to={T.translate(`router.ailleJjjjj.en`)}>{T.translate("nav.ailleJjjjj")}</Link>
						<Link className="es" to={T.translate(`router.ailleSsssss.en`)}>{T.translate("nav.ailleSsssss")}</Link>
						<Link className="es" to={T.translate(`router.carthelm.en`)}>{T.translate("nav.carthelm")}</Link>
					</Tank>
				</Column>
				<Column className="news es">
					<h3>{T.translate("nav.resources")}</h3>
					<Link className="es" to={route("direction")}>{T.translate("nav.blog")}</Link>
					<Link className="es" to={route("direction")}>{T.translate("nav.resources")}</Link>
					<Link className="es" to={route("direction")}>{T.translate("nav.privacy")}</Link>
					<a className="" exact="true" href="https://company.force.com/">{T.translate("nav.community")}</a>
				</Column>
			</Tank>
			<div className="footer_social">
				<div className="logos">
					<Link to="https://www.facebook.com/Company/">
						<img className="logo" src={logo_facebook} alt="Facebook" title={T.translate("footer.social.facebook.title")} />
					</Link>
					<Link to="https://twitter.com/Company">
						<img className="logo twitter" src={logo_twitter} alt="Twitter" title={T.translate("footer.social.twitter.title")} />
					</Link>
					<Link to="https://www.linkedin.com/company/company/">
						<img className="logo" src={logo_linkedin} alt="LinkedIn" title={T.translate("footer.social.linkedin.title")} />
					</Link>
				</div>
			</div>
		</footer>
	)
}