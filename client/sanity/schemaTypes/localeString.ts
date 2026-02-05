// client/sanity/schemaTypes/localeString.ts
import { defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Tekst (NL / EN)",
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
      type: "string",
      fieldset: "nlSet",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "en",
      title: "English",
      type: "string",
      fieldset: "enSet",
    },
  ],

  preview: {
    select: {
      nl: "nl",
      en: "en",
    },
    prepare({ nl, en }) {
      return {
        title: nl || en || "Geen tekst",
        subtitle: en ? `EN: ${en}` : "Geen Engelse vertaling",
      };
    },
  },
});