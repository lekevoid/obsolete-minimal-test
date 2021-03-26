import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Tank from "./Tank";
import classnames from "classnames";
import PropTypes from "prop-types";
import {shuffle} from "@assets/annex";

import logo from "@logos/img.svg";

import "@css/components/LogosList.css";


export function TheLogosList({list, inc}) {
	if (list.length > 0) {
		return list.map((l) => {
			if (l.img) {
				return (<Logo src={l.img} id={l.id} objectFit="contain" key={l.id} />);
			}
			return null;
		})
	}
	return null;
}


export default function LogosList({ id, className, length=15, variation, columns=false, children}) {
	const logosListLength = length || 15;

	const [siblingElements, setSiblingElements] = useState([]);
	const [displayedLogos, setDisplayedLogos] = useState([]);
	const [unusedLogos, setUnusedLogos] = useState([]);
	const [inc, setInc] = useState(0);
	const [indexesOrder, setIndexesOrder] = useState(0);
	const [logos, setLogos] = useState(false);
	const [cols, setCols] = useState(columns);


	useEffect(() => {
		setSiblingElements([].concat.apply([], [children]));

		if (columns) {
			setCols(columns);
		} else if (children && children.length > 0) {
			setCols(children.length);
		} else {
			switch (parseInt(logosListLength)) {
				case 3 :
				case 9 :
					setCols(3);
					break;
				case 4 :
				case 8 :
					setCols(4);
					break;
				case 6 :
				case 12 :
				case 18 :
					setCols(6);
					break;
				case 5 :
				case 15 :
				case 20 :
				default :
					setCols(5);
					break;
			}
		}
	}, [children, columns, logosListLength]);


	useEffect(() => {
		setLogos([
			{ id: "logo_01", img: logo },
			{ id: "logo_02", img: logo },
			{ id: "logo_03", img: logo },
			{ id: "logo_04", img: logo },
			{ id: "logo_05", img: logo },
			{ id: "logo_06", img: logo },
			{ id: "logo_07", img: logo },
			{ id: "logo_08", img: logo },
			{ id: "logo_09", img: logo },
			{ id: "logo_10", img: logo },
			{ id: "logo_11", img: logo },
			{ id: "logo_12", img: logo },
			{ id: "logo_13", img: logo },
			{ id: "logo_14", img: logo },
			{ id: "logo_15", img: logo },
			{ id: "logo_16", img: logo },
			{ id: "logo_17", img: logo },
			{ id: "logo_18", img: logo },
			{ id: "logo_19", img: logo },
			{ id: "logo_20", img: logo },
		]);
	}, [variation]);


	useEffect(() => {
		if (logos && logos.length > 0) {
			setDisplayedLogos(logos.slice(0, logosListLength));
			setUnusedLogos(logos.slice(logosListLength, logos.length));

			let initIndexesOrder = [];
			for (let x=0; x<logosListLength; x++) {
				initIndexesOrder.push(x);
			}
			setIndexesOrder(shuffle(initIndexesOrder));
		}
	}, [logos, logosListLength]);


	useEffect(() => {
		const interval = setInterval(() => {
			if (displayedLogos.length > 5 && unusedLogos.length > 0) {
				const indexToChange = indexesOrder[inc];
				const replacement = Math.floor(Math.random() * unusedLogos.length);

				const newDisplayedLogosList = displayedLogos;
				const newUnusedLogosList = unusedLogos;

				const putLogoOnDisplay = unusedLogos[replacement];
				const putLogoOutOfDisplay = displayedLogos[indexToChange];

				newDisplayedLogosList.splice(indexToChange, 1, putLogoOnDisplay);
				newUnusedLogosList.splice(replacement, 1, putLogoOutOfDisplay);

				setDisplayedLogos(newDisplayedLogosList);
				setUnusedLogos(newUnusedLogosList);

				if (inc >= (indexesOrder.length - 1)) {
					setInc(0);
				} else {
					setInc(inc+1);
				}
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [displayedLogos, unusedLogos, inc, indexesOrder]);

	return (
		<Tank div className={classnames("LogosList", "animate_switch", variation, className)}>
			{(siblingElements.length > 0) && siblingElements.filter(node => (node && node.props && node.props.before))}
			<div id={id} className={classnames("logos", "cols_"+cols)}>
				{(logos.length > 0) && <TheLogosList list={displayedLogos} inc={inc} />}
				{(logos.length === 0) && children}
			</div>
			{(siblingElements.length > 0) && siblingElements.filter(node => (node && node.props && node.props.after))}
		</Tank>
	)
}


LogosList.propTypes = {
	after: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	before: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	length: PropTypes.oneOf(["3", "4", "5", "6", "8", "9", "10", "12", "15", "18", "20"])
}