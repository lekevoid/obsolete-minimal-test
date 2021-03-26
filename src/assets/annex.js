const annex = {
	blogPostSlug : (slug, lang="en") => {
		let r = "";

		if (lang.length > 2) {
			lang = lang.slice(0, 2);
		}

		switch (lang) {
			case "fr" :
				r = "/fr/blogue/" + slug.replace("/blog/", "") + "/";
				break;
			case "es" :
				r = "/es/blog/" + slug.replace("/blog/", "") + "/";
				break;
			case "en" :
			default :
				r = "/blog/" + slug.replace("/blog/", "") + "/";
		}

		return r.replace("//", "/");
	},

	empty : (variable) => {
		/* Checks if a variable is "falsy" : null, undefined, empty string, empty array */
		if (typeof(variable) === "boolean") { return false; }
		if (variable && typeof(variable) === "undefined") { return true; }
		if (variable && typeof(variable) === "object" && Object.values(variable).length === 0) { return true; }
		if (variable && (variable === "" || variable === false)) { return true; }
		return false;
	},

	excerpt : (string, maxLength=60) => {
		const maxChars = string.indexOf(" ", maxLength);
		if (maxChars > 0 && maxChars < string.length) {
			string = string.slice(0, maxChars) + "...";
		}
		return string;
	},

	formatDate : (date, lang="en", time="00:00", showDay = false, timezone="ET") => {
		if (!date.match(/(\d{4}-\d{2}-\d{2}|TBD)/)) {
			console.error(`Function formatDate(date, lang="en", time="00:00") : Argument 'date' should be a String in the form 'YYYY-MM-DD' or 'TBD' (received '${date}')`);
			return false;
		}

		if (!time.match(/\d{2}:\d{2}/)) {
			console.error(`Function formatDate(date, lang="en", time="00:00") : Argument 'time' should be a String in the form 'HH:MM' (received '${time}')`);
			return false;
		}

		if (String(date).toUpperCase() === "TBD") { return "TBD"; }

		const tzoffset = (new Date()).getTimezoneOffset() * 60000;
		const d = new Date(new Date(date).getTime() + tzoffset);
		const day = d.getDate();
		const month = d.toLocaleString(lang, { month: "long" });
		const year = d.getFullYear();

		let dayOfWeek = "";
		if (showDay) { dayOfWeek = d.toLocaleString(lang, { weekday: "long" }); }

		const t = time.match(/(\d{2}):(\d{2})/);
		let hours = t[1];
		let ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		let minutes = parseInt(t[2]);

		let out = "";

		if (lang === "fr") {
			timezone = "HE"
		}
		switch (lang) {
			case "es" :
				if (showDay) { out += `${dayOfWeek}, `; }
				out += `${day} de ${month} de ${year}`;
				if (time !== "00:00") { out += ` a las ${hours}:${minutes}`; }
				break;
			case "fr" :
				if (showDay) { out += `${dayOfWeek}, `; }
				out += `${day} ${month} ${year}`;
				if (time !== "00:00") { out += ` à ${hours}:${minutes} ${timezone}`; }
				break;
			case "en" :
			default :
				if (showDay) { out += `${dayOfWeek}, `; }
				out += `${month} ${day}, ${year}`;
				if (time !== "00:00") {
					out += " at ";
					if (minutes !== 0) {
						out += hours + ":" + String(minutes).padStart(2, "0") + ampm + " " + timezone;
					} else {
						out += hours + ampm + " " + timezone;
					}
				}

		}

		return out;
	},

	htmlChars : (string) => {
		string = string.replace(/&#8217;/g, "'");
		string = string.replace(/&#8211;/g, "-");
		string = string.replace(/&#038;/g, "&");
		string = string.replace(/&#039;/g, "'");
		string = string.replace(/&amp;/gi, "&");
		string = string.replace(/&#160;/gi, " ");
		return string;
	},

	slugify : (string, preferredChar="-") => {
		string = string.replace(/(\s|_|-)/g, preferredChar).toLowerCase();
		return string;
	},

	shuffle : (arr) => {
		let j, x, i;
		for (i = arr.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = arr[i];
			arr[i] = arr[j];
			arr[j] = x;
		}
		return arr;
	},

	sortByName : (arr) => {
		arr.sort(function(a, b) {
			var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
			if (nameA < nameB) { return -1 ; }
			if (nameA > nameB) { return 1; }
			return 0;
		});
		return arr;
	},

	wpTag : (id, ...params) => {
		const tags = {
			393 : "advertising",
			2755: "ddddddd_sssssss_hardware",
			2757: "ise",
			2759: "interview",
			2761: "programmatic",
			2763: "women_in_tech",
			2765: "ddddddd_sssssss_events",
			2767: "transit",
			2771: "ddddddd_sssssss_nnnnnnn",
			2773: "healthcare",
			2775: "ddddddd_sssssss_software",
			2777: "digital_out_of_home",
			2779: "retail",
			2781: "location",
			2785: "dse",
			2787: "mobile",
			2789: "fepe",
			2791: "cinema",
			2810: "advertisments",
			2812: "dynamic_content",
			2858: "grocery_store",
			2860: "static",
			2862: "hood",
			2870: "digital_out_of_home_sales",
			2872: "working_at_company",
			2874: "ddddddd_sssssss",
			2876: "interview_women_in_tech",
			2881: "advertisements",
			2883: "audience_data",
			2885: "aleports",
			2887: "social_media",
			2889: "video",
			2891: "wayfinding",
			2893: "security",
			2895: "smart_cities",
			2900: "content_management_system",
			2904: "company_rattan",
			3137: "static_foo",
			3139: "traditional_foo",
			3141: "aille",
			3143: "foo",
			3206: "tech",
			3253: "cannabis",
			3255: "dispensary",
			3257: "london_ddddddd_sssssss_week",
			3259: "billboard",
			3261: "amsterdam",
			3263: "out_of_home",
			3265: "privacy",
			3267: "hood_101",
			3270: "ddddddd_sssssss_week",
			3272: "cannes_lions",
			3274: "ces",
			3278: "gas_stations",
			3280: "banking",
			3282: "internal_communications",
			3284: "exterion_media",
			3286: "a2amedia",
			3288: "hospitality",
			3342: "hood_101",
			3373: "programmatique",
			3457: "publicite_exterieur",
			3459: "publicite_dynamique",
			3461: "publicite",
			3479: "entertainment",
			3604: "ddddddd_sssssss",
			3943: "foo_from_home",
			3939: "company_parade",
			3945: "webinars",
			3947: "buy_programmatic_hood",
			3949: "sell_programmatic_hood",
			3941: "remote",
			3848: "ai",
			3846: "press_releases",
			3684: "pppppppp_launches",
			3682: "product_updates",
			4915: "covid_19",
		};

		if (id.toString().match(/^\d{3,5}$/)) {
			if (tags[id]) {
				return tags[id];
			} else {
				console.error(`Tag id ${id} unregognized`);
				return "";
			}
		} else if (id.toString().match(/\w+/) && params) {
			return String(id).replace(/-/g, "_");
		} else {
			return String(id).replace(/-/g, "_");
		}
	},

	help : () => {
		console.log("The following functions are available in this package :");
		console.log("blogPostSlug(String <slug>, String <lang>)");
		console.log("empty(Any <variable>)");
		console.log("excerpt(String <string>, Int <maxLength>)");
		console.log("formatDate(Date <date>, String <lang>)");
		console.log("formatDate(Date <date>, String <lang>, String <time>)");
		console.log("htmlChars(String <string>)");
		console.log("sortByName(Array <arr>)");
		console.log("wpTag(String <id>)");
		return ("called for help ?");
	},
}

module.exports = annex;