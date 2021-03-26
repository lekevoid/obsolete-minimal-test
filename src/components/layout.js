import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Profiler } from "react"

import Helmet from "./Helmet";
import Header from "./Header";
import Footer from "./Footer";

import classnames from "classnames";

import "@css/index.css";
import "@css/components/Layout.css";
import "@css/components/CookieConsent.css";

export default function Layout({ id, className, children, path, seo, hideHeader=false, hideFooter=false})  {
	const [reducedNav, setReducedNav] = useState(false);

	/*
	useEffect(() => {
		document.getElementsByTagName("html")[0].setAttribute("data-scroll-behavior", "auto");
		setTimeout(() => {
			document.getElementsByTagName("html")[0].setAttribute("data-scroll-behavior", "smooth");
		}, 500);
	}, [className]);
	*/

	const handleScroll = useCallback(e => {
		if (typeof window !== "undefined") {
			if (window.scrollY > 400 && !reducedNav) { setReducedNav(true); }
			else if (window.scrollY < 400) { setReducedNav(false); }
		}
	})

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", handleScroll);
		}
	}, [reducedNav])


	const logoVersion = useMemo(() => {
		return "normal";
	}, []);

	const globalClassNames = useMemo(() => {
		if (path && path.includes("/cn")) {
			return "white_screen";
		}
		return "";
	}, [path]);


	if (path && path.includes("404")) {
		return (
			<div id="global">
				<main>{children}</main>
			</div>
		)
	}

	/*
	function callback(
		id, // the "id" prop of the Profiler tree that has just committed
		phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
		actualDuration, // time spent rendering the committed update
		baseDuration, // estimated time to render the entire subtree without memoization
		startTime, // when React began rendering this update
		commitTime, // when React committed this update
		interactions // the Set of interactions belonging to this update
	) {
		console.log(id, phase, actualDuration);
	}

	return (
		<div id="global" className={classnames(globalClassNames, (hideHeader ? "hide_header" : ""), (reducedNav ? "reduced_nav" : ""))}>
			<Profiler id="Helmet" onRender={callback}>
				<Helmet seo={seo} path={path} />
			</Profiler>
			<Profiler id="Header" onRender={callback}>
				{hideHeader !== true && <Header path={path} logoVersion={logoVersion} availableBlogTranslations={availableBlogTranslations} />}
			</Profiler>
			<Profiler id="Body" onRender={callback}>
				<main className={className} id={id}>{children}</main>
			</Profiler>
			<Profiler id="Footer" onRender={callback}>
				{hideFooter !== true && <Footer path={path} />}
			</Profiler>
			<div style={{display:"none"}} id="xxxx"></div>
		</div>
	)
	*/

	return (
		<div id="global" className={classnames(globalClassNames, (hideHeader ? "hide_header" : ""), (reducedNav ? "reduced_nav" : ""))}>
			<Helmet seo={seo} path={path} />
			{hideHeader !== true && <Header path={path} logoVersion={logoVersion} />}
			<main className={className} id={id}>{children}</main>
			{hideFooter !== true && <Footer path={path} />}
			{/* THIS IS JUST TO PREVENT A STUPID ERROR IN CHROME DEV CONSOLE RELATED TO GTM */}
			<div style={{display:"none"}} id="xxxx"></div>
		</div>
  )
}
