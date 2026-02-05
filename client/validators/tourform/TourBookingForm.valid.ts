// @/validators/tourform/TourBookingForm.valid.ts
import type { TourBookingStep1, TourBookingStep2, TourBookingStep1Errors, TourBookingStep2Errors } from '@/types/tours/tourBooking.type';

export function validateStep1(data: TourBookingStep1): TourBookingStep1Errors {
  const errors: TourBookingStep1Errors = {};

  if (!data.pickup.trim()) {
    errors.pickup = 'Ophaallocatie is verplicht';
  }

  if (!data.houseNumber.trim()) {
    errors.houseNumber = 'Huisnummer is verplicht';
  } else {
    const trimmedHouseNumber = data.houseNumber.trim();
    if (!/^\d+$/.test(trimmedHouseNumber)) {
      errors.houseNumber = 'Huisnummer mag alleen cijfers bevatten';
    } else if (trimmedHouseNumber.length > 4) {
      errors.houseNumber = 'Huisnummer mag maximaal 4 cijfers bevatten';
    }
  }

  if (!data.date) {
    errors.date = 'Datum is verplicht';
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.date = 'Datum moet in de toekomst liggen';
    }
  }

  if (!data.time) {
    errors.time = 'Tijd is verplicht';
  }

  if (!data.passengers || data.passengers < 1 || data.passengers > 8) {
    errors.passengers = 'Selecteer 1-8 passagiers';
  }

  return errors;
}

function validateName(name: string, fieldName: string): string | undefined {
  const trimmedName = name.trim();

  if (!trimmedName) return `${fieldName} is verplicht`;
  if (trimmedName.length < 2) return `${fieldName} moet minimaal 2 letters bevatten`;
  if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(trimmedName)) return `${fieldName} mag alleen letters, spaties en koppeltekens bevatten`;

  const words = trimmedName.split(/[\s-]+/).filter(w => w.length > 0);
  if (words.length > 5) return `${fieldName} mag maximaal 5 woorden bevatten`;
  if (words.some(w => w.length < 2)) return `Elk woord in ${fieldName.toLowerCase()} moet minimaal 2 letters bevatten`;

  return undefined;
}

export function validateStep2(data: TourBookingStep2): TourBookingStep2Errors {
  const errors: TourBookingStep2Errors = {};

  const firstNameError = validateName(data.firstName, 'Voornaam');
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateName(data.lastName, 'Achternaam');
  if (lastNameError) errors.lastName = lastNameError;

  if (!data.email.trim()) {
    errors.email = 'Email is verplicht';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Ongeldig emailadres';
  }

  // ⚙️ Telefoon: exact 10 cijfers
  if (!data.phone.trim()) {
    errors.phone = 'Telefoonnummer is verplicht';
  } else {
    const digits = data.phone.replace(/\D/g, ''); // verwijder alles behalve cijfers
    if (!/^\d{10}$/.test(digits)) {
      errors.phone = 'Telefoonnummer moet exact 10 cijfers bevatten';
    }
  }

  return errors;
}
