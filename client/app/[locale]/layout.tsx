import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Jost } from 'next/font/google';
import Script from "next/script";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/header/footer/Footer";
import "swiper/css";
import "../globals.css";

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
});


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={jost.variable}>
      <body className={jost.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
         
    {children}
 
          <Footer />
          
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=weekly&loading=async&libraries=places`}
            strategy="afterInteractive"
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}