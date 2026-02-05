// client/sanity/schemaTypes/localeBlockContent.ts
import { defineType } from "sanity";

export const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Rijke tekst met opmaak (NL / EN)",
  type: "object",
  description: "Lange tekst met bold, italic, lijsten, koppen en links",

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
      title: "Nederlandse content",
      type: "array",
      fieldset: "nlSet",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normaal", value: "normal" },
            { title: "Kop 2", value: "h2" },
            { title: "Kop 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet lijst", value: "bullet" },
            { title: "Genummerd", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Vet", value: "strong" },
              { title: "Cursief", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    name: "openInNewTab",
                    type: "boolean",
                    title: "Open in nieuw tabblad",
                    initialValue: false,
                  }
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "en",
      title: "English content",
      type: "array",
      fieldset: "enSet",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    name: "openInNewTab",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: false,
                  }
                ],
              },
            ],
          },
        },
      ],
    },
  ],

  preview: {
    select: {
      blocks: "nl",
    },
    prepare({ blocks }) {
      const block = (blocks || [])[0];
      const text = block
        ? block.children
            ?.filter((child: any) => child._type === "span")
            .map((span: any) => span.text)
            .join("")
        : "";
      
      return {
        title: text.slice(0, 60) + (text.length > 60 ? "..." : "") || "Geen tekst",
        subtitle: "Rijke tekst met opmaak",
      };
    },
  },
});