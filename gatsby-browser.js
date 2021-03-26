/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

exports.onRouteUpdate = ({ location }) => {
	const url = location.pathname;
	// console.log("navigated to", url);

	if (window.drift) {
		window.drift.page(url);
	}

	const redirects = require("./src/assets/redirects.js");
	if (url.includes("/cn")) {
		const redirect = redirects.find(r => r.from.includes(url));
		if (window && redirect) {
			window.location.href = redirect.to;
		}
	} else {
		const redirect = redirects.find(r => (r.from === url || r.from === url+"/"));
		if (window && redirect) {
			window.location.href = redirect.to;
		}
	}
}