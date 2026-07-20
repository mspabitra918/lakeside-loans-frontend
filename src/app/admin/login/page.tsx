"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "@/src/lib/api";
import { isAuthenticated, setToken, setUser } from "@/src/lib/auth";
import { Button } from "@/src/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Someone already signed in has no business on the login screen.
  useEffect(() => {
    if (isAuthenticated()) router.replace("/admin");
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const { token, user } = await api.login(email.trim(), password);

      if (user.role !== "admin") {
        // A valid non-admin token would fail every admin call anyway; refusing
        // here gives a clear reason instead of an empty, broken dashboard.
        setError("This account does not have admin access.");
        return;
      }

      setToken(token);
      setUser(user);
      toast.success("Signed in");
      router.replace("/admin");
    } catch (err) {
      const message =
        err instanceof ApiError && err.status === 401
          ? "Incorrect email or password."
          : err instanceof Error
            ? err.message
            : "Unable to sign in. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-ink-800 text-white">
            <Lock className="size-5" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold text-ink-900">Admin sign in</h1>
          <p className="mt-1 text-sm text-ink-700">
            Lakeside Loans internal portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-ink-100 bg-white p-6 shadow-lift"
          noValidate
        >
          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <label
            className="mb-1.5 block text-sm font-medium text-navy-800"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            placeholder="admin@lakesideloans.ca"
          />

          <label
            className="mb-1.5 block text-sm font-medium text-navy-800"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-white-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            placeholder="••••••••"
          />

          <Button
            type="submit"
            className="w-full bg-ink-800 text-white"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
