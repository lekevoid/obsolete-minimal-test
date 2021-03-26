import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import T from "i18n-react";
import {navigate} from "gatsby";
import classnames from "classnames";
import {blogPostSlug} from "../assets/annex.js";

export default function LangSelector({path}) {
	const [currentLang, setCurrentLang] = useState(T.translate("key"));
	const [active, setActive] = useState(false);

	const toggleActive = (val) => {
		setActive(!val);
	}

    const navigateToTranslation = ({ lang, toPath }) => {
		setCurrentLang(lang);
		navigate(toPath);
	}

	const availableTranslations = useMemo(() => {
		const sanitizedPath = path.replace(/^\/|\/$/g, "") || "/";
		// Check if this comes from a blog post
		if (T.texts.translations && Object.values(T.texts.translations).length >= 1) {
			let out = {};
			out[T.translate("key")] = sanitizedPath;
			for (let translation of T.texts.translations) {
				const translationLanguage = translation.language.slug;
				out[translationLanguage] = blogPostSlug(translation.slug, translationLanguage);
			}
			return out;
			// Or else...
		} else {
			// ...we want to find in the router.js file, what translations are available.
			let r = Object.values(T.texts.router).find(route => {
				if (Object.values(route).find(translatedPath => translatedPath.match(sanitizedPath))) {
					for (let key in route) {
						if (key === "js" || route[key] === "") {
							delete route[key];
						}
					}
					return route;
				}
				return false;
			});

			return r;
		}
	}, [path]);

	const availableLangs = useMemo(() => {
		let out = [];

		if (availableTranslations) {
			const list = Object.keys(availableTranslations);
			const sortOrder = ['en', 'fr', 'es'];

			for (let lang of sortOrder) {
				if (list.includes(lang)) {
					out.push(lang);
				}
			}
		}

		return out;
	}, [availableTranslations]);

	const numberOfLanguages = useMemo(() => {
		if (availableLangs) {
			return availableLangs.length;
		}
		return 0;
	}, [availableLangs]);


	if (numberOfLanguages <= 1) {
		return (
			<div className="LangSelector disabled">
				<button className="current_lang">{currentLang}</button>
			</div>
		);
	} else {
		let displayLang = currentLang;
		if (currentLang === "/") { displayLang = ""; }

		return (
			<div className={classnames("LangSelector", active ? "active" : "")}>
				<button className="current_lang" onClick={() => { toggleActive(active) }} onBlur={() => { toggleActive(true) }}>{displayLang}</button>
				<div className={classnames("lang_options", `length_${numberOfLanguages}`)}>
					{availableLangs.map((lang) => {
						const path = "/" + availableTranslations[lang].replace(/^\/|\/$\//g, "");
						if (lang === currentLang) {
							return null;
						} else {
							return (
								<button
									key={lang}
									onClick={() => { navigateToTranslation({ lang: lang, toPath: path }) }}
									className={classnames("div", "option", lang)}>
										{lang.toUpperCase()}
								</button>
							);
						}
					})}
				</div>
			</div>
		)
	}
}

LangSelector.propTypes = {
	path: PropTypes.string.isRequired
}
