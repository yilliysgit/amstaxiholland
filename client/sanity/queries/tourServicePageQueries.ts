import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export async function getTourServicePage(slug: string) {
  const query = groq`
    *[_type == "tourServicePage" && (slug.nl.current == $slug || slug.en.current == $slug)][0] {
      _id,
      "title": { "nl": title.nl, "en": title.en },
      "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
      "slug": { "nl": slug.nl.current, "en": slug.en.current },
      
      badges[] {
        "label": { "nl": label.nl, "en": label.en },
        tone,
        icon
      },
      
      hero {
        "title": { "nl": title.nl, "en": title.en },
        "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
        image {
          asset,
          "alt": { "nl": alt.nl, "en": alt.en }
        },
        "usps": { "nl": usps.nl, "en": usps.en },
        primaryCta {
          "label": { "nl": label.nl, "en": label.en },
          link
        },
        secondaryCta {
          "label": { "nl": label.nl, "en": label.en },
          link
        },
        "trustIndicators": { "nl": trustIndicators.nl, "en": trustIndicators.en }
      },
      
      routeInfo {
        "destination": { "nl": destination.nl, "en": destination.en },
        "distance": { "nl": distance.nl, "en": distance.en },
        "duration": { "nl": duration.nl, "en": duration.en },
        sedanPrice,
        vanPrice,
        sedanMaxPersons,
        vanMaxPersons,
        "note": { "nl": note.nl, "en": note.en }
      },
      
      rideTypesSection {
        "title": { "nl": title.nl, "en": title.en },
        items[] {
          "title": { "nl": title.nl, "en": title.en },
          "description": { "nl": description.nl, "en": description.en }
        }
      },
      
      howItWorksSection {
        "title": { "nl": title.nl, "en": title.en },
        items[] {
          "title": { "nl": title.nl, "en": title.en },
          "description": { "nl": description.nl, "en": description.en },
          icon
        }
      },
      
      comparison {
        "title": { "nl": title.nl, "en": title.en },
        left {
          "title": { "nl": title.nl, "en": title.en },
          "points": { "nl": points.nl, "en": points.en }
        },
        right {
          "title": { "nl": title.nl, "en": title.en },
          "points": { "nl": points.nl, "en": points.en }
        }
      },
      
      practicalInfo {
        "title": { "nl": title.nl, "en": title.en },
        "content": { "nl": content.nl, "en": content.en },
        "tip": { "nl": tip.nl, "en": tip.en }
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
        buttonLink
      }
    }
  `
  
  return await client.fetch(query, { slug })
}

export async function getToursByMainCategory(mainCategoryId: string) {
  const query = groq`
    *[_type == "tourServicePage" && mainCategory._ref == $mainCategoryId] | order(sortOrder asc) {
      _id,
      "title": { "nl": title.nl, "en": title.en },
      "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
      "slug": { "nl": slug.nl.current, "en": slug.en.current },
      badges[] {
        "label": { "nl": label.nl, "en": label.en },
        tone,
        icon
      },
      cardImage {
        asset,
        "alt": { "nl": alt.nl, "en": alt.en }
      }
    }
  `
  
  return await client.fetch(query, { mainCategoryId })
}
// In tourServicePageQueries.ts - voeg toe:

export async function getAllTours() {
  const query = groq`
    *[_type == "tourServicePage"] | order(sortOrder asc) {
      _id,
      "title": { "nl": title.nl, "en": title.en },
      "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
      "slug": { "nl": slug.nl.current, "en": slug.en.current },
      badges[] {
        "label": { "nl": label.nl, "en": label.en },
        tone,
        icon
      },
      cardImage {
        asset,
        "alt": { "nl": alt.nl, "en": alt.en }
      },
      routeInfo {
        "duration": { "nl": duration.nl, "en": duration.en },
        "distance": { "nl": distance.nl, "en": distance.en },
        sedanPrice,
        sedanMaxPersons
      }
    }
  `
  
  return await client.fetch(query)
}