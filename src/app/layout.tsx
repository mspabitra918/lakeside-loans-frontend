import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { COMPANY } from "../lib/company";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.name} | Personal Loans`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Lakeside Loans — company information, privacy policy, terms of use, state licensing, and accessibility statement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-body">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
