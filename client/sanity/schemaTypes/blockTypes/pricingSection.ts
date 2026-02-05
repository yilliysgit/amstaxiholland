// /sanity/schemaTypes/blockTypes/pricingSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "pricingSection",
  title: "Prijzen/Tarieven Sectie",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Sectie titel",
      type: "object",
      fields: [
        { name: "nl", title: "Nederlands", type: "string" },
        { name: "en", title: "Engels", type: "string" },
      ],
    }),

    defineField({
      name: "subtitle",
      title: "Subtitel",
      type: "object",
      fields: [
        { name: "nl", title: "Nederlands", type: "text" },
        { name: "en", title: "Engels", type: "text" },
      ],
    }),

    defineField({
      name: "pricingTiers",
      title: "Prijs categorieën",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Naam",
              type: "object",
              fields: [
                { name: "nl", type: "string", title: "Nederlands" },
                { name: "en", type: "string", title: "Engels" },
              ],
            },
            {
              name: "description",
              title: "Beschrijving",
              type: "object",
              fields: [
                { name: "nl", type: "text", title: "Nederlands" },
                { name: "en", type: "text", title: "Engels" },
              ],
            },
            {
              name: "price",
              title: "Prijs",
              type: "number",
            },
            {
              name: "priceUnit",
              title: "Prijs eenheid",
              type: "object",
              fields: [
                { name: "nl", type: "string", title: "Nederlands", placeholder: "per persoon" },
                { name: "en", type: "string", title: "Engels", placeholder: "per person" },
              ],
            },
            {
              name: "features",
              title: "Inbegrepen",
              type: "object",
              fields: [
                {
                  name: "nl",
                  type: "array",
                  of: [{ type: "string" }],
                  title: "Nederlands",
                },
                {
                  name: "en",
                  type: "array",
                  of: [{ type: "string" }],
                  title: "Engels",
                },
              ],
            },
            {
              name: "highlighted",
              title: "Uitgelicht (aanbevolen)",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "ctaLabel",
              title: "Button tekst",
              type: "object",
              fields: [
                { name: "nl", type: "string", title: "Nederlands" },
                { name: "en", type: "string", title: "Engels" },
              ],
            },
            {
              name: "ctaUrl",
              title: "Button link",
              type: "string",
            },
          ],
          preview: {
            select: {
              title: "name.nl",
              price: "price",
              highlighted: "highlighted",
            },
            prepare({ title, price, highlighted }) {
              return {
                title: title || "Naamloze prijs tier",
                subtitle: `€${price || 0}${highlighted ? " (Uitgelicht)" : ""}`,
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "3 kolommen", value: "columns-3" },
          { title: "2 kolommen", value: "columns-2" },
          { title: "Lijst", value: "list" },
        ],
      },
      initialValue: "columns-3",
    }),

    defineField({
      name: "note",
      title: "Extra notitie",
      type: "object",
      fields: [
        { name: "nl", title: "Nederlands", type: "text" },
        { name: "en", title: "Engels", type: "text" },
      ],
      description: "Bijvoorbeeld: 'Alle prijzen zijn exclusief BTW'",
    }),
  ],

  preview: {
    select: {
      title: "title.nl",
      tierCount: "pricingTiers.length",
    },
    prepare({ title, tierCount }) {
      return {
        title: title || "Prijzen Sectie",
        subtitle: `${tierCount || 0} prijs categorieën`,
      };
    },
  },
});