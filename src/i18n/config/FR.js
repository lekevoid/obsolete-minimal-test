const router = require("../config/router");
const cta = require("../FR/component.cta");
const home = require("../FR/page.home");
const resources = require("../FR/module.resources");

module.exports = {
    key: "fr",
    path: "/fr",
	name: "Français",
	router,
	cta,
    home,
	resources,
}