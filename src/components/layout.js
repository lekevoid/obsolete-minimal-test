import React, { Profiler, useCallback, useEffect, useMemo, useState } from "react";
import classnames from "classnames";

import Helmet from "./Helmet";
import Header from "./Header";
import Footer from "./Footer";


import "@css/index.css";
import "@css/components/Layout.css";
import "@css/components/CookieConsent.css";

export default function Layout({ id, className, children, path, seo, hideHeader=false, hideFooter=false})  {
	const [reducedNav, setReducedNav] = useState(false);

	const handleScroll = useCallback(e => {
		if (typeof window !== "undefined") {
			if (window.scrollY > 400 && !reducedNav) { setReducedNav(true); }
			else if (window.scrollY < 400) { setReducedNav(false); }
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", handleScroll);
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		}
	}, [handleScroll])


	const logoVersion = useMemo(() => {
		return "normal";
	}, []);


	if (path && path.includes("404")) {
		return (
			<div id="global">
				<main>{children}</main>
			</div>
		)
	}

	if (path && path.includes("/cn")) {
		return <div id="global" className="white_screen"></div>
	}

	return (
		<div id="global" className={classnames((hideHeader ? "hide_header" : ""), (reducedNav ? "reduced_nav" : ""))}>
			<Helmet seo={seo} path={path} />
			{hideHeader !== true && <Header path={path} logoVersion={logoVersion} />}
			<main className={className} id={id}>{children}</main>
			{hideFooter !== true && <Footer path={path} />}
			{/* THIS IS JUST TO PREVENT A STUPID ERROR IN CHROME DEV CONSOLE RELATED TO GTM */}
			<div style={{display:"none"}} id="xxxx"></div>
		</div>
  )
}
