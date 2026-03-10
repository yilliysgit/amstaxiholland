import { defineType, defineField } from "sanity";

export default defineType({
  name: "lokaalSection",
  title: "Lokale SEO Sectie",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "object",
      fields: [
        { name: "nl", title: "Nederlands", type: "string" },
        { name: "en", title: "Engels", type: "string" },
      ],
    }),

    defineField({
      name: "intro",
      title: "Introductie tekst",
      type: "object",
      fields: [
        { name: "nl", title: "Nederlands", type: "text", rows: 3 },
        { name: "en", title: "Engels", type: "text", rows: 3 },
      ],
    }),

    defineField({
      name: "steden",
      title: "Steden / Gebieden",
      type: "object",
      fields: [
        { name: "nl", title: "Nederlands", type: "array", of: [{ type: "string" }] },
        { name: "en", title: "Engels", type: "array", of: [{ type: "string" }] },
      ],
    }),

    defineField({
      name: "outro",
      title: "Afsluitende tekst",
      type: "object",
      fields: [
        { name: "nl", title: "Nederlands", type: "text", rows: 2 },
        { name: "en", title: "Engels", type: "text", rows: 2 },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title.nl",
    },
    prepare({ title }) {
      return {
        title: title || "Lokale SEO Sectie",
      };
    },
  },
});