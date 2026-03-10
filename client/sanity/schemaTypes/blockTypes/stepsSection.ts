import { defineType, defineField } from "sanity";

export default defineType({
  name: "stepsSection",
  title: "Stappen sectie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "localeString",
    }),
    defineField({
      name: "steps",
      title: "Stappen",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "title", title: "Stap titel", type: "localeString" },
          { name: "description", title: "Beschrijving", type: "localeText" },
        ],
        preview: {
          select: { title: "title.nl" },
          prepare({ title }) {
            return { title: title || "Stap" }
          }
        }
      }],
    }),
  ],
  preview: {
    select: { title: "title.nl" },
    prepare({ title }) {
      return { title: title || "Stappen sectie" };
    },
  },
});