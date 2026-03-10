import { defineType, defineField } from "sanity";

export default defineType({
  name: "voordelenSection",
  title: "Voordelen sectie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "localeString",
    }),
    defineField({
      name: "items",
      title: "Voordelen",
      type: "object",
      fields: [
        {
          name: "nl",
          title: "Nederlands",
          type: "array",
          of: [{
            type: "object",
            fields: [
              { name: "label", title: "Titel", type: "string" },
              { name: "description", title: "Beschrijving", type: "text" },
              { name: "icon", title: "Icoon", type: "string" },
            ],
          }],
        },
        {
          name: "en",
          title: "Engels",
          type: "array",
          of: [{
            type: "object",
            fields: [
              { name: "label", title: "Title", type: "string" },
              { name: "description", title: "Description", type: "text" },
              { name: "icon", title: "Icon", type: "string" },
            ],
          }],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title.nl" },
    prepare({ title }) {
      return { title: title || "Voordelen sectie" };
    },
  },
});