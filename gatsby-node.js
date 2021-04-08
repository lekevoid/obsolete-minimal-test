const path = require("path");
const i18n = require("./src/i18n/config/i18n");
const router = require("./src/i18n/config/router");
const $ = require("./src/assets/annex.js");
const redirects = require("./src/assets/redirects.js");
const fetch = require("node-fetch");


let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "production";
if (process.env.USERNAME === "localadmin") { activeEnv = "development" }

require("dotenv").config({
	path: `.env.${activeEnv}`
});

// console.log("ACTIVE ENVIRONMENT :", activeEnv);

// const sharp = require("sharp");
// sharp.simd(false);
// sharp.cache(false);


exports.onPreBootstrap = () => {
	console.log("--------------------------------------------------");
	console.log("Pulling blog posts from :", `${process.env.WP_URL}graphql/`);
	const _d = new Date();
	console.log("Build started at :", _d.toLocaleTimeString('en-GB', { timeZone: 'America/Montreal' }), "on", _d.toLocaleDateString('en-GB', { timeZone: 'America/Montreal' }));
	console.log("--------------------------------------------------");
};


exports.onCreatePage = ({ page, actions }) => {
	const { createPage, deletePage, createRedirect } = actions;

	if (!page.path.match(/(404|app-shell-fallback)/)) {
		deletePage(page);

		let jsPathToFindInRouter = (page.path === "/" ? "/index/" : page.path);
		let route = Object.values(router).find(r => `/${r.js}/` === jsPathToFindInRouter);

		if (route) {
			Object.keys(i18n).map(lang => {
				if (route[lang] && route[lang] !== "") {
					const url = `/${route[lang]}`.replace(/\/\//g, "/");
					console.log(url);

					createPage({
						...page,
						path: url,
						context: {
							...page.context,
							lang: i18n[lang],
							langRegex: `/${lang}/`,
						},
					})
				}
			})
		} else {
			console.error("found no route for", jsPathToFindInRouter);
		}
	}
}


/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
 exports.createPages = async gatsbyUtilities => {
	// Query our posts from the GraphQL server
	const posts = await getPosts(gatsbyUtilities)

	// console.log(posts);

	// If there are no posts in WordPress, don't do anything
	if (!posts || !posts.length) {
		return
	}

	// If there are posts, create pages for them
	await createIndividualBlogPostPages({ posts, gatsbyUtilities })

	// And a paginated archive
	// await createBlogPostArchive({ posts, gatsbyUtilities })
}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) => {
	Promise.all(
		posts.map(({ post }) => {
			// console.log(post.slug, post.language.slug, $.blogPostSlug(post.slug, post.language.slug));
			// createPage is an action passed to createPages
			// See https://www.gatsbyjs.com/docs/actions#createPage for more info

			// console.log(posts);

			gatsbyUtilities.actions.createPage({
				// Use the WordPress uri as the Gatsby page path
				// This is a good idea so that internal links and menus work 👍
				path: $.blogPostSlug(post.slug, post.language.slug),

				// use the blog post template as the page component
				component: path.resolve(`./src/templates/post.js`),

				// `context` is available in the template as a prop and
				// as a variable in GraphQL.
				context: {
					// we need to add the post id here
					// so our blog post template knows which blog post
					// the current page is (when you open it in a browser)
					id: post.databaseId,
					dico: i18n[post.language.slug],
					lang: post.language.slug,
					suggestedReadingPosts: [],

					// We also use the next and previous id's to query them and add links!
				},
			})
		})
	)
}

async function getPosts({ graphql, reporter }) {
	const graphqlResult = await graphql(`
		query WpPosts {
			# Query all WordPress blog posts sorted by date
			allWpPost(filter: {status: {eq: "publish"}, featuredImage: {node: {localFile: {childImageSharp: {fluid: {src: {ne: null}}}}}}}, sort: {fields: [date], order: DESC}) {
				edges {
					post: node {
						title
						slug
						uri
						status
						databaseId
						date
						language {
							slug
							name
						}
						categories {
							nodes {
								name
								slug
							}
						}
						translations {
							slug
							title
							language {
								slug
							}
						}
						featuredImage {
							node {
								localFile {
									childImageSharp {
										fluid(maxWidth: 1600) {
											src
											srcSet
											aspectRatio
											sizes
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`)

	if (graphqlResult.errors) {
			reporter.panicOnBuild(
				`There was an error loading your blog posts`,
				graphqlResult.errors
			)
			return
	}

	return graphqlResult.data.allWpPost.edges;
}

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;


	createTypes(`
		interface WpTermNode implements Node

		type SitePage implements Node @dontInfer {
			path: String!
		}
	`)


	/*
	createTypes(`
		interface WpTermNode implements Node

		type WpNodePost implements Node {
			nodes: [WpPost]
		}

		type WpPost implements Node {
			related_posts: WpNodePost!
		}

		type SitePage implements Node @dontInfer {
			path: String!
		}
	`)
	*/
}

/* exports.createResolvers = ({ createResolvers, schema }) => {
	createResolvers({
		WpPost: {
			related_posts: {
				resolve: async (source, args, context, info) => {
					const { databaseId } = source

					const response = await fetch(`${process.env.WP_URL}wp-json/yarpp/v1/related/${databaseId}`).then(res => res.json())

					// console.log(response);

					if (response && response.length) {
						const result = await context.nodeModel.runQuery({
							query: { filter: { databaseId: { in: response.map(({ id }) => id) } }, },
							type: 'WpPost',
						})
						return { nodes: result }
					} else {
						return { nodes: [] }
					}
				},
			},
		},
	})
} */

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
	console.log(stage);

	actions.setWebpackConfig({
		resolve: {
			fallback: {
				fs: false,
			}
		},
		output: {
			publicPath: "/",
		},
	})

	if (stage === 'develop') {
		const config = getConfig()
		const miniCssExtractPlugin = config.plugins.find(
			plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
		)
		if (miniCssExtractPlugin) {
			miniCssExtractPlugin.options.ignoreOrder = true
		}
		actions.replaceWebpackConfig(config)
	}
}

exports.createSchemaCustomization = ({ actions }) => {
	actions.createTypes(`
		type SitePage implements Node @dontInfer {
			path: String!
		}
	`)
}