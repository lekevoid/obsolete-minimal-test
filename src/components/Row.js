import React from "react"
import classnames from "classnames"
import "@css/components/Row.css";

export default function Row(props) {
	const { id, className, children, wrap } = props;
	const childrenArr = Object.values(props.children).filter(e => e !== "");

	let wrapStyle = "nowrap";
	if (wrap) { wrapStyle = "wrap"; }

	return (
		<div className={classnames("Row", className, "cols-"+childrenArr.length, wrapStyle)} id={id}>
			{children}
		</div>
	)
}