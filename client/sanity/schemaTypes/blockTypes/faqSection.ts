// /client/sanity/schemaTypes/blockTypes/faqSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqSection",
  title: "FAQ sectie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "FAQ items",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "FAQ sectie",
      };
    },
  },
});
