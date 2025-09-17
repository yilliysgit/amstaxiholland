//types/forms/bookingsForm/utils/validators.ts
import { AddressFields } from "../BookingsFormStep1.type";

export function isAddressComplete(a?: AddressFields | null): a is AddressFields {
  if (!a) return false;
  const addr = a.address.trim();
  const nr = a.houseNumber.trim();
  return addr.length > 0 && nr.length > 0;
}