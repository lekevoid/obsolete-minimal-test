import { graphql } from "gatsby"

export const fragmentIcons = graphql `
	fragment basicFluid on File {
		childImageSharp {
			fluid(maxWidth: 1600, srcSetBreakpoints: [420, 767, 1028]) {
				...GatsbyImageSharpFluid_withWebp
			}
		}
	}

	fragment ebookFluid on File {
		childImageSharp {
			fluid(maxWidth: 1600, srcSetBreakpoints: [200, 300]) {
				...GatsbyImageSharpFluid_withWebp
			}
		}
	}

	fragment videoPoster on File {
		childImageSharp {
			fixed(width: 680, height: 380) {
				...GatsbyImageSharpFixed_withWebp
			}
		}
	}
`