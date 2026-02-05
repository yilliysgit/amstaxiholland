import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export async function getServicePage(serviceSlug: string) {
  const query = groq`
    *[_type == "servicePage" && (slug.nl.current == $serviceSlug || slug.en.current == $serviceSlug)][0] {
      _id,

      "title": { "nl": title.nl, "en": title.en },
      "description": { "nl": description.nl, "en": description.en },
      "slug": { "nl": slug.nl.current, "en": slug.en.current },

      subcategories[]-> {
        _id,
        "title": { "nl": title.nl, "en": title.en },
        "slug": { "nl": slug.nl.current, "en": slug.en.current },
        mainCategory-> {
          "title": { "nl": title.nl, "en": title.en },
          "slug": { "nl": slug.nl.current, "en": slug.en.current }
        }
      },

      hero {
        titleOverride { "nl": nl, "en": en },
        subtitle { "nl": nl, "en": en },
        image {
          asset,
          "alt": { "nl": alt.nl, "en": alt.en }
        },
        cta {
          label { "nl": nl, "en": en },
          link,
          style
        }
      },

      "longDescription": { "nl": longDescription.nl, "en": longDescription.en },

      gallery[] {
        asset,
        "alt": { "nl": alt.nl, "en": alt.en },
        caption { "nl": caption.nl, "en": caption.en }
      },

      specifications {
        duration { "nl": duration.nl, "en": duration.en },
        distance { "nl": distance.nl, "en": distance.en },
        maxPersons,
        vehicleType { "nl": vehicleType.nl, "en": vehicleType.en }
      },

      pricing {
        priceFrom,
        priceNote { "nl": priceNote.nl, "en": priceNote.en },
        includesTickets
      },

      highlights { "nl": highlights.nl, "en": highlights.en },
      includes { "nl": includes.nl, "en": includes.en },

      showGallery,
      showMap,
      showReviews,
      showFAQ,
      showCalculator,

      sortOrder,

      seo {
        metaTitle { "nl": metaTitle.nl, "en": metaTitle.en },
        metaDescription { "nl": metaDescription.nl, "en": metaDescription.en },
        noIndex
      }
    }
  `

  return await client.fetch(query, { serviceSlug })
}
