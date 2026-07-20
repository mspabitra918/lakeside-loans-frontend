import { ApplyFormValues } from "../components/apply/types";
import { AdminUser, getToken } from "./auth";
import { AdminStats, LoanApplication, Paginated } from "./type";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://lakeside-loans-backend.vercel.app";

export const DEFAULT_PAGE_SIZE = 20;

export interface AdminListParams {
  q?: string;
  page?: number;
  limit?: number;
  date?: string;
  tzOffset?: number;
}

// Serialises list params, dropping empty values so an untouched search box does
// not send `?q=` (which the backend would treat as a real, always-empty filter).
function buildQuery(params: AdminListParams): string {
  const search = new URLSearchParams();

  if (params.q?.trim()) {
    search.set("q", params.q.trim());
  }

  if (params.date) {
    search.set("date", params.date);
    // Let the backend resolve `date` against the admin's local calendar day.
    search.set("tzOffset", String(new Date().getTimezoneOffset()));
  }

  search.set("page", String(params.page ?? 1));
  search.set("limit", String(params.limit ?? DEFAULT_PAGE_SIZE));

  return `?${search.toString()}`;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  // Admin endpoints are guarded by JWT; attach the bearer token when one is
  // present (client-side only — getToken returns null during SSR, which is
  // fine for the public endpoints rendered on the server).
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    // Status/lookup data must always be fresh.
    cache: "no-store",
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) {
        message = Array.isArray(body.message)
          ? body.message.join(", ")
          : body.message;
      }
    } catch {
      /* non-JSON error body — keep the default message */
    }
    throw new ApiError(message, res.status);
  }

  return res.json() as Promise<T>;
}

// What POST /api/loan-applications actually returns. The API deliberately
// echoes back only the reference and state — no decision, and no PII.
export interface ApplyResponse {
  reference: string;
  status: string;
  submittedAt: string;
}

export const api = {
  // Submit a new loan application. Returns the reference the applicant uses to
  // look the application up later.
  async apply(payload: ApplyFormValues): Promise<ApplyResponse> {
    return request<ApplyResponse>("/loan-applications", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  //   async createContacts(payload: ContactsPayload) {
  //     const data = await request(`/contact/create`, {
  //       method: "POST",
  //       body: JSON.stringify(payload),
  //     });
  //     return data;
  //   },

  // --- Admin ---------------------------------------------------------------

  // Exchanges credentials for a JWT. Persisting the token is the caller's job
  // (see lib/auth.ts) so this stays usable from anywhere.
  async login(email: string, password: string) {
    const data = await request<{
      message: string;
      data: { token: string; user: AdminUser };
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return data.data;
  },

  async getStats(): Promise<AdminStats> {
    return request<AdminStats>("/admin/stats");
  },

  async getApplications(
    params: AdminListParams = {},
  ): Promise<Paginated<LoanApplication>> {
    const data = await request<{
      applications: LoanApplication[];
      total: number;
      page: number;
      limit: number;
    }>(`/loan-applications/applications${buildQuery(params)}`);
    return {
      items: data.applications ?? [],
      total: data.total ?? 0,
      page: data.page ?? 1,
      limit: data.limit ?? DEFAULT_PAGE_SIZE,
    };
  },

  async getApplication(applicationId: string): Promise<LoanApplication> {
    const data = await request<{ loan: LoanApplication }>(
      `/loan-applications/applications/${encodeURIComponent(applicationId)}/admin`,
    );
    return data.loan;
  },
};
