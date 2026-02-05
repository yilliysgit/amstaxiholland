// /client/sanity/schemaTypes/blockTypes/faqSection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqSection",
  title: "FAQ sectie",
  type: "object",
  
  fields: [
    defineField({
      name: "title",
      title: "Sectie Titel",
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
        },
        {
          name: "en",
          title: "English",
          type: "string",
          fieldset: "enSet",
        },
      ],
    }),
    
    defineField({
      name: "items",
      title: "FAQ items",
      type: "array",
      of: [
        { 
          type: "reference", 
          to: [{ type: "faqQA" }]  // ← Fix: refereert naar faqQA
        }
      ],
      description: "Selecteer FAQ items uit de FAQ Q&A documenten",
    }),
  ],
  
  preview: {
    select: { 
      title: "title.nl",
      itemCount: "items.length" 
    },
    prepare({ title, itemCount }) {
      return {
        title: title || "FAQ sectie",
        subtitle: `${itemCount || 0} FAQ items`,
      };
    },
  },
});