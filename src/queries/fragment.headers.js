import { graphql } from "gatsby"

export const fragmentIcons = graphql `

	fragment fluidHeader on File {
		childImageSharp {
			fluid(maxWidth: 1600, srcSetBreakpoints: [767, 1028]) {
				...GatsbyImageSharpFluid_withWebp
			}
		}
	}

	fragment Meta on File {
		childImageSharp {
			fixed(width: 1200, height: 630) {
				...GatsbyImageSharpFixed_withWebp
			}
		}
	}

	fragment fluidHeaderHQ on File {
		childImageSharp {
			fluid(maxWidth: 1600, quality:99, srcSetBreakpoints: [767, 1024, 1600]) {
				...GatsbyImageSharpFluid_withWebp
			}
		}
	}
`