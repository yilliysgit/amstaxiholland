// types/contact.ts

export type ContactSubject = 
  | 'booking'      // Directe boeking
  | 'quote'        // Offerte aanvraag
  | 'question'     // Algemene vraag
  | 'complaint'    // Klacht
  | 'lost-item'    // Gevonden voorwerp
  | 'partnership'  // Zakelijke samenwerking
  | 'other';       // Overig

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject | '';
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export interface ContactFormState {
  data: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export type ContactFormField = keyof ContactFormData;

// Subject options voor de dropdown
export const CONTACT_SUBJECTS: ContactSubject[] = [
  'booking',
  'quote',
  'question',
  'complaint',
  'lost-item',
  'partnership',
  'other',
];