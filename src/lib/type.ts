// Mirror of the backend's application status enum and the loan shape returned
// by GET /api/loans/applications/:application_id.

export type ApplicationStatus =
  | "received"
  | "in_review"
  | "approved"
  | "declined"
  | "withdrawn";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

// Envelope shared by the paginated admin list endpoints.
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminStats {
  reference: number;
}

export interface LoanApplication {
  id: string;
  reference: string;
  amountRequested: string;
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
  status: string;
  consentIp: string;
  createdAt: string;
  updatedAt: string;
}
