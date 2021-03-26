import React from "react";
import classnames from "classnames";
import "@css/components/Loading.css";

export default function Loading({ id, className }) {
	return (
		<div id={id} className={classnames("Loading", className)}>
			<div className="line"></div>
			<div className="line"></div>
			<div className="line"></div>
		</div>
	);
}