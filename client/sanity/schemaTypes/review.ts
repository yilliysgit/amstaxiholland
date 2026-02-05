// /sanity/schemaTypes/review.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Naam klant",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),

    defineField({
      name: "review",
      title: "Review tekst",
      type: "object",
      fields: [
        { name: "nl", title: "Nederlands", type: "text" },
        { name: "en", title: "Engels", type: "text" },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "date",
      title: "Review datum",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "service",
      title: "Service (optioneel)",
      type: "reference",
      to: [{ type: "servicePage" }],
      description: "Koppel aan specifieke service",
    }),

    defineField({
      name: "verified",
      title: "Geverifieerde review",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "featured",
      title: "Uitgelicht",
      type: "boolean",
      initialValue: false,
      description: "Toon deze review prominent",
    }),

    defineField({
      name: "avatar",
      title: "Profielfoto (optioneel)",
      type: "image",
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: {
      title: "name",
      rating: "rating",
      review: "review.nl",
      media: "avatar",
    },
    prepare({ title, rating, review, media }) {
      return {
        title,
        subtitle: `${"⭐".repeat(rating)} - ${review?.slice(0, 60)}...`,
        media,
      };
    },
  },
});