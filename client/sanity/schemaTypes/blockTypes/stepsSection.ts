// /client/sanity/schemaTypes/blockTypes/stepsSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "stepsSection",
  title: "Stappen sectie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({
      name: "steps",
      title: "Stappen",
      type: "array",
      of: [
        defineField({
          name: "stepItem",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Stap titel",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Beschrijving",
              type: "text",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Stappen sectie",
      };
    },
  },
});
