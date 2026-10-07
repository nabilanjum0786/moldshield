import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/Header";
import { Footer, MobileCallBar } from "@/components/Footer";
import { ScrollEffects } from "@/components/ScrollEffects";
import { JsonLd, organizationSchema } from "@/lib/schema";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.brandName} | Mold Remediation Across America`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description:
    "Honest mold remediation guidance for American homeowners. Attic, crawl space, basement and black mold removal with transparent pricing and free inspections.",
  // Preview deployments stay noindexed until the purchased domain is attached.
  ...(siteConfig.noindexPreview ? { robots: { index: false, follow: false } } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <a className="skip" href="#main">
          Skip to main content
        </a>
        <JsonLd data={organizationSchema()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCallBar />
        <ScrollEffects />
      </body>
    </html>
  );
}
