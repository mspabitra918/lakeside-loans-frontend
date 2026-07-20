// Lightweight client-side auth state for the admin panel.
// The backend issues a JWT on POST /auth/login; we persist it in localStorage
// and attach it as a Bearer token on every API request (see lib/api.ts).

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export const TOKEN_KEY = "lakeside-loans_token";
export const USER_KEY = "lakeside-loans_user";

// Shape returned by POST /api/auth/login.
export type AdminUser = {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
};

export function adminDisplayName(user: AdminUser | null): string {
  if (!user) return "";
  return user.full_name?.trim() ?? "";
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function getUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function setUser(user: AdminUser): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
