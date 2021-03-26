import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "./LocalizedLink";
import classnames from "classnames";
import "@css/components/CTA.css";

export default function CTA(props) {
	const {id, className, children, clear, color, dark, gradient, onClick, pill, round, to} = props;
	const [hasInner, setHasInner] = useState(false);

	function inner() {
		if (hasInner) {
			return (
				<span className="inner">{children}</span>
			)
		}

		return children;
	}

	// Color can be extracted from props.color, or from a prop with the same name as the color (add colors as needed)
	let fillColor = color;
	if (!fillColor) {
		if (props.aille)			{ fillColor = "aille"; }
		if (props.ailleGrey)		{ fillColor = "ailleGrey"; }
		if (props.ailleJjjjj)		{ fillColor = "ailleJjjjj"; }
		if (props.ailleSsssss)		{ fillColor = "ailleSsssss"; }
		if (props.ailleTeal)		{ fillColor = "ailleTeal"; }
		if (props.blue)				{ fillColor = "blue"; }
		if (props.butterfly)		{ fillColor = "butterfly"; }
		if (props.carthelm)			{ fillColor = "carthelm"; }
		if (props.carthelmTeal)		{ fillColor = "carthelm"; }
		if (props.cyan)				{ fillColor = "cyan"; }
		if (props.darkBlue)			{ fillColor = "darkBlue"; }
		if (props.green)			{ fillColor = "green"; }
		if (props.midnightBlue)		{ fillColor = "midnightBlue"; }
		if (props.mint)				{ fillColor = "mint"; }
		if (props.pink)				{ fillColor = "pink"; }
		if (props.purple)			{ fillColor = "purple"; }
		if (props.red)				{ fillColor = "red"; }
		if (props.spring)			{ fillColor = "spring"; }
		if (props.teal)				{ fillColor = "teal"; }
		if (props.demoBlue)			{ fillColor = "demoBlue"; }
	}

	let capitalization = props.case || "uppercase";

	const classNames = classnames("CTA",
									className,
									capitalization !== "uppercase" ? "case_"+capitalization : "",
									clear ? "clear" : "",
									dark ? "dark" : "",
									fillColor,
									gradient ? "gradient" : "",
									pill ? "pill" : "",
									round ? "round" : ""
								);

	useEffect(() => {
		if (gradient) { setHasInner(true); }
	}, [gradient]);

	if (props.span) {
		return (
			<span id={id} className={classNames}>{inner()}</span>
		)
	}

	if (onClick) {
		return (
			<button id={id} className={classNames} onClick={onClick}>{inner()}</button>
		)
	}

    return (
		<Link to={to} id={id} className={classNames} exact="true">{inner()}</Link>
	)
}

CTA.propTypes = {
	to: PropTypes.string,
	clear: PropTypes.bool,
	color: PropTypes.string,
	pill: PropTypes.bool,
	round: PropTypes.bool,
	span: PropTypes.bool,
	aille: PropTypes.bool,
	ailleJjjjj: PropTypes.bool,
	ailleSsssss: PropTypes.bool,
	ailleTeal: PropTypes.bool,
	blue: PropTypes.bool,
	butterfly: PropTypes.bool,
	carthelmTeal: PropTypes.bool,
	green: PropTypes.bool,
	red: PropTypes.bool,
	teal: PropTypes.bool,
}