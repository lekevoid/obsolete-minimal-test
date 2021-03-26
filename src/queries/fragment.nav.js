import { graphql } from "gatsby"

export const fragmentIcons = graphql `
	fragment navBlog on File {
		childImageSharp {
			fluid(maxWidth: 340, maxHeight: 120) {
				...GatsbyImageSharpFluid_withWebp
			}
		}
	}

	fragment navEBook on File {
		childImageSharp {
			fluid(maxWidth: 120, maxHeight: 120) {
				...GatsbyImageSharpFluid_withWebp
			}
		}
	}

	fragment navYoutube on File {
		childImageSharp {
			fluid(maxWidth: 120, maxHeight: 80) {
				...GatsbyImageSharpFluid_withWebp
			}
		}
	}
`