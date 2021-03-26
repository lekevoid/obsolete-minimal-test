import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Img from "gatsby-image/withIEPolyfill";
import PlayBtn from "@components/PlayBtn";

import "@css/components/Video.css";

export default function Video({title, url, YTid, poster, forceStop, playBtnStyle="lines", playBtnColor="white", className, id, children}) {
	const YTidPattern = /[\w\d-]{10,12}/i;

	const [loading, setLoading] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [videoSrc, setVideoSrc] = useState("");

    const startPlaying = () => {
        if (loading) {
			setLoading(false);
			setPlaying(true);
        }
    }

	useEffect(() => {
		if (forceStop) {
			setVideoSrc("");
			setPlaying(false);
			setLoading(false);
		} else {
			if (loading && !playing) {
				if (url) {
					setVideoSrc(url);
				} else if (YTidPattern.test(YTid)) {
					setVideoSrc("https://www.youtube.com/embed/" + YTid + "?autoplay=1");
				} else {
					console.error("No proper video URL specified for [" + title + "]")
				}
			}

			if (videoSrc !== "") {
				setPlaying(true);
			}

			if (playing) {
				setLoading(false);
			}
		}
	}, [loading, playing, videoSrc, forceStop, title, url, YTid, YTidPattern]);

	return (
		<div id={id} className={classnames("Video", loading ? "loading" : "", playing ? "playing" : "")}>
			<div className="inner">
				<button className="div poster" onClick={() => { setLoading(true) }}>
					<Img fluid={poster} objectFit="cover" className="bg" />
					<PlayBtn color={playBtnColor} style={playBtnStyle} div />
					<div className="tagline">
						{children}
					</div>
				</button>
				<iframe
					title={title}
					frameBorder="0"
					allow="autoplay; encrypted-media"
					allowFullScreen
					src={videoSrc}
					onLoad={() => { startPlaying() }}
				></iframe>
			</div>
		</div>
	)
}

Video.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	title: PropTypes.string,
	url: PropTypes.string,
	YTid: PropTypes.string,
	poster: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
	forceStop: PropTypes.bool,
	playBtnStyle: PropTypes.oneOf(["lines", "semisolid", "solid"]),
}