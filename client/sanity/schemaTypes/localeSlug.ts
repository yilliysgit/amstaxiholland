import { defineType, defineField } from "sanity";

export const localeSlug = defineType({
  name: "localeSlug",
  title: "URL Slug",
  type: "object",
  fields: [
    defineField({
      name: "nl",
      title: "Nederlands",
      type: "slug",
      options: {
        // Kijk EERST in basicInfo, dan in title (fallback)
        source: (doc: any) => doc?.basicInfo?.title?.nl || doc?.title?.nl,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "slug",
      options: {
        // Kijk EERST in basicInfo, dan in title (fallback)
        source: (doc: any) => doc?.basicInfo?.title?.en || doc?.title?.en,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});