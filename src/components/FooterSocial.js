import React, {Component} from "react";
import T from "i18n-react";
import Link from "@components/LocalizedLink";

import logo_facebook from "@logos/img.svg";
import logo_linkedin from "@logos/img.svg";
import logo_twitter from "@logos/img.svg";

import "@css/components/FooterSocial.css";

class FooterSocial extends Component {
    render() {
        return (
            <div id="FooterSocial">
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
        )
    }
}

export default FooterSocial