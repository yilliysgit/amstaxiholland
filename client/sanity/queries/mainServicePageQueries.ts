// sanity/queries/mainServicePageQueries.ts
// UPDATED VOOR basicInfo STRUCTUUR

import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export async function getMainServicePage(slug: string) {
  const query = groq`
    *[_type == "mainServicePage" && (basicInfo.slug.nl.current == $slug || basicInfo.slug.en.current == $slug)][0] {
      _id,
      
      // ⚠️ LET OP: title, slug, subtitle komen nu uit basicInfo!
      "title": { "nl": basicInfo.title.nl, "en": basicInfo.title.en },
      "subtitle": { "nl": basicInfo.subtitle.nl, "en": basicInfo.subtitle.en },
      "slug": { "nl": basicInfo.slug.nl.current, "en": basicInfo.slug.en.current },
      
      hero {
        "title": { "nl": title.nl, "en": title.en },
        "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
        image {
          asset,
          "alt": { "nl": alt.nl, "en": alt.en }
        },
        "trustHints": { "nl": trustHints.nl, "en": trustHints.en },
        stats[] {
          "value": { "nl": value.nl, "en": value.en },
          "label": { "nl": label.nl, "en": label.en }
        },
        cta {
          "label": { "nl": label.nl, "en": label.en },
          link
        }
      },
      
      introSection {
        "title": { "nl": title.nl, "en": title.en },
        "content": { "nl": content.nl, "en": content.en }
      },
      
      gridSection {
        "title": { "nl": title.nl, "en": title.en },
        "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
        gridType,
        subcategories[]-> {
          _id,
          "title": { "nl": title.nl, "en": title.en },
          "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
          "slug": { "nl": slug.nl.current, "en": slug.en.current },
          hero {
            image {
              asset,
              "alt": { "nl": alt.nl, "en": alt.en }
            }
          }
        },
        services[]-> {
          _id,
          "title": { "nl": title.nl, "en": title.en },
          "description": { "nl": description.nl, "en": description.en },
          "slug": { "nl": slug.nl.current, "en": slug.en.current },
          hero {
            image {
              asset,
              "alt": { "nl": alt.nl, "en": alt.en }
            }
          }
        }
      },
      
      uspSection {
        "title": { "nl": title.nl, "en": title.en },
        "usps": { "nl": usps.nl, "en": usps.en }
      },

      gallerySection {
        "title": { "nl": title.nl, "en": title.en },
        "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
        images[] {
          asset,
          "alt": { "nl": alt.nl, "en": alt.en }
        }
      },

      faqSection {
        "title": { "nl": title.nl, "en": title.en },
        items[]-> {
          "question": { "nl": question.nl, "en": question.en },
          "answer": { "nl": answer.nl, "en": answer.en }
        }
      },
      
      ctaSection {
        "title": { "nl": title.nl, "en": title.en },
        "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
        "buttonLabel": { "nl": buttonLabel.nl, "en": buttonLabel.en },
        buttonLink,
        "trustIndicators": { "nl": trustIndicators.nl, "en": trustIndicators.en }
      },
      
      theme
    }
  `
  
  return await client.fetch(query, { slug })
}