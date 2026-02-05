// client/types/forms/bookingsForm/step5.type.ts

import type { BookingStep1FormData } from "./step1.type";
import type { BookingStep2FormData } from "./step2.type";
import type { BookingStep3FormData } from "./step3.type";
import type { ContactInfo } from "./step4.type";
import type { StepNumber } from "./steps.type";

/* -------------------- Props -------------------- */

// Geen eigen form data — step 5 is summary only
export interface BookingStep5Props {
  step1: BookingStep1FormData;
  step2: BookingStep2FormData;
  step3: BookingStep3FormData;
  step4: ContactInfo;
  onPrev: () => void;
  onPayment: () => Promise<void> | void;
  onEdit?: (step: StepNumber) => void;
}