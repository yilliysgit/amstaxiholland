// sanity/queries/subServicePageQueries.ts
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

/**
 * Haalt een subservice pagina op EN VALIDEERT of deze onder de juiste hoofdcategorie valt
 * @param slug - De slug van de hoofdcategorie (bijv. "zakelijk-vervoer")
 * @param subslug - De slug van de subservice (bijv. "directievervoer")
 */
export async function getSubServicePage(slug: string, subslug: string) {
  const query = groq`
    *[
      _type == "subServicePage" && 
      (slug.nl.current == $subslug || slug.en.current == $subslug)
    ][0] {
      _id,
      "title": { "nl": title.nl, "en": title.en },
      "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
      "slug": { "nl": slug.nl.current, "en": slug.en.current },
      
      mainCategory-> {
        "title": { 
          "nl": coalesce(basicInfo.title.nl, title.nl), 
          "en": coalesce(basicInfo.title.en, title.en) 
        },
        "slug": { 
          "nl": coalesce(basicInfo.slug.nl.current, slug.nl.current), 
          "en": coalesce(basicInfo.slug.en.current, slug.en.current) 
        }
      },
      
      hero {
        "title": { "nl": title.nl, "en": title.en },
        "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
        image {
          asset,
          "alt": { "nl": alt.nl, "en": alt.en }
        },
        cta {
          "label": { "nl": label.nl, "en": label.en },
          link,
          style
        }
      },
      
      "intro": { "nl": intro.nl, "en": intro.en },
      
      sections[] {
        _type,
        _key,
        
        _type == "voordelenSection" => {
          "title": { "nl": title.nl, "en": title.en },
          voordelen[] {
            "title": { "nl": title.nl, "en": title.en },
            "description": { "nl": description.nl, "en": description.en },
            icon
          }
        },
        
        _type == "ctaSection" => {
          "title": { "nl": title.nl, "en": title.en },
          "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
          "buttonText": { "nl": buttonText.nl, "en": buttonText.en },
          buttonLink
        },
        
        _type == "faqSection" => {
          "title": { "nl": title.nl, "en": title.en },
          faqs[]-> {
            "question": { "nl": question.nl, "en": question.en },
            "answer": { "nl": answer.nl, "en": answer.en }
          }
        },
        
        _type == "highlightsSection" => {
          "title": { "nl": title.nl, "en": title.en },
          highlights[] {
            "title": { "nl": title.nl, "en": title.en },
            "description": { "nl": description.nl, "en": description.en },
            icon
          }
        },
        
        _type == "stepsSection" => {
          "title": { "nl": title.nl, "en": title.en },
          steps[] {
            stepNumber,
            "title": { "nl": title.nl, "en": title.en },
            "description": { "nl": description.nl, "en": description.en }
          }
        },
        
        _type == "pricingSection" => {
          "title": { "nl": title.nl, "en": title.en },
          pricingOptions[] {
            "title": { "nl": title.nl, "en": title.en },
            price,
            "features": { "nl": features.nl, "en": features.en }
          }
        },
        
        _type == "featuresSection" => {
          "title": { "nl": title.nl, "en": title.en },
          features[] {
            "title": { "nl": title.nl, "en": title.en },
            "description": { "nl": description.nl, "en": description.en },
            icon
          }
        },
        
        _type == "reviewsSection" => {
          "title": { "nl": title.nl, "en": title.en },
          reviews[] {
            name,
            rating,
            "review": { "nl": review.nl, "en": review.en },
            date
          }
        },
        
        _type == "galerijSection" => {
          "title": { "nl": title.nl, "en": title.en },
          images[] {
            asset,
            "alt": { "nl": alt.nl, "en": alt.en }
          }
        }
      },
      
      theme
    }
  `
  
  const result = await client.fetch(query, { subslug })
  
  // Valideer of deze subservice onder de juiste hoofdcategorie valt
  if (!result) return null
  
  const parentSlug = result.mainCategory?.slug?.nl || result.mainCategory?.slug?.en
  if (parentSlug !== slug) {
    console.log(`❌ SubService "${subslug}" valt niet onder hoofdcategorie "${slug}"`)
    return null
  }
  
  return result
}

/**
 * Haalt alle subservices op die onder een hoofdcategorie vallen
 * @param slug - De slug van de hoofdcategorie
 */
export async function getSubServicesByMainCategory(slug: string) {
  const query = groq`
    *[_type == "subServicePage"] | order(sortOrder asc) {
      _id,
      "title": { "nl": title.nl, "en": title.en },
      "subtitle": { "nl": subtitle.nl, "en": subtitle.en },
      "slug": { "nl": slug.nl.current, "en": slug.en.current },
      mainCategory-> {
        "slug": { 
          "nl": coalesce(basicInfo.slug.nl.current, slug.nl.current), 
          "en": coalesce(basicInfo.slug.en.current, slug.en.current) 
        }
      },
      hero {
        image {
          asset,
          "alt": { "nl": alt.nl, "en": alt.en }
        }
      },
      sortOrder
    }
  `
  
  const results = await client.fetch(query)
  
  // Filter op de juiste hoofdcategorie
  return results?.filter((sub: any) => 
    sub.mainCategory?.slug?.nl === slug || sub.mainCategory?.slug?.en === slug
  ) || []
}