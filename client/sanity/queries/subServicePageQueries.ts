// sanity/queries/subServicePageQueries.ts
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

/**
 * Haalt een subservice pagina op EN valideert of deze
 * onder de juiste hoofdcategorie valt (NL + EN veilig)
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
        }
      },
      
      theme
    }
  `

  const result = await client.fetch(query, { subslug })

  // ❌ Geen subservice gevonden
  if (!result) return null

  // ✅ CORRECTE VALIDATIE (NL + EN)
  const parentSlugNl = result.mainCategory?.slug?.nl
  const parentSlugEn = result.mainCategory?.slug?.en

  const matchesParent =
    slug === parentSlugNl || slug === parentSlugEn

  if (!matchesParent) {
    console.log(
      `❌ SubService "${subslug}" valt niet onder hoofdcategorie "${slug}"`
    )
    return null
  }

  // ✅ Alles klopt
  return result
}

/**
 * Haalt alle subservices op die onder een hoofdcategorie vallen
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

  return (
    results?.filter(
      (sub: any) =>
        sub.mainCategory?.slug?.nl === slug ||
        sub.mainCategory?.slug?.en === slug
    ) || []
  )
}
