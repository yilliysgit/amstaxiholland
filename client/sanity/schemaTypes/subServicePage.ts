import { defineType, defineField } from "sanity";

export default defineType({
  name: "subServicePage",
  title: "Subservice (Niveau 2)",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Instellingen" },
  ],

  fields: [
    // ─────────────────────────────────────────────
    // HOOFDCATEGORIE - BOVENAAN!
    // ─────────────────────────────────────────────
    defineField({
      name: "mainCategory",
      title: "⚠️ Hoofdcategorie",
      type: "reference",
      to: [{ type: "mainServicePage" }],
      validation: (Rule) => Rule.required(),
      description: "❗ Kies eerst onder welke hoofdcategorie deze subservice valt",
      group: "content",
    }),

    // ─────────────────────────────────────────────
    // BASISGEGEVENS
    // ─────────────────────────────────────────────
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
      name: "subtitle",
      title: "Subtitel",
      type: "localeText",
      group: "content",
    }),

    // ─────────────────────────────────────────────
    // HERO SECTIE
    // ─────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero sectie",
      type: "object",
      options: { collapsible: true, collapsed: false },
      group: "content",
      fields: [
        {
          name: "title",
          title: "Hero titel (optioneel)",
          type: "localeString",
          description: "Laat leeg om de paginatitel te gebruiken",
        },
        {
          name: "subtitle",
          title: "Hero subtitel",
          type: "localeText",
        },
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
            },
          ],
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
              description: "Bijv. /contact of https://...",
            },
            {
              name: "style",
              title: "Stijl",
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

    // ─────────────────────────────────────────────
    // INTRO
    // ─────────────────────────────────────────────
    defineField({
      name: "intro",
      title: "Introductie",
      type: "localeText",
      group: "content",
    }),

    // ─────────────────────────────────────────────
    // PAGE BUILDER SECTIES
    // ─────────────────────────────────────────────
    defineField({
      name: "sections",
      title: "Pagina secties",
      type: "array",
      of: [
        { type: "voordelenSection" },
        { type: "highlightsSection" },
        { type: "stepsSection" },
        { type: "pricingSection" },
        { type: "featuresSection" },
        { type: "reviewsSection" },
        { type: "faqSection" },
        { type: "galerijSection" },
        { type: "ctaSection" },
      ],
      group: "content",
    }),

    // ─────────────────────────────────────────────
    // INSTELLINGEN
    // ─────────────────────────────────────────────
    defineField({
      name: "theme",
      title: "Kleurthema",
      type: "string",
      options: {
        list: [
          { title: "Gebruik hoofdcategorie", value: "inherit" },
          { title: "Blauw", value: "blue" },
          { title: "Roze", value: "pink" },
          { title: "Paars", value: "purple" },
          { title: "Oranje", value: "orange" },
          { title: "Groen", value: "green" },
        ],
        layout: "radio",
      },
      initialValue: "inherit",
      group: "settings",
    }),

    defineField({
      name: "sortOrder",
      title: "Sorteervolgorde",
      type: "number",
      initialValue: 0,
      group: "settings",
    }),

    // ─────────────────────────────────────────────
    // SEO
    // ─────────────────────────────────────────────
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
          type: "localeString",
        },
        {
          name: "metaDescription",
          title: "Meta description",
          type: "localeText",
        },
        {
          name: "noIndex",
          title: "No index",
          type: "boolean",
          initialValue: false,
        },
      ],
    }),
  ],

preview: {
  select: {
    title: "title.nl",
    slug: "slug.nl.current",
    mainCategoryTitle: "mainCategory.title.nl",
    mainCategoryBasicInfoTitle: "mainCategory.basicInfo.title.nl",
    media: "hero.image",
  },
  prepare({ title, slug, mainCategoryTitle, mainCategoryBasicInfoTitle, media }) {
    // Gebruik basicInfo title als die bestaat, anders fallback naar title
    const categoryName = mainCategoryBasicInfoTitle || mainCategoryTitle
    
    return {
      title: title || "Naamloze subservice",
      subtitle: categoryName 
        ? `${categoryName} → ${slug}`
        : slug,
      media,
    };
  },
},
});
