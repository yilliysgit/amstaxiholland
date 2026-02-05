import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || 'nl';
  
  console.log('🔥 Loading messages for locale:', locale);
  
  try {
    const globalMessages = (await import(`./messages/${locale}.json`)).default;
    const breadcrumbsMessages = (await import(`./messages/${locale}/shared/navigation/breadcrumbs.json`)).default;
    const zakelijkMessages = (await import(`./messages/${locale}/pages/diensten/zakelijk.json`)).default;
    const particulierenMessages = (await import(`./messages/${locale}/pages/diensten/particulieren.json`)).default;
    const overOnsMessages = (await import(`./messages/${locale}/pages/over-ons.json`)).default;
    const taxiSchipholMessages = (await import(`./messages/${locale}/pages/diensten/taxi-schiphol.json`)).default;
    
    // Tours messages
    const toursMetadata = (await import(`./messages/${locale}/data/tours/tours-metadata.json`)).default;
    const toursData = (await import(`./messages/${locale}/data/tours/tours-data.json`)).default;

    // 🆕 Booking form messages
    const bookingsFormMessages = (await import(`./messages/${locale}/forms/bookingsForm/index.ts`)).default;

    console.log('📝 Zakelijk sample:', zakelijkMessages?.ZakelijkPage?.hero?.badge);
    console.log('✈️ Schiphol sample:', taxiSchipholMessages?.SchipholPage?.hero?.badge);
    console.log('🎫 Tours sample:', toursData?.['aviodrome-lelystad']?.name);
    console.log('📋 Booking form sample:', bookingsFormMessages?.step1?.title);

    return {
      locale,
      messages: {
        ...globalMessages,
        Breadcrumbs: breadcrumbsMessages,
        ...zakelijkMessages,
        ...particulierenMessages,
        ...overOnsMessages,
        ...taxiSchipholMessages,
        ToursMetadata: toursMetadata,
        ToursData: toursData,
        // 🆕 Booking form messages
        forms: {
          bookingsForm: bookingsFormMessages,
        },
      }
    };
  } catch (error) {
    console.error('❌ Error loading messages:', error);
    throw error;
  }
});