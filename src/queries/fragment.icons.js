import { graphql } from "gatsby"

export const fragmentIcons = graphql `
	fragment fluidIcon on File {
		childImageSharp {
			fluid(maxWidth: 300, quality:94) {
				...GatsbyImageSharpFluid_withWebp
			}
		}
	}

	fragment fluidUI on File {
		childImageSharp {
			fluid(maxWidth: 600) {
				...GatsbyImageSharpFluid_withWebp
			}
		}
	}
`