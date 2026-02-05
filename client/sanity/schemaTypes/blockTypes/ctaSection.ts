// /client/sanity/schemaTypes/blockTypes/ctaSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "ctaSection",
  title: "CTA sectie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Tekst",
      type: "text",
    }),
    defineField({
      name: "buttonLabel",
      title: "Button tekst",
      type: "string",
    }),
    defineField({
      name: "buttonHref",
      title: "Button link",
      type: "string", // vaak handiger dan url, omdat je intern routeert
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "CTA sectie",
      };
    },
  },
});
