import { notFound } from "next/navigation";
import VervoerTypeTemplate from "@/app/components/services/vervoerTypePages/VervoerTypeTemplate";
import BusinessPage from "@/app/components/services/vervoerTypePages/BusinessPage";

interface PageParams {
  slug: string;
  locale: string;
}

const slugToKey: Record<string, string> = {
  "zakelijke-taxi": "business-class",
  "business-taxi": "business-class",
};

export default async function ServiceDetailPage({ params }: any) {

  // ⬇⬇⬇  BELANGRIJK  ⬇⬇⬇
  const { slug, locale } = await params;

  const jsonKey = slugToKey[slug] ?? slug;

  let data: any;

  try {
    data = (
      await import(
        `@/i18n/messages/${locale}/pages/vervoerstype/${jsonKey}.json`
      )
    ).default;
  } catch (e) {
    return notFound();
  }

  if (jsonKey === "business-class") {
    return <BusinessPage data={data} locale={locale} />;
  }

  return <VervoerTypeTemplate data={data} locale={locale} />;
}
