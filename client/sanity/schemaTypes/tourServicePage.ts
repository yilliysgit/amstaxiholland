import { defineType, defineField } from "sanity";

export default defineType({
  name: "tourServicePage",
  title: "Tour (Niveau 2)",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Instellingen" },
  ],

  fields: [
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
      name: "subtitle",
      title: "Subtitel",
      type: "localeText",
      description: "Korte beschrijving voor overzichtspagina",
      group: "content",
    }),

    // ─────────────────────────────────────────────────────
    // KOPPELING
    // ─────────────────────────────────────────────────────
    defineField({
      name: "mainCategory",
      title: "Hoofdcategorie",
      type: "reference",
      to: [{ type: "mainServicePage" }],
      validation: (Rule) => Rule.required(),
      group: "settings",
    }),

    // ─────────────────────────────────────────────────────
    // CARD IMAGE (voor overzicht)
    // ─────────────────────────────────────────────────────
    defineField({
      name: "cardImage",
      title: "Card afbeelding (overzicht)",
      type: "image",
      options: { hotspot: true, collapsible: true, collapsed: false },
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
    // BADGES
    // ─────────────────────────────────────────────────────
    defineField({
      name: "badges",
      title: "Badges",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "localeString",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "tone",
              title: "Stijl",
              type: "string",
              options: {
                layout: "radio",
                list: [
                  { title: "Grijs", value: "neutral" },
                  { title: "Groen", value: "success" },
                  { title: "Blauw", value: "info" },
                  { title: "Oranje", value: "orange" },
                ],
              },
              initialValue: "neutral",
            },
            {
              name: "icon",
              title: "Icoon (optioneel)",
              type: "string",
              options: {
                list: [
                  { title: "👨‍👩‍👧‍👦 Familie", value: "family" },
                  { title: "🌤️ Seizoensgebonden", value: "season" },
                  { title: "⭐ Populair", value: "popular" },
                  { title: "⏱️ Snel", value: "fast" },
                  { title: "💼 Zakelijk", value: "business" },
                  { title: "🎉 Evenement", value: "event" },
                ],
              },
            },
          ],
          preview: {
            select: {
              label: "label.nl",
              tone: "tone",
              icon: "icon",
            },
            prepare({ label, tone, icon }) {
              const icons = {
                family: "👨‍👩‍👧‍👦",
                season: "🌤️",
                popular: "⭐",
                fast: "⏱️",
                business: "💼",
                event: "🎉",
              };
              return {
                title: label || "Geen label",
                subtitle: `${tone || "neutral"}${icon ? ` • ${icons[icon as keyof typeof icons] || icon}` : ""}`,
              };
            },
          },
        },
      ],
      description: "Kleine labels bovenaan (bijv. Familie, Seizoensgebonden, Populair).",
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
          title: "Hero subtitel",
          type: "localeText",
          description: "Korte beschrijving van de tour",
        },
        {
          name: "image",
          title: "Achtergrondafbeelding",
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
          name: "usps",
          title: "USP bullets (max 4)",
          type: "object",
          description: "Korte USP's zoals 'Vanaf uw voordeur', 'Vaste lage tarieven'",
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
          name: "primaryCta",
          title: "Primaire CTA",
          type: "object",
          fields: [
            { name: "label", title: "Button tekst", type: "localeString" },
            { name: "link", title: "Button link", type: "string" },
          ],
        },
        {
          name: "secondaryCta",
          title: "Secondaire CTA",
          type: "object",
          fields: [
            { name: "label", title: "Button tekst", type: "localeString" },
            { name: "link", title: "Button link", type: "string" },
          ],
        },
        {
          name: "trustIndicators",
          title: "Trust indicators (onderaan hero)",
          type: "object",
          description: "Korte feiten zoals 'Sinds 2012', 'Vaste tarieven', '24/7 bereikbaar'",
          fields: [
            {
              name: "nl",
              title: "Nederlands",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.max(5),
            },
            {
              name: "en",
              title: "English",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.max(5),
            },
          ],
        },
        {
          name: "bookingCard",
          title: "Booking card (rechts)",
          type: "object",
          description: "Teksten voor de witte booking card rechts in de hero",
          fields: [
            {
              name: "title",
              title: "Titel",
              type: "localeString",
              description: "Bijv. 'Klaar om af te springen?'",
            },
            {
              name: "primaryButtonLabel",
              title: "Primaire button tekst",
              type: "localeString",
              description: "Bijv. 'Heen boekingsmodule'",
            },
            {
              name: "primaryButtonLink",
              title: "Primaire button link",
              type: "string",
              description: "Bijv. '#booking' of '/boeken'",
            },
            {
              name: "secondaryButtonLabel",
              title: "Secundaire button tekst",
              type: "localeString",
              description: "Bijv. 'Bel +31 20 ...'",
            },
            {
              name: "secondaryButtonPhone",
              title: "Telefoonnummer",
              type: "string",
              description: "Bijv. '+31645014704'",
            },
          ],
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // ROUTE INFO (voor booking card)
    // ─────────────────────────────────────────────────────
    defineField({
      name: "routeInfo",
      title: "Route informatie",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        {
          name: "destination",
          title: "Bestemming",
          type: "localeString",
          description: "Bijv. 'Aviodrome Lelystad'",
        },
        {
          name: "distance",
          title: "Afstand",
          type: "localeString",
          description: "Bijv. '55 km'",
        },
        {
          name: "duration",
          title: "Reisduur",
          type: "localeString",
          description: "Bijv. '55 min'",
        },
        {
          name: "sedanPrice",
          title: "Sedan prijs",
          type: "number",
          description: "Bijv. 75",
        },
        {
          name: "vanPrice",
          title: "Minivan prijs",
          type: "number",
          description: "Bijv. 95",
        },
        {
          name: "sedanMaxPersons",
          title: "Sedan max personen",
          type: "number",
          initialValue: 4,
        },
        {
          name: "vanMaxPersons",
          title: "Minivan max personen",
          type: "number",
          initialValue: 8,
        },
        {
          name: "note",
          title: "Notitie",
          type: "localeString",
          description: "Bijv. 'Va. prijs'",
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // RIDE TYPES
    // ─────────────────────────────────────────────────────
    defineField({
      name: "rideTypesSection",
      title: "Ritten naar [bestemming]",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        {
          name: "title",
          title: "Titel",
          type: "localeString",
          description: "Bijv. 'Ritten naar Aviodrome Lelystad'",
        },
        {
          name: "items",
          title: "Rit types",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Titel", type: "localeString" },
                { name: "description", title: "Beschrijving", type: "localeText" },
              ],
              preview: {
                select: { title: "title.nl" },
                prepare({ title }) {
                  return { title: title || "Naamloos rit type" };
                },
              },
            },
          ],
          description: "Bijv. Enkele reis, Retour, Gezinnen & groepen",
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // HOW IT WORKS
    // ─────────────────────────────────────────────────────
    defineField({
      name: 'howItWorksSection',
      type: 'object',
      title: 'Hoe verloopt de rit sectie',
      options: { collapsible: true },
      group: "content",
      fields: [
        {
          name: 'title',
          type: 'localeString',
          title: 'Titel'
        },
        {
          name: 'items',
          type: 'array',
          title: 'Stappen',
          of: [{
            type: 'object',
            title: 'Stap',
            fields: [
              {
                name: 'title',
                type: 'localeString',
                title: 'Titel',
                validation: (Rule: any) => Rule.required()
              },
              {
                name: 'description',
                type: 'localeText',
                title: 'Beschrijving',
                validation: (Rule: any) => Rule.required()
              },
              {
                name: 'icon',
                type: 'string',
                title: 'Icon',
                options: {
                  list: [
                    { title: '📍 Ophalen (MapPin)', value: 'pickup' },
                    { title: '🚗 Rijden (Car)', value: 'driving' },
                    { title: '🏁 Aankomst (Flag)', value: 'arrival' },
                    { title: '📏 Afstand (TrendingUp)', value: 'distance' },
                    { title: '⏱️ Tijd (Clock)', value: 'time' },
                    { title: '🏠 Deur tot Deur (Home)', value: 'home' }
                  ],
                  layout: 'radio'
                },
                validation: (Rule: any) => Rule.required()
              }
            ],
            preview: {
              select: {
                titleNL: 'title.nl',
                titleEN: 'title.en',
                icon: 'icon'
              },
              prepare(selection: any) {
                const { titleNL, titleEN, icon } = selection
                const iconMap: Record<string, string> = {
                  pickup: '📍',
                  driving: '🚗',
                  arrival: '🏁',
                  distance: '📏',
                  time: '⏱️',
                  home: '🏠'
                }
                return {
                  title: titleNL || titleEN || 'Geen titel',
                  subtitle: `Icon: ${iconMap[icon] || '❓'} ${icon || 'Geen icon'}`
                }
              }
            }
          }]
        }
      ]
    }),

    // ─────────────────────────────────────────────────────
    // COMPARISON
    // ─────────────────────────────────────────────────────
    defineField({
      name: "comparison",
      title: "Vergelijking (Taxi vs OV)",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        {
          name: "title",
          title: "Titel",
          type: "localeString",
          description: "Bijv. 'Waarom met een taxi naar Aviodrome Lelystad?'",
        },
        {
          name: "left",
          title: "Links (Met taxi)",
          type: "object",
          fields: [
            { name: "title", title: "Titel", type: "localeString" },
            {
              name: "points",
              title: "Punten",
              type: "object",
              fields: [
                { name: "nl", type: "array", of: [{ type: "string" }] },
                { name: "en", type: "array", of: [{ type: "string" }] },
              ],
            },
          ],
        },
        {
          name: "right",
          title: "Rechts (OV/eigen vervoer)",
          type: "object",
          fields: [
            { name: "title", title: "Titel", type: "localeString" },
            {
              name: "points",
              title: "Punten",
              type: "object",
              fields: [
                { name: "nl", type: "array", of: [{ type: "string" }] },
                { name: "en", type: "array", of: [{ type: "string" }] },
              ],
            },
          ],
        },
      ],
    }),


    // ─────────────────────────────────────────────────────
// SEO CONTENT SECTIE
// ─────────────────────────────────────────────────────
defineField({
  name: "seoContent",
  title: "SEO content sectie",
  type: "object",
  options: { collapsible: true, collapsed: true },
  group: "content",
  fields: [
    {
      name: "title",
      title: "Titel",
      type: "localeString",
      description: "Bijv. 'Taxi naar Aviodrome Lelystad'",
    },
    {
      name: "content",
      title: "Tekst (250-400 woorden)",
      type: "localeText",
      description: "Gebruik variaties van de zoekterm voor betere SEO",
    },
  ],
}),

    // ─────────────────────────────────────────────────────
    // PRACTICAL INFO
    // ─────────────────────────────────────────────────────
    defineField({
      name: "practicalInfo",
      title: "Praktische info",
      type: "object",
      options: { collapsible: true },
      group: "content",
      fields: [
        { name: "title", title: "Titel", type: "localeString" },
        { name: "content", title: "Tekst", type: "localeText" },
        {
          name: "tip",
          title: "Tip (optioneel)",
          type: "localeText",
          description: "Extra tip in een gemarkeerd blok",
        },
      ],
    }),

    // ─────────────────────────────────────────────────────
    // FAQ
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
    // CTA
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
      ],
    }),

    // ─────────────────────────────────────────────────────
    // SETTINGS
    // ─────────────────────────────────────────────────────
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
      title: "title.nl",
      slug: "slug.nl.current",
      media: "cardImage",
      category: "mainCategory.title.nl",
    },
    prepare({ title, slug, media, category }) {
      return {
        title: title || "Naamloze tour",
        subtitle: `${category || "Tours"} / ${slug || ""}`,
        media,
      };
    },
  },
});