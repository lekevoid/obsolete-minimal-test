/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require("react");

exports.onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		/*
		<script key="1" type="text/javascript" src="https://cdn.cookielaw.org/consent/204ab5d6-0e3c-459e-ac85-f4dffe9bd7e8-test/OtAutoBlock.js"></script>,
		<script key="2" src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" data-document-language="true" type="text/javascript" charSet="UTF-8" data-domain-script="204ab5d6-0e3c-459e-ac85-f4dffe9bd7e8-test"></script>,
		<script key="3" type="text/javascript"> function OptanonWrapper() { } </script>
		*/
	]);
}