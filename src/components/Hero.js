import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image/withIEPolyfill";
import Tank from "./Tank";
import classnames from "classnames";

import "@css/components/Hero.css"

export default function Hero({className, id, img, imgSrc, children}) {
	let tankClasses = [];
	if (className && className.includes("base_1400")) { tankClasses.push("base_1400"); }
	if (className && className.includes("base_900")) { tankClasses.push("base_900"); }

	if (imgSrc) {
		const style = { backgroundImage: "url('"+imgSrc+"')" }
		return (
			<section id={id} className={classnames("Hero", className)} style={style}>
				<Tank div className={classnames(...tankClasses)}>
					{children}
				</Tank>
			</section>
		)
	} else if (img) {
		return (
			<section id={id} className={classnames("Hero", "fluid", className)}>
				<Img fluid={img} className="bgFluid" objectFit="cover" alt="" />
				<Tank div className={classnames(...tankClasses)}>
					{children}
				</Tank>
			</section>
		)
	}

	return (
		<section id={id} className={classnames("Hero", className)}>
			{children}
		</section>
	)
}

Hero.propTypes = {
	className: PropTypes.string,
	img: PropTypes.object,
	imgSrc: PropTypes.string
}
