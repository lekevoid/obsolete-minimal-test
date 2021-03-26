/* ROUTES */
const router = require("../config/router");
const cta = require("../EN/component.cta");
const home = require("../EN/page.home");
const resources = require("../EN/module.resources");

module.exports = {
    key: "en",
    path: "",
	name: "English",
	router,
	cta,
	home,
	resources,
}
