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
  type: "localeString",
}),
defineField({
  name: "subtitle",
  title: "Subtitel",
  type: "localeText",
}),
defineField({
  name: "buttonLabel",
  title: "Button tekst",
  type: "localeString",
}),
defineField({
  name: "buttonLink",
  title: "Button link",
  type: "string",
}),
  ],
  preview: {
    select: { title: "title.nl" },
    prepare({ title }) {
      return { title: title || "CTA sectie" };
    },
  },
});