import { defineType, defineField } from "sanity";

export default defineType({
  name: "mainServicePage",
  title: "Hoofdcategorie (Niveau 1)",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Instellingen" },
  ],

  fields: [
    // ─────────────────────────────────────────────────────
    // BASIC INFO (GEGROEPEERD)
    // ─────────────────────────────────────────────────────
    defineField({
      name: "basicInfo",
      title: "Basis informatie",
      type: "object",
      options: { 
        collapsible: true,
        collapsed: false
      },
      group: "content",
      fields: [
        {
          name: "title",
          title: "Titel",
          type: "localeString",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "slug",
          title: "URL Slug",
          type: "localeSlug",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "subtitle",
          title: "Subtitel",
          type: "localeText",
          description: "Korte beschrijving onder de titel",
        },
      ],
    }),


    // ─────────────────────────────────────────────────────
    // CARD IMAGE (overview)
    // ─────────────────────────────────────────────────────
    defineField({
      name: "cardImage",
      title: "Card afbeelding (overzicht)",
      type: "image",
      options: { 
        hotspot: true,
        collapsible: true,
        collapsed: false
      },
      fields: [
        {
          name: "alt",
          title: "Alt tekst",
          type: "localeString",
          validation: (Rule) => Rule.required(),
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
          name: "title",
          title: "Hero titel (optioneel)",
          type: "localeString",
          description: "Laat leeg om hoofdtitel te gebruiken",
        },
        {
          name: "subtitle",
          title: "Hero subtitel (verplicht, 1 zin)",
          type: "localeText",
          description: "Legt uit wat en voor wie. Bijv: 'Professioneel vervoer van en naar luchthavens.'",
        },
        {
          name: "image",
          title: "Hero achtergrondafbeelding (optioneel)",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt tekst",
              type: "localeString",
            },
          ],
        },
        {
          name: "trustHints",
          title: "Trust hints (feitelijk, max 4)",
          type: "object",
          description: "Feitelijke microcopy zoals '24/7 beschikbaar', 'Vaste tarieven'. GEEN sales taal!",
          options: { collapsible: true },
          fields: [
            {
              name: "nl",
              title: "Nederlands",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.max(4),
            },
            {
              name: "en",
              title: "English",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.max(4),
            },
          ],
        },
        {
          name: "stats",
          title: "Stats (alleen harde feiten, max 3)",
          type: "array",
          description: "ALLEEN verifieerbare feiten zoals 'Sinds 2012', '24/7 service'. GEEN 'beste', '#1', etc.",
          options: { collapsible: true },
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "value",
                  title: "Waarde",
                  type: "localeString",
                  description: "Bijv. 'Sinds 2012' of '24/7'",
                },
                {
                  name: "label",
                  title: "Label",
                  type: "localeString",
                  description: "Bijv. 'Actief' of 'Service'",
                },
              ],
              preview: {
                select: {
                  valueNl: "value.nl",
                  valueEn: "value.en",
                  labelNl: "label.nl",
                  labelEn: "label.en",
                },
                prepare({ valueNl, valueEn, labelNl, labelEn }) {
                  return {
                    title: `${valueNl || "Geen waarde"} / ${valueEn || "No value"}`,
                    subtitle: `${labelNl || ""} / ${labelEn || ""}`,
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(3),
        },
        {
          name: "cta",
          title: "Hero CTA (functioneel, 1 max)",
          type: "object",
          description: "Functionele CTA zoals 'Bekijk diensten', 'Meer informatie'. GEEN sales push!",
          options: { collapsible: true },
          fields: [
            {
              name: "label",
              title: "Button tekst",
              type: "localeString",
              description: "Bijv. 'Bekijk diensten' of 'Meer informatie'",
            },
            {
              name: "link",
              title: "Button link",
              type: "string",
              description: "Bijv. #diensten of /contact",
            },
          ],
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // INTRO SECTION
    // ─────────────────────────────────────────────────────
    defineField({
      name: "introSection",
      title: "Introductie",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        { name: "title", title: "Titel", type: "localeString" },
        { name: "content", title: "Tekst", type: "localeText" },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // GRID SECTION
    // ─────────────────────────────────────────────────────
    defineField({
      name: "gridSection",
      title: "Grid sectie",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        {
          name: "title",
          title: "Titel",
          type: "localeString",
          description: "Titel boven de grid",
        },
        {
          name: "subtitle",
          title: "Subtitel",
          type: "localeText",
          description: "Korte beschrijving onder de titel",
        },
        {
          name: "gridType",
          title: "Wat wil je tonen?",
          type: "string",
          options: {
            layout: "radio",
            list: [
              { title: "Subservices (niveau 2)", value: "subservices" },
              { title: "Services (niveau 3)", value: "services" },
            ],
          },
          initialValue: "subservices",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "subcategories",
          title: "Subservices (niveau 2)",
          type: "array",
          of: [{ type: "reference", to: [{ type: "subServicePage" }] }],
          hidden: ({ parent }) => parent?.gridType !== "subservices",
        },
        {
          name: "services",
          title: "Services (niveau 3)",
          type: "array",
          of: [{ type: "reference", to: [{ type: "servicePage" }] }],
          hidden: ({ parent }) => parent?.gridType !== "services",
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // USP SECTION
    // ─────────────────────────────────────────────────────
    defineField({
      name: "uspSection",
      title: "USP's / Voordelen",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        { name: "title", title: "Titel", type: "localeString" },
        {
          name: "usps",
          title: "USP lijst",
          type: "object",
          fields: [
            { name: "nl", title: "Nederlands", type: "array", of: [{ type: "string" }] },
            { name: "en", title: "English", type: "array", of: [{ type: "string" }] },
          ],
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // GALLERY
    // ─────────────────────────────────────────────────────
    defineField({
      name: "gallerySection",
      title: "Fotogalerij",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        {
          name: "title",
          title: "Titel",
          type: "localeString",
          description: "Titel boven de fotogalerij",
        },
        {
          name: "subtitle",
          title: "Subtitel",
          type: "localeText",
          description: "Korte beschrijving onder de titel",
        },
        {
          name: "images",
          title: "Afbeeldingen",
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
              ],
            },
          ],
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // FAQ SECTION
    // ─────────────────────────────────────────────────────
    defineField({
      name: "faqSection",
      title: "FAQ",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        { name: "title", title: "Titel", type: "localeString" },
        {
          name: "items",
          title: "FAQ items",
          type: "array",
          of: [{ type: "reference", to: [{ type: "faqItem" }] }],
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // CTA SECTION
    // ─────────────────────────────────────────────────────
    defineField({
      name: "ctaSection",
      title: "Call to action",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        { name: "title", title: "Titel", type: "localeString" },
        { name: "subtitle", title: "Subtitel", type: "localeText" },
        { name: "buttonLabel", title: "Button tekst", type: "localeString" },
        { name: "buttonLink", title: "Button link", type: "string" },
        {
          name: "trustIndicators",
          title: "Trust indicators (max 3-4)",
          type: "object",
          description: "Korte, feitelijke benefits zoals 'Gratis offerte', '24/7 bereikbaar'",
          fields: [
            {
              name: "nl",
              title: "Nederlands",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.max(4),
            },
            {
              name: "en",
              title: "English",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.max(4),
            },
          ],
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // SETTINGS
    // ─────────────────────────────────────────────────────
    defineField({
      name: "theme",
      title: "Kleurthema",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Blauw", value: "blue" },
          { title: "Roze", value: "pink" },
          { title: "Paars", value: "purple" },
          { title: "Oranje", value: "orange" },
          { title: "Groen", value: "green" },
        ],
      },
      initialValue: "blue",
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
        { name: "metaTitle", title: "Meta title", type: "localeString" },
        { name: "metaDescription", title: "Meta description", type: "localeText" },
        { name: "noIndex", title: "No index", type: "boolean", initialValue: false },
      ],
    }),
  ],

  preview: {
    select: {
      title: "basicInfo.title.nl",
      slugNl: "basicInfo.slug.nl.current",
      slugEn: "basicInfo.slug.en.current",
      media: "cardImage",
    },
    prepare({ title, slugNl, slugEn, media }) {
      return {
        title: title || "Naamloze categorie",
        subtitle: `/diensten/${slugNl || slugEn || ""}`,
        media,
      };
    },
  },
});