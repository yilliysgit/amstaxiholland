// sanity/lib/translateTaxiSlugs.ts
import { client } from "@/sanity/lib/client";

type TranslateArgs =
  | {
      kind: "main";
      slug: string;
      fromLocale: "nl" | "en";
      toLocale: "nl" | "en";
    }
  | {
      kind: "sub";
      slug: string;
      subslug: string;
      fromLocale: "nl" | "en";
      toLocale: "nl" | "en";
    };

export async function translateTaxiSlugs(args: TranslateArgs) {
  if (args.fromLocale === args.toLocale) {
    return args.kind === "main"
      ? { slug: args.slug }
      : { slug: args.slug, subslug: args.subslug };
  }

  // ───────────────
  // MAIN SERVICE
  // ───────────────
  if (args.kind === "main") {
    const result = await client.fetch(
      `
      *[
        _type == "mainServicePage" &&
        basicInfo.slug[$from].current == $slug
      ][0]{
        "slug": basicInfo.slug[$to].current
      }
      `,
      {
        slug: args.slug,
        from: args.fromLocale,
        to: args.toLocale,
      }
    );

    return result?.slug ? { slug: result.slug } : null;
  }

  // ───────────────
  // SUB SERVICE
  // ───────────────
  const result = await client.fetch(
    `
    *[
      _type == "subServicePage" &&
      slug[$from].current == $subslug
    ][0]{
      "subslug": slug[$to].current,
      "slug": mainCategory->basicInfo.slug[$to].current
    }
    `,
    {
      slug: args.slug,
      subslug: args.subslug,
      from: args.fromLocale,
      to: args.toLocale,
    }
  );

  return result?.slug && result?.subslug ? result : null;
}
