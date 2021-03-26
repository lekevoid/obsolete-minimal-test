import React from "react";
import PropTypes from "prop-types";
import GatsbyLink from "gatsby-link";

import "@css/components/Link.css"

export default function LocalizedLink({ to, ...props }) {
	if (to) {
		// Test if the link looks to be external (contains https:// in the beginning)
		const externalPattern = new RegExp("https*://");
		if (to.search(externalPattern) !== -1) {
			return (
				<a href={to} target="_blank" rel="noopener noreferrer" {...props} exact="true">{props.children}</a>
			)
		} else {
			to = "/" + to.replace(/^\//, "");
		}

		// Test if this is supposed to be a target="_blank" link
		if (props.target && props.target === "_blank") {
			return (
				<a href={to} target="_blank" rel="noopener noreferrer" {...props} exact="true">{props.children}</a>
			)
		}
	} else {
		if (typeof to !== "string") {
			console.error(`A link in LocalizedLink is missing the "to" property : `, props);
		}
	}

	return (
		<GatsbyLink to={to} {...props} exact="true" />
	)
}

LocalizedLink.propTypes = {
	to: PropTypes.string.isRequired
}