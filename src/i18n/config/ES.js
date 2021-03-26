const router = require("../config/router")
const cta = require("../ES/component.cta")
const home = require("../ES/page.home")
const resources = require("../ES/module.resources")

module.exports = {
	key: "es",
	path: "/es",
	name: "Español",
	router,
	cta,
	home,
	resources,
}