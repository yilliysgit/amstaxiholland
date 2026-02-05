// /sanity/schemaTypes/blockTypes/featuresSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "featuresSection",
  title: "Features/USPs Sectie",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Sectie titel",
      type: "object",
      fields: [
        { name: "nl", title: "Nederlands", type: "string" },
        { name: "en", title: "Engels", type: "string" },
      ],
    }),

    defineField({
      name: "subtitle",
      title: "Subtitel",
      type: "object",
      fields: [
        { name: "nl", title: "Nederlands", type: "text" },
        { name: "en", title: "Engels", type: "text" },
      ],
    }),

    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icoon",
              type: "image",
              options: { hotspot: true },
              description: "Klein icoon/illustratie voor deze feature",
            },
            {
              name: "title",
              title: "Titel",
              type: "object",
              fields: [
                { name: "nl", type: "string", title: "Nederlands" },
                { name: "en", type: "string", title: "Engels" },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Beschrijving",
              type: "object",
              fields: [
                { name: "nl", type: "text", title: "Nederlands" },
                { name: "en", type: "text", title: "Engels" },
              ],
            },
          ],
          preview: {
            select: {
              title: "title.nl",
              description: "description.nl",
              media: "icon",
            },
            prepare({ title, description, media }) {
              return {
                title: title || "Naamloze feature",
                subtitle: description?.slice(0, 60) || "",
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid 3 kolommen", value: "grid-3" },
          { title: "Grid 2 kolommen", value: "grid-2" },
          { title: "Grid 4 kolommen", value: "grid-4" },
          { title: "Lijst met iconen links", value: "list-left" },
          { title: "Lijst met iconen boven", value: "list-top" },
        ],
      },
      initialValue: "grid-3",
    }),

    defineField({
      name: "backgroundColor",
      title: "Achtergrondkleur",
      type: "string",
      options: {
        list: [
          { title: "Wit", value: "white" },
          { title: "Lichtgrijs", value: "gray" },
          { title: "Blauw accent", value: "blue" },
          { title: "Geen (transparant)", value: "transparent" },
        ],
      },
      initialValue: "white",
    }),
  ],

  preview: {
    select: {
      title: "title.nl",
      featureCount: "features.length",
    },
    prepare({ title, featureCount }) {
      return {
        title: title || "Features Sectie",
        subtitle: `${featureCount || 0} features`,
      };
    },
  },
});