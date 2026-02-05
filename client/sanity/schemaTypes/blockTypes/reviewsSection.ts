// /sanity/schemaTypes/blockTypes/reviewsSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "reviewsSection",
  title: "Reviews Sectie",
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
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [{ type: "reference", to: [{ type: "review" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid (3 kolommen)", value: "grid" },
          { title: "Carousel/Slider", value: "carousel" },
          { title: "Lijst", value: "list" },
        ],
      },
      initialValue: "grid",
    }),

    defineField({
      name: "showRating",
      title: "Toon rating sterren",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "showDate",
      title: "Toon datum",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "showAvatar",
      title: "Toon profielfoto",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "title.nl",
      reviewCount: "reviews.length",
    },
    prepare({ title, reviewCount }) {
      return {
        title: title || "Reviews Sectie",
        subtitle: `${reviewCount || 0} reviews`,
      };
    },
  },
});