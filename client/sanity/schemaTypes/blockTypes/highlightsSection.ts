import { defineType, defineField } from "sanity";

export default defineType({
  name: "highlightsSection",
  title: "Highlights sectie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "localeString",
    }),
    defineField({
      name: "items",
      title: "Highlights",
      type: "object",
      fields: [
        { name: "nl", title: "Nederlands", type: "array", of: [{ type: "string" }] },
        { name: "en", title: "Engels", type: "array", of: [{ type: "string" }] },
      ],
    }),
  ],
  preview: {
    select: { title: "title.nl" },
    prepare({ title }) {
      return { title: title || "Highlights sectie" };
    },
  },
});