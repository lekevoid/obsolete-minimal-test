import React, { useEffect, useState } from "react";
import { globalHistory  } from '@reach/router';
import PropTypes from "prop-types";
import HubSpotForm from "react-hubspot-form";
import Loading from "./Loading";
import classnames from "classnames";

import "@css/components/Form.css";

export default function Form(props) {
	let { reddddddUrl, dddPage } = props;
	const { className, formId, SFCampaign, bg, fields, onFormSubmit } = props;
	// Special functions passed as props
	const { onFormSubmitAction } = props;

	const [loaded, setLoaded] = useState(false);

	let portalId = "297064";
	const wrapperID = "form-wrapper-"+formId+"-"+Math.ceil(Math.random() * 1000000);

	const domain = globalHistory.location.host;
	let redddddd = "";
	if (reddddddUrl) {
		if (dddPage) {
			redddddd = `https://${domain}/ddd/${reddddddUrl}/?n=[${dddPage} slug='yes']`;
		} else {
			redddddd = `https://${domain}/${reddddddUrl}`;
		}
	}

	const formFieldErrorHandler = (field) => {
		var p = field.parentNode.parentNode;
		setTimeout(() => {
			if (Object.values(field.classList).indexOf("error") >= 0) {
				p.classList.add("error");
			} else {
				p.classList.remove("error");
			}

			var f = document.getElementsByClassName("field");
			for (var c=0; c<f.length; c++) {
				f[c].classList.remove("error");
			}

			var errorMsgs = document.getElementsByClassName("hs-error-msgs");
			for (var b=0; b<errorMsgs.length; b++) {
				var m = errorMsgs[b];
				if (Object.values(m.parentNode.classList).indexOf("field") >= 0) {
					m.parentNode.classList.add("error");
				}
			}

		}, 300);
	}

	const formFieldChangeHandler = (field) => {
		var p = field.parentNode.parentNode;
		if (field.value !== "" && field.value.length > 0) {
			p.classList.add("field_not_empty");
		} else {
			p.classList.remove("field_not_empty");
		}
	}

	const formFieldFocusHandler = (field) => {
		var p = field.parentNode.parentNode;
		p.classList.add("field_focused");
	}

	const formFieldBlurHandler = (field) => {
		var p = field.parentNode.parentNode;
		p.classList.remove("field_focused");
	}

	const hideHidden = () => {
		/*
			This very inaptly named function ensures that all "hidden" fields are actually hidden, and don't have
			leftover margins or whatnot. This is necessary since the CSS :visible selector doesn't actually exist.
		*/
		var f = document.getElementsByClassName("hsForm_"+formId);
		if (f.length >= 1) {
			f = f[0].querySelectorAll(".field");
			for (var a=0; a<f.length; a++) {
				if (f[a].style.display === "none") {
					f[a].parentNode.classList.add("hidden");
				}
			}
		}
	}

	const initiateListeners = () => {
		const s = document.getElementsByClassName("hsForm_"+formId)[0];

		if (s) {
			if (onFormSubmitAction) {
				s.addEventListener("submit", (event) => {
					onFormSubmit(event);
				});

				let submitBtn = s.querySelector("input[type='submit']");
				if (submitBtn) {
					submitBtn.addEventListener("click", (event) => {
						onFormSubmit(event);
					});
				}
			}

			let f = s.querySelectorAll("input, select, textarea");
			for (let a=0; a<f.length; a++) {
				if (f[a].value !== "") {
					formFieldChangeHandler(f[a]);
				}
				f[a].addEventListener("change", (event) => {
					formFieldChangeHandler(event.target);
					formFieldErrorHandler(event.target);
				});
				f[a].addEventListener("focus", (event) => {
					formFieldFocusHandler(event.target);
				});
				f[a].addEventListener("blur", (event) => {
					formFieldBlurHandler(event.target);
				});
				f[a].addEventListener("invalid", (event) => {
					formFieldErrorHandler(event.target);
				});

				new MutationObserver((event) => {
					formFieldErrorHandler(event[0].target);
				}).observe(f[a], {
					attributes: true,
					attributeFilter: ["class"],
					childList: false,
					characterData: false
				});
			}
		}
	}

	/*
	const formValidationMessage = () => {
		if (validationMessage === true) {}
	}

	markParentPanelAsSubmitted(node) {
		let currentNode = false;
		// Recursively search the closest .Panel parent of the submitted form and give it the "submitted" className
		if (node) {
			currentNode = node;
		} else {
			currentNode = document.getElementsByClassName("submitted-message")[0];
		}
		console.log(currentNode);
		if (currentNode && currentNode.classList) {
			console.log(currentNode.classList);
			if (currentNode.classList.includes("Panel")) {
				currentNode.classList.add("submitted");
			} else {
				this.markParentPanelAsSubmitted(currentNode.parentNode);
			}
		}
	}
	*/

	/* If the form has an inline message and the onFormSubmit prop is populated, launch the action */
	/*
	if (submitted && onFormSubmit) {
		if (document.getElementsByClassName("submitted-message")) {
			const currentNode = document.getElementsByClassName("submitted-message")[0];
			switch (onFormSubmit) {
				case "markParentPanelAsSubmitted" :
					this.markParentPanelAsSubmitted(currentNode);
					break;
			}
		}
	}
	*/

	/*
	const onFormSubmitHandler = (e) => {
		switch (onFormSubmitAction) {
			case "registerOFHWebinar" :
			case "viewOFHWebinar" :
				onFormSubmit(e);
				break;
			default:
				return false;
		}
	}
	*/

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<div id={wrapperID} className={classnames("Form", className, "bg_" + bg, "fields_" + fields, loaded ? "loaded" : "")}>
			<Loading />
			<HubSpotForm
				portalId={portalId}
				formId={formId}
				target={"#"+wrapperID}
				sfdcCampaignId={SFCampaign}
				onReady={(f) => {
					initiateListeners();
					hideHidden();
				}}
				reddddddUrl={redddddd}
				onSubmit={()=> {console.log('Flawless Victory!')}}
			/>
		</div>
	)
}

Form.propTypes = {
	className: PropTypes.string,
	formId: PropTypes.string.isRequired,
	SFCampaign: PropTypes.string,
	bg: PropTypes.string.isRequired,
	fields: PropTypes.string.isRequired,
	reddddddUrl: PropTypes.string,
	dddPage: PropTypes.string,
}
