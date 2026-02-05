import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import HomeHero from '../components/heros/HomeHero';
import AmsSchipholRates from '../components/amsSchipholRates/amsSchipholRates';
import VehicleTypeSelector from '../components/vehicleTypeSelector/VehicleTypeSelector';
import PromoSection from '../components/promoSection/PromoSection';
import EventsSection from '../components/events/EventsSection';
import Reviews from '../components/reviews/Reviews';
import DualCTASection from '../components/dualCTA/DualCTASection';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  // Load all messages
  const globalMessages = await getMessages();
  const homeMessages = (await import(`@/i18n/messages/${locale}/pages/home.json`)).default;
  const vehicleSelectorMessages = (await import(`@/i18n/messages/${locale}/shared/sections/vehicle-selector.json`)).default;
  const eventsMessages = (await import(`@/i18n/messages/${locale}/shared/events/events.json`)).default;
  const reviewsMessages = (await import(`@/i18n/messages/${locale}/shared/sections/reviews.json`)).default;
  const dualCTAMessages = (await import(`@/i18n/messages/${locale}/shared/sections/dual-cta.json`)).default;

  const messages = {
    ...globalMessages,
    HomePage: {
      ...homeMessages,
      vehicleTypeSelector: vehicleSelectorMessages
    },
    EventsSection: eventsMessages,
    Reviews: reviewsMessages,
    DualCTA: dualCTAMessages
  };


  console.log('🔍 LOADED MESSAGES:', {
  hasVehicleSelector: !!messages.HomePage.vehicleTypeSelector,
  hasPromoSection: !!messages.HomePage.PromoSection,
  homePageKeys: Object.keys(messages.HomePage)
});


  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HomeHero />
      <AmsSchipholRates />
     <VehicleTypeSelector />
      <PromoSection />
      <EventsSection />
      <Reviews />
      <DualCTASection />
    </NextIntlClientProvider>
  );
}