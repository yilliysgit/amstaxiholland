import ZakelijkHero from '@/app/components/mainpages/zakelijk/ZakelijkHero';
import React from 'react'
import ZakelijkAccountIntroSection from '@/app/components/mainpages/zakelijk/ZakelijkAccountIntroSection';
import ZakelijkDiensten from '@/app/components/mainpages/zakelijk/ZakelijkeDiensten';
import ZakelijkPricing from '@/app/components/mainpages/zakelijk/ZakeijkPricing';
import ZakelijkVloot from '@/app/components/mainpages/zakelijk/ZakelijkVloot';
import FAQSection from '@/app/components/faq/Faq';
import Breadcrumbs from '@/app/components/breadcrumbs/BreadCrumbs';


const zakelijkeFAQs = [
  {
    q: "Hoe werkt de maandfacturering precies?",
    a: "Je ontvangt elke maand één overzichtelijke factuur met alle ritten. Deze bevat een gedetailleerd overzicht per rit, medewerker en kostenplaats. Alle facturen zijn BTW-proof en direct te exporteren naar je boekhouding."
  },
  {
    q: "Kunnen meerdere medewerkers gebruik maken van het zakelijk account?",
    a: "Ja, je kunt onbeperkt gebruikers toevoegen aan je account. Elke medewerker krijgt eigen login credentials en je bepaalt zelf welke rechten en budgetten per gebruiker gelden."
  },
  {
    q: "Wat gebeurt er bij een no-show of annulering?",
    a: "Annuleringen tot 2 uur voor de geplande rit zijn gratis. Bij annuleringen binnen 2 uur of no-shows brengen we 50% van het rittarief in rekening. Voor contractklanten hanteren we vaak soepelere voorwaarden."
  },
  {
    q: "Hoe snel kunnen jullie een zakelijk account activeren?",
    a: "Na ontvangst van je aanvraag is je account binnen 1 werkdag actief. Je ontvangt direct je login gegevens en kan meteen ritten boeken. Voor spoed kunnen we binnen 2 uur activeren."
  },
  {
    q: "Bieden jullie SLA garanties?",
    a: "Ja, voor Business en Corporate pakketten bieden we custom SLA's aan. Denk aan gegarandeerde responstijden, beschikbaarheid en on-time performance. Dit wordt allemaal vastgelegd in je contract."
  },
  {
    q: "Kunnen wij ook internationale ritten boeken?",
    a: "Absoluut. Wij rijden door heel Europa. Voor ritten buiten de Benelux adviseren we minimaal 48 uur van tevoren te boeken zodat we de beste chauffeur kunnen inplannen."
  }
];



export default function ZakelijkPage() {
  return (
     <main className="[--cta-h:188px]"> {/* alleen hier geldig */}
     <Breadcrumbs />
      <ZakelijkHero />
      <ZakelijkAccountIntroSection />
      <ZakelijkDiensten />
      <ZakelijkPricing />
      <ZakelijkVloot/>
      <FAQSection faqs={zakelijkeFAQs} />
    </main>
  );
}