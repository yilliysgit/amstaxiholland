// app/[locale]/contact/page.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import ContactHero from '@/app/components/pagecomps/contact/ContactHero';
import ContactInfoCards from '@/app/components/pagecomps/contact/ContactInfoCards';


export default async function ContactPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // 1) Globale messages
  const globalMessages = await getMessages();

  // 2) Shared common messages (Common.*)
  const commonMessages = (
    await import(`@/i18n/messages/${locale}/shared/common/common.json`)
  ).default;

  // 3) Contact page specifieke messages (ContactPage.*)
  const contactMessages = (
    await import(`@/i18n/messages/${locale}/pages/contact.json`)
  ).default;

  // 4) Alles samenvoegen ✅ CORRECT
  const messages = {
    ...globalMessages,
    ...contactMessages,
    Common: commonMessages.Common
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main className="min-h-screen bg-slate-100">
        <ContactHero />
        <ContactInfoCards />
      </main>
    </NextIntlClientProvider>
  );
}