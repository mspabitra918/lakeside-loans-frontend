import { SiteFooter } from "../../layout/SiteFooter";
import Navbar from "../../layout/Navbar";

// Marketing chrome. This lives here rather than in the root layout so the admin
// portal — which renders its own header — does not inherit the public nav and
// footer.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-card"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
