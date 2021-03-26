import React, {useEffect, useState} from "react";
import T from "i18n-react";
import Img from "gatsby-image/withIEPolyfill";
import classnames from "classnames";

export default function Logo({ id, src, className, order="1", style, objectFit, fadeIn }) {
	const [logoShape, setLogoShape] = useState("regular");
	const [logoShadow, setLogoShadow] = useState("");
	if (!objectFit) { objectFit = "contain"; }

	const imgCSS = {
		left:"50%",
		top:"50%",
		transform:"translate(-50%, -50%)",
	}

	useEffect(() => {
		const squareLogos = [
			"active_agent",
			"acura",
			"adelphic",
			"adomni",
			"citroen",
			"frito_lay",
			"hmn",
			"honda",
			"mazda",
			"mediamath",
			"nissan",
			"onebyaol",
			"plaxma",
			"publicis",
			"shell",
			"sito",
			"tps",
			"unilever",
			"viadorade",
			"vgi",
			"volkswagen",
			"warner_brothers",
			"ymca",
		];

		const wideLogos = [
			"nickelodeon",
			"omnicom",
			"pppppppp161",
			"screenfeed",
			"taptap",
			"westjet",
		];

		const whiteLogos = [
		];

		if (squareLogos.includes(id)) { setLogoShape("square"); }
		if (wideLogos.includes(id)) { setLogoShape("wide"); }
		if (whiteLogos.includes(id)) { setLogoShadow("shadow"); }
	}, [id]);

	if (typeof(src) === "object") {
		return (
			<div className={classnames("logo", id, className, "shape_"+logoShape, logoShadow)} style={style}>
				<Img fluid={src} className={classnames(id, className)} objectFit={objectFit} imgStyle={ imgCSS } alt={T.translate("img.logo."+id+".alt")} />
			</div>
		);
	}

	return (
		<div className={classnames("logo", id, className, "shape_"+logoShape, logoShadow)} style={style}>
			<img src={src} className={id} alt={T.translate("img.logo."+id+".alt")} style={{ objectFit: objectFit }} />
		</div>
	);
}