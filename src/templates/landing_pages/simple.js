import React, {Component} from "react";
import Layout from "@components/layout";
import classnames from "classnames";
// import Img from "gatsby-image";

/*
import Column from "@components/Column";
import Form from "@components/Form";
import Tank from "@components/Tank";
import Row from "@components/Row";
*/

import "@css/templates/simple.css";

class TemplateSimple extends Component {
	render() {
		// const { children, className, id, path, seo, bg, headerImg, footerImg, formHeaderImg, form, formFields, formBg, data } = this.props;
		const { className, id, path, seo } = this.props;

		return (
			<Layout path={path} seo={seo} className={classnames(className, "template_simple")} id={id}>

			</Layout>
		);
	}
}

export default TemplateSimple;