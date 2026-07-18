export interface ApplyFormValues {
  amountRequested: number;
  purpose: string;
  termMonths: number;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  street: string;
  city: string;
  state: string;
  postalCode: string;

  bankName: string;
  routingNumber: string;
  accountNumber: string;
  bankAccountAge: string;
  accountStatus: string;

  smsConsent: boolean;
}
