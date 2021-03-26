import React, {Component} from "react";
import Layout from "@components/layout";
import classnames from "classnames";
import Img from "gatsby-image";

import Column from "@components/Column";
import Form from "@components/Form";
import Tank from "@components/Tank";
import Row from "@components/Row";

import "@css/templates/butterfly.css";

class TemplateButterfly extends Component {
	render() {
		const { children, className, id, path, seo, bg, form, SFCampaign, data } = this.props;

		return (
			<Layout path={path} seo={seo} className={classnames(className, "template_butterfly")} id={id}>
				<Img className="bg" fluid={bg} />
				<Tank className="inner">
					<Row className="modal">
						<Column className="info">
							{ children }
						</Column>
						<Column className="form">
							<Img className="header" fluid={data.FormHeader.childImageSharp.fluid} />
							<Form formId={form} SFCampaign={SFCampaign} fields="lines" bg="dark" />
						</Column>
					</Row>
				</Tank>
			</Layout>
		);
	}
}

export default TemplateButterfly;