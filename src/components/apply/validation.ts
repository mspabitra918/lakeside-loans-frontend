import { ApplyFormValues } from "./types";

/** Drops fields with no message so the caller can count real errors. */
function compact(result: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(result).filter(([, message]) => message !== ""),
  );
}

export function validateStepOne(values: ApplyFormValues) {
  return compact({
    amountRequested: !values.amountRequested ? "Required" : "",
    purpose: !values.purpose ? "Required" : "",
    termMonths: !values.termMonths ? "Required" : "",

    firstName: !values.firstName ? "Required" : "",
    lastName: !values.lastName ? "Required" : "",
    email: !values.email ? "Required" : "",
    phone: !values.phone ? "Required" : "",

    street: !values.street ? "Required" : "",
    city: !values.city ? "Required" : "",
    state: !values.state ? "Required" : "",
    postalCode: !/^\d{5}(-\d{4})?$/.test(values.postalCode.trim())
      ? "Enter a valid US ZIP Code"
      : "",

    smsConsent: !values.smsConsent ? "Please accept SMS consent" : "",
  });
}
export function validateStepTwo(values: ApplyFormValues) {
  return compact({
    bankName: !values.bankName ? "Required" : "",
    routingNumber: !values.routingNumber ? "Required" : "",
    accountNumber: !values.accountNumber ? "Required" : "",
    bankAccountAge: !values.bankAccountAge ? "Required" : "",
    accountStatus: !values.accountStatus ? "Required" : "",
  });
}
