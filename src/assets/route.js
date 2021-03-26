import T from "i18n-react";
const router = require("../i18n/config/router");

export default function route(routeID, lang=T.translate("key")) {
	const foundRoute = Object.keys(router).find(checkRoute => checkRoute === routeID);

	if (foundRoute) {
		if (router[foundRoute][lang]) {
			const r = ("/" + router[foundRoute][lang]).replace("//", "/");
			return r;
		} else {
			console.log(`Route "${routeID}" doesn't exist in ${lang}`);
		}
	} else {
		console.error(`Route "${routeID}" doesn't exist in router`);
		return false;
	}
}