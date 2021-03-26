import React from "react";

import icon from "@img/carousels/img.svg";

import classnames from "classnames";

import "@css/components/PlayBtn.css";

export default function PlayBtn({ color="white", style="lines", id, className, div, onClick }) {
	let playBtn = icon;

	if (div) {
		return (
			<div role="button" id={id} className={classnames("div", "PlayBtn", className, color, style)} onClick={onClick} onKeyDown={onClick} tabIndex={0}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<img src={playBtn} alt="Play Arrow" />
			</div>
		);
	}

	return (
		<button id={id} className={classnames("div", "PlayBtn", className, color, style)} onClick={onClick} onKeyDown={onClick} tabIndex={0}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<img src={playBtn} alt="Play Arrow" />
		</button>
	);
}