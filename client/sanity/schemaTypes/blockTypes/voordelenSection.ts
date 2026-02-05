// /client/sanity/schemaTypes/blockTypes/voordelenSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "voordelenSection",
  title: "Voordelen sectie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Voordelen",
      type: "array",
      of: [
        defineField({
          name: "voordeelItem",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Titel",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Beschrijving",
              type: "text",
            }),
            defineField({
              name: "icon",
              title: "Icoon (optioneel)",
              type: "string",
              description: "Bijv. 'shield', 'clock', 'star' – zelf mappen in frontend.",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
