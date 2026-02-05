// /client/sanity/schemaTypes/blockTypes/highlightsSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "highlightsSection",
  title: "Highlights sectie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Highlights",
      };
    },
  },
});
