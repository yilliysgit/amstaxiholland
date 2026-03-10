import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqSection",
  title: "FAQ sectie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "localeString",
    }),
    defineField({
      name: "items",
      title: "FAQ items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "question", title: "Vraag", type: "localeString" },
          { name: "answer", title: "Antwoord", type: "localeText" },
        ],
        preview: {
          select: { title: "question.nl" },
          prepare({ title }) {
            return { title: title || "FAQ item" };
          },
        },
      }],
    }),
  ],
  preview: {
    select: { title: "title.nl" },
    prepare({ title }) {
      return { title: title || "FAQ sectie" };
    },
  },
});