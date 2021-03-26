import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import LazyLoad from "react-lazyload";
import Img from "gatsby-image/withIEPolyfill";
import Video from "./Video";
import "@css/components/VideoPoster.css";

export default function VideoPoster({ bg, poster, title, url, YTid, playBtnStyle="lines", playBtnColor="white", className, id, children }) {
	const [siblingElements, setSiblingElements] = useState([]);

	if (!id && YTid) {
		id = YTid;
	}

	let sectionStyles = {};
	if (bg) {
		if (bg === "transparent" || (typeof(bg) === "string" && bg.match(/#\w{3,6}/))) {
			sectionStyles.backgroundColor = bg;
		}
	}

	useEffect(() => {
		setSiblingElements([].concat.apply([], [children]));
	}, [children]);

	return (
		<section id={"video_poster_"+id} className={classnames("VideoPoster", className)} style={sectionStyles}>
			{bg && typeof(bg) === "object" ? <Img fluid={bg} className={classnames("bg", className)} objectFit="cover" /> : null}
			{(siblingElements.length > 0) && siblingElements.filter(node => (node && node.props && node.props.before))}
			<LazyLoad>
				<Video title={title} playBtnStyle={playBtnStyle} playBtnColor={playBtnColor} url={url} YTid={YTid} poster={poster} id={id}>
					{(siblingElements.length > 0) && siblingElements.filter(node => (node && node.props && !node.props.before && !node.props.after))}
				</Video>
			</LazyLoad>
			{(siblingElements.length > 0) && siblingElements.filter(node => (node && node.props && node.props.after))}
		</section>
	)
}

VideoPoster.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	bg: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
	poster: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
	title: PropTypes.string,
	url: PropTypes.string,
	YTid: PropTypes.string
}