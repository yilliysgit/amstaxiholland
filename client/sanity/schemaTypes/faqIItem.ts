// /sanity/schemaTypes/faqItem.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  
  fields: [
    defineField({
      name: "internalName",
      title: "Interne naam (voor overzicht)",
      type: "string",
      description: "Bijvoorbeeld: 'Kosten zakelijk vervoer'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "question",
      title: "Vraag",
      type: "object",
      fieldsets: [
        {
          name: "nlSet",
          title: "🇳🇱 Nederlands",
          options: { collapsible: true, collapsed: false },
        },
        {
          name: "enSet",
          title: "🇬🇧 English",
          options: { collapsible: true, collapsed: true },
        },
      ],
      fields: [
        {
          name: "nl",
          title: "Nederlands",
          type: "string",
          fieldset: "nlSet",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "en",
          title: "English",
          type: "string",
          fieldset: "enSet",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "answer",
      title: "Antwoord",
      type: "object",
      fieldsets: [
        {
          name: "nlSet",
          title: "🇳🇱 Nederlands",
          options: { collapsible: true, collapsed: false },
        },
        {
          name: "enSet",
          title: "🇬🇧 English",
          options: { collapsible: true, collapsed: true },
        },
      ],
      fields: [
        {
          name: "nl",
          title: "Nederlands",
          type: "text",
          rows: 4,
          fieldset: "nlSet",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "en",
          title: "English",
          type: "text",
          rows: 4,
          fieldset: "enSet",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Algemeen", value: "general" },
          { title: "Particulier Vervoer", value: "particulier" },
          { title: "Schiphol", value: "airport" },
          { title: "Evenementenvervoer", value: "evenementen" },
          { title: "Congres & Beurs", value: "congres" },
          { title: "Zakelijk Vervoer", value: "zakelijk" },
          { title: "Bedrijfsvervoer", value: "bedrijfsvervoer" },
          { title: "Tours", value: "tours" },
          { title: "Internationaal", value: "internationaal" },
          { title: "VIP Vervoer", value: "vip" },
          { title: "Hotelvervoer", value: "hotelvervoer" },
          { title: "Prijzen", value: "pricing" },
          { title: "Boeken", value: "booking" },
        ],
      },
      description: "Helpt bij het filteren van FAQ's",
    }),

    defineField({
      name: "sortOrder",
      title: "Sorteervolgorde",
      type: "number",
      initialValue: 0,
      description: "Lagere getallen verschijnen eerst",
    }),
  ],

  preview: {
    select: {
      title: "internalName",
      subtitle: "question.nl",
      category: "category",
    },
    prepare({ title, subtitle, category }) {
      return {
        title: title || subtitle,
        subtitle: category ? `${category} - ${subtitle}` : subtitle,
      };
    },
  },
});