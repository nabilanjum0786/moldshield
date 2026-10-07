import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.brandName}`,
  description: `Privacy policy for ${siteConfig.brandName}.`,
  alternates: { canonical: `${siteConfig.siteUrl}/privacy/` },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]}
      />
      <section className="block" aria-labelledby="pp-h">
        <div className="wrap">
          <div className="richtext" style={{ maxWidth: 780 }}>
            <h2 id="pp-h">Privacy Policy</h2>
            <p>
              {siteConfig.brandName} respects your privacy. This policy
              explains what information we collect when you use this site and
              how we use it.
            </p>
            <h3>Information we collect</h3>
            <p>
              When you call us or request a free inspection, we collect the
              contact details you provide (name, phone number, address, and
              details about the mold issue). Our interactive tools (cost
              estimator, risk quiz) run entirely in your browser — your
              answers never leave your device.
            </p>
            <h3>How we use it</h3>
            <p>
              We use your information to schedule inspections, provide quotes,
              and perform remediation work. We do not sell your personal
              information to third parties.
            </p>
            <p>
              If you download our free checklist, we collect your name and
              email address to send it to you. We&apos;ll never spam you, and
              you can unsubscribe anytime via the link in any email.
            </p>
            <h3>Contact</h3>
            <p>
              Questions about this policy? Call{" "}
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
