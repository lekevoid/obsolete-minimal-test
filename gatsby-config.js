let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "production";
if (process.env.USERNAME === "localadmin") { activeEnv = "development" }

require("dotenv").config({
	path: `.env.${activeEnv}`
});

module.exports = {
	siteMetadata: {
		title: "Broadsign",
		name: "Broadsign",
		authors: "Kevin Gagnon, Valentin Lachere, Michel Maroun, Charbel Chahine",
		description: "Cloud-based digital signage solutions",
		type: "Company",
		url: process.env.SITE_URL || "https://broadsign.com",
		sameAs: [
			"https://www.facebook.com/BroadSign",
			"https://twitter.com/broadsign",
			"https://www.linkedin.com/company/broadsign"
		],
		facebookAppID: "BroadSign",
		twitterSiteID: "Broadsign",
		twitterUserID: "@broadsign",
		siteUrl: process.env.SITE_URL || "https://broadsign.com"
	},
	flags: {
		PRESERVE_WEBPACK_CACHE: true
	},
	plugins: [{
			resolve: "gatsby-plugin-react-helmet"
		},
		{
			resolve: "gatsby-plugin-catch-links"
		},
		{
			resolve: "gatsby-plugin-sharp",
			options: {
				useMozJpeg: false,
				stripMetadata: true,
				defaultQuality: 90,
			},
		},
		{
			resolve: "gatsby-transformer-sharp"
		},
		{
			resolve: `gatsby-source-youtube-v3`,
			options: {
			  channelId: ["UC-CxotkZOwRRip98nmU73WQ"],
			  apiKey: "AIzaSyCvHu0iR5qW1Tit4th6qOj2NzjDVGcm17E",
			  maxVideos: 5
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Broadsign",
				short_name: "Broadsign",
				start_url: "/",
				background_color: "#FFFFFF",
				theme_color: "#001464",
				display: "minimal-ui",
				icon: "static/icons/icon.png"
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: `${__dirname}/src/pages/`
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "queries",
				path: `${__dirname}/src/queries/`
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "img",
				path: `${__dirname}/src/assets/images/`
			}
		},
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
						{
						resolve: "gatsby-remark-images",
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 1600,
							withWebp: true
						},
					},
				],
			},
		},
		{
			resolve: "gatsby-plugin-sitemap",
			options: {
				exclude: [
					"/thank-you*",
					"/dsp/thank-you*",
					"/cn/*"
				],
			},
		},
		{
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: "GTM-MRM8KCP",

				// Include GTM in development.
				// Defaults to false meaning GTM will only be loaded in production.
				includeInDevelopment: true,

				// datalayer to be set before GTM is loaded
				// should be an object or a function that is executed in the browser
				// Defaults to null
				defaultDataLayer: {
					platform: "gatsby"
				},

				// Specify optional GTM environment details.
				// gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
				gtmPreview: "GTM Preview",
				// dataLayerName: "YOUR_DATA_LAYER_NAME",
			},
		},
		{
			resolve: `gatsby-source-wordpress`,
			options: {
				// the only required plugin option for WordPress is the GraphQL url.
				url: `${process.env.WP_URL}graphql`,
				verbose: true,
				develop: {
					// hardCacheMediaFiles: true,
				},
				html: {
					createStaticFiles: true,
				},
				schema: {
					timeout: 100000,
					requestConcurrency: 5,
					previewRequestConcurrency: 2,
				},
				debug: {
					timeBuildSteps: true,
					graphql: {
						// onlyReportCriticalErrors: true,
						showQueryVarsOnError: true,
					},
				},
			},
		},
		{
			resolve: "gatsby-plugin-svgr",
			options: {
				svgoConfig: {
					plugins: [
						{ cleanupIDs: false },
					],
				},
			},
		},
		{
			resolve: "gatsby-plugin-offline",
			options: {
				workboxConfig: {
				   globPatterns: ['*.html']
				}
			}
		},
		{
			resolve: "gatsby-plugin-alias-imports",
			options: {
				alias: {
					"@annex": "src/assets/annex.js",
					"@assets": "src/assets",
					"@components": "src/components",
					"@css": "src/styles/css",
					"@icons": "src/assets/images/icons",
					"@img": "src/assets/images",
					"@logos": "src/assets/images/logos",
					"@meta": "static/meta",
					"@route": "src/assets/route.js",
					"@router": "src/i18n/config/router.js",
					"@templates": "src/templates",
					"@utils": "src/utils",
				},
				extensions: ["js"]
			}
		},
		{
			resolve: "gatsby-plugin-split-css"
		},
		{
			resolve: "gatsby-plugin-feed",
			options: {
				feeds: [
					{
						serialize: ({ query: { posts } }) => {
							return posts.edges.map(edge => {
								const p = edge.node;
								const customURL = (`${process.env.SITE_URL}blog/${p.slug}`);
								let customDescription = p.excerpt.replace("broadsignposts.wpengine.com", `${process.env.SITE_URL}blog`);
								// if (p.yoast && p.yoast.metadesc && p.yoast.metadesc.length > 0) { customDescription = p.yoast.metadesc; }

								let customTitle = "";
								if (p.title) {
									customTitle = p.title.replace(/&#8217;/g, "'").replace(/&#8211;/g, "-").replace(/&#038;/g, "&").replace(/&#039;/g, "'").replace(/&amp;/gi, "&").replace(/&#160;/gi, " ");
								}

								let customContent = p.content.replace(/\[[^\]]+\]/g, "").replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, "").replace(/class=".+"/g, "");
								customContent = customContent.replace(/<iframe.+<\/iframe>/g, "");
								customContent = customContent.replace(/<script.+<\/script>/g, "");
								customContent = customContent.replace(/<br\s*\/*>/g, "");
								customContent = customContent.replace(/“/g, "\"").replace(/”/g, "\"");
								customContent = customContent.replace(/<img\s*\/>/g, "");

								let imgURL = "";
								let imgExt = "";
								if (p.featuredImage && p.featuredImage.node.sourceUrl) {
									imgURL = p.featuredImage.node.sourceUrl;
									imgExt = "image/"+imgURL.slice(-3);
								}

								if (imgURL === "") {
									console.error(`Error: post ${customURL} doesn't have a feature image or URL is empty.`);
								}

								return Object.assign({}, edge.node, {
									"title": customTitle,
									"description": customDescription,
									"date": edge.node.date,
									"url": customURL,
									"guid": customURL,
									"custom_elements": [
										{ "author": p.author.node.email },
										{ "content:encoded": customContent },
										{ "media:content": {
											_attr: {
												"xmlns:media": "http://search.yahoo.com/mrss/",
												"url": imgURL,
												"medium": "image",
												"type": imgExt
											}
										}},
									],
								});
							})
						},
						query: `
							{
								posts: allWpPost(filter: {language: {slug: { eq: "en" }}}, sort: {fields: date, order: DESC}) {
									edges {
										node {
											title
											slug
											excerpt
											date
											content
											featuredImage {
												node {
													sourceUrl
												}
											}
											author {
												node {
													name
													slug
												}
											}
										}
									}
								}
							}
						`,
						output: "/rss.xml",
						language: "en",
						title: "Broadsign's RSS Feed",
						image_url: "https://broadsign.com/meta/blog-en.jpg",
						managingEditor: 'Kevin Gagnon <kevin.gagnon@broadsign.com>',
    					webMaster: 'Kevin Gagnon <kevin.gagnon@broadsign.com>',
						categories: ['Digital Signage','DOOH','Programmatic DOOH'],
						pubDate: new Date(),
					},
					{
						serialize: ({ query: { posts } }) => {
							return posts.edges.map(edge => {
								const p = edge.node;
								const customURL = (`${process.env.SITE_URL}fr/blogue/${p.slug}`);
								let customDescription = p.excerpt.replace("broadsignposts.wpengine.com", `${process.env.SITE_URL}fr/blogue`);
								// if (p.yoast && p.yoast.metadesc && p.yoast.metadesc.length > 0) { customDescription = p.yoast.metadesc; }

								let customTitle = "";
								if (p.title) {
									customTitle = p.title.replace(/&#8217;/g, "'").replace(/&#8211;/g, "-").replace(/&#038;/g, "&").replace(/&#039;/g, "'").replace(/&amp;/gi, "&").replace(/&#160;/gi, " ");
								}

								let customContent = p.content.replace(/\[[^\]]+\]/g, "").replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, "").replace(/class=".+"/g, "");
								customContent = customContent.replace(/<iframe.+<\/iframe>/g, "");
								customContent = customContent.replace(/<script.+<\/script>/g, "");
								customContent = customContent.replace(/<br\s*\/*>/g, "");
								customContent = customContent.replace(/“/g, "\"").replace(/”/g, "\"");
								customContent = customContent.replace(/<img\s*\/>/g, "");

								let imgURL = "";
								let imgExt = "";
								if (p.featuredImage && p.featuredImage.node.sourceUrl) {
									imgURL = p.featuredImage.node.sourceUrl;
									imgExt = "image/"+imgURL.slice(-3);
								}

								if (imgURL === "") {
									console.error(`Error: post ${customURL} doesn't have a feature image or URL is empty.`);
								}

								return Object.assign({}, edge.node, {
									"title": customTitle,
									"description": customDescription,
									"date": edge.node.date,
									"url": customURL,
									"guid": customURL,
									"custom_elements": [
										{ "author": p.author.node.email },
										{ "content:encoded": customContent },
										{ "media:content": {
											_attr: {
												"xmlns:media": "http://search.yahoo.com/mrss/",
												"url": imgURL,
												"medium": "image",
												"type": imgExt
											}
										}},
									],
								});
							})
						},
						query: `
							{
								posts: allWpPost(filter: {language: {slug: { eq: "fr" }}}, sort: {fields: date, order: DESC}) {
									edges {
										node {
											title
											slug
											excerpt
											date
											content
											featuredImage {
												node {
													sourceUrl
												}
											}
											author {
												node {
													name
													slug
												}
											}
										}
									}
								}
							}
						`,
						output: "/rss_fr.xml",
						language: "fr",
						title: "Flux RSS de Broadsign",
						image_url: "https://broadsign.com/meta/blog-fr.jpg",
						categories: ['Affichage numérique','Affichage dynamique','DOOH'],
						pubDate: new Date(),
					}
				]
			}
		},
		{
			resolve: "gatsby-plugin-meta-redirect"
		},
		/* {
			resolve: "gatsby-plugin-gatsby-cloud"
		}, */
	]
}