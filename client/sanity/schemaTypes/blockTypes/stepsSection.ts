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
      type: "object",
      fields: [
        {
          name: "nl",
          title: "Nederlands",
          type: "array",
          of: [{
            type: "object",
            fields: [
              { name: "label", title: "Stap titel", type: "string" },
              { name: "description", title: "Beschrijving", type: "text" },
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
              { name: "label", title: "Step title", type: "string" },
              { name: "description", title: "Description", type: "text" },
            ],
          }],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title.nl" },
    prepare({ title }) {
      return { title: title || "Stappen sectie" };
    },
  },
});