// client/sanity/schemaTypes/localeText.ts
import { defineType } from "sanity";

export const localeText = defineType({
  name: "localeText",
  title: "Lange tekst (NL / EN)",
  type: "object",

  fieldsets: [
    {
      name: "nlSet",
      title: "🇳🇱 Nederlands",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "enSet",
      title: "🇬🇧 English",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    {
      name: "nl",
      title: "Nederlands",
      type: "text",
      rows: 4,
      fieldset: "nlSet",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
      fieldset: "enSet",
    },
  ],

  preview: {
    select: {
      nl: "nl",
      en: "en",
    },
    prepare({ nl, en }) {
      const text = nl || en || "Geen tekst";
      return {
        title: text.slice(0, 60) + (text.length > 60 ? "..." : ""),
        subtitle: nl ? `${nl.length} karakters` : "Geen Nederlandse tekst",
      };
    },
  },
});