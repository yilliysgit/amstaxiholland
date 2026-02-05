// client/sanity/schemaTypes/servicePage.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "servicePage",
  title: "Service (Niveau 3 – Detailpagina)",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Instellingen" },
  ],

  fields: [
    // ─────────────────────────────────────────────────────
    // RELATIES: Kan aan meerdere subservices gekoppeld worden
    // ─────────────────────────────────────────────────────
    defineField({
      name: "subcategories",
      title: "Subservices",
      type: "array",
      of: [{ type: "reference", to: [{ type: "subServicePage" }] }],
      validation: (Rule) => Rule.min(1).required(),
      description:
        "Deze service kan onder meerdere subservices vallen (bijv. Airport Transfer, Directievervoer, Tours)",
      group: "settings",
    }),

    // ─────────────────────────────────────────────────────
    // BASIC INFO
    // ─────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Titel",
      type: "localeString",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "slug",
      title: "URL Slug",
      type: "localeSlug",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "description",
      title: "Korte omschrijving",
      type: "localeText",
      group: "content",
    }),

    defineField({
      name: "longDescription",
      title: "Uitgebreide omschrijving",
      type: "object",
      fields: [
        { 
          name: "nl", 
          title: "Nederlands",
          type: "array", 
          of: [{ type: "block" }] 
        },
        { 
          name: "en", 
          title: "English",
          type: "array", 
          of: [{ type: "block" }] 
        },
      ],
      group: "content",
    }),

    // ─────────────────────────────────────────────────────
    // HERO
    // ─────────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero sectie",
      type: "object",
      options: { collapsible: true, collapsed: false },
      group: "content",
      fields: [
        {
          name: "image",
          title: "Hero afbeelding",
          type: "image",
          options: { hotspot: true },
          fields: [
            { 
              name: "alt", 
              title: "Alt tekst", 
              type: "localeString",
              validation: (Rule) => Rule.required(),
            }
          ],
        },
        {
          name: "titleOverride",
          title: "Hero titel (optioneel)",
          type: "localeString",
          description: "Laat leeg om paginatitel te gebruiken",
        },
        {
          name: "subtitle",
          title: "Hero subtitel",
          type: "localeText",
        },
        {
          name: "cta",
          title: "Hero CTA",
          type: "object",
          options: { collapsible: true },
          fields: [
            {
              name: "label",
              title: "Button tekst",
              type: "localeString",
            },
            {
              name: "link",
              title: "Button link",
              type: "string",
            },
            {
              name: "style",
              title: "Button stijl",
              type: "string",
              options: {
                list: [
                  { title: "Primair", value: "primary" },
                  { title: "Secundair", value: "secondary" },
                ],
                layout: "radio",
              },
              initialValue: "primary",
            },
          ],
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // GALLERY
    // ─────────────────────────────────────────────────────
    defineField({
      name: "gallery",
      title: "Galerij",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt tekst",
              type: "localeString",
            },
            {
              name: "caption",
              title: "Bijschrift",
              type: "localeString",
            },
          ],
        },
      ],
      group: "content",
    }),

    // ─────────────────────────────────────────────────────
    // SPECIFICATIONS
    // ─────────────────────────────────────────────────────
    defineField({
      name: "specifications",
      title: "Specificaties",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        { 
          name: "duration", 
          title: "Duur", 
          type: "localeString" 
        },
        { 
          name: "distance", 
          title: "Afstand", 
          type: "localeString" 
        },
        { 
          name: "maxPersons", 
          title: "Max. personen", 
          type: "number" 
        },
        { 
          name: "vehicleType", 
          title: "Voertuigtype", 
          type: "localeString" 
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // PRICING
    // ─────────────────────────────────────────────────────
    defineField({
      name: "pricing",
      title: "Prijsinformatie",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        { 
          name: "priceFrom", 
          title: "Vanaf prijs (€)", 
          type: "number" 
        },
        { 
          name: "priceNote", 
          title: "Prijstoelichting", 
          type: "localeString" 
        },
        {
          name: "includesTickets",
          title: "Inclusief tickets/toegang",
          type: "boolean",
          initialValue: false,
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // HIGHLIGHTS & INCLUDES
    // ─────────────────────────────────────────────────────
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        { 
          name: "nl", 
          title: "Nederlands",
          type: "array", 
          of: [{ type: "string" }] 
        },
        { 
          name: "en", 
          title: "English",
          type: "array", 
          of: [{ type: "string" }] 
        },
      ],
    }),

    defineField({
      name: "includes",
      title: "Inbegrepen",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        { 
          name: "nl", 
          title: "Nederlands",
          type: "array", 
          of: [{ type: "string" }] 
        },
        { 
          name: "en", 
          title: "English",
          type: "array", 
          of: [{ type: "string" }] 
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // MODULE TOGGLES
    // ─────────────────────────────────────────────────────
    defineField({ 
      name: "showGallery", 
      title: "Toon galerij", 
      type: "boolean", 
      initialValue: true,
      group: "settings",
    }),
    defineField({ 
      name: "showMap", 
      title: "Toon kaart", 
      type: "boolean", 
      initialValue: false,
      group: "settings",
    }),
    defineField({ 
      name: "showReviews", 
      title: "Toon reviews", 
      type: "boolean", 
      initialValue: true,
      group: "settings",
    }),
    defineField({ 
      name: "showFAQ", 
      title: "Toon FAQ", 
      type: "boolean", 
      initialValue: true,
      group: "settings",
    }),
    defineField({
      name: "showCalculator",
      title: "Toon prijscalculator",
      type: "boolean",
      initialValue: false,
      group: "settings",
    }),

    defineField({
      name: "sortOrder",
      title: "Sorteervolgorde",
      type: "number",
      initialValue: 0,
      group: "settings",
    }),

    // ─────────────────────────────────────────────────────
    // SEO
    // ─────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      group: "seo",
      fields: [
        { 
          name: "metaTitle", 
          title: "Meta title",
          type: "localeString" 
        },
        { 
          name: "metaDescription", 
          title: "Meta description",
          type: "localeText" 
        },
        { 
          name: "noIndex", 
          title: "No index",
          type: "boolean", 
          initialValue: false 
        },
      ],
    }),
  ],

preview: {
  select: {
    title: "title.nl",
    slug: "slug.nl.current",
    subcategories: "subcategories",
    media: "hero.image",
  },
  prepare({ title, slug, subcategories, media }) {
    const count = subcategories?.length || 0
    
    // Probeer de eerste subservice naam te pakken
    const firstSubName = subcategories?.[0]?.title?.nl
    
    let subtitle = slug || "geen-slug"
    
    if (count === 0) {
      subtitle = `⚠️ Geen subservices → ${slug}`
    } else if (count === 1 && firstSubName) {
      subtitle = `${firstSubName} → ${slug}`
    } else if (count > 1 && firstSubName) {
      subtitle = `${firstSubName} +${count - 1} meer → ${slug}`
    } else {
      subtitle = `✓ ${count} subservice${count > 1 ? 's' : ''} → ${slug}`
    }

    return {
      title: title || "Naamloze service",
      subtitle,
      media,
    };
  },
},
});
