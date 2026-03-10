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
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", title: "Titel", type: "localeString" },
          { name: "description", title: "Beschrijving", type: "localeText" },
          { name: "icon", title: "Icoon", type: "string" },
        ],
        preview: {
          select: { title: "label.nl" },
          prepare({ title }) {
            return { title: title || "Voordeel" }
          }
        }
      }],
    }),
  ],
  preview: {
    select: { title: "title.nl" },
    prepare({ title }) {
      return { title: title || "Voordelen sectie" };
    },
  },
});