// /client/sanity/schemaTypes/blockTypes/galerijSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "galerijSection",
  title: "Galerij sectie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel (optioneel)",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Afbeeldingen",
      type: "array",
      of: [
        defineField({
          name: "imageItem",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Galerij",
      };
    },
  },
});
