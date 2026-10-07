import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, services } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Mold Remediation Services | ${siteConfig.brandName}`,
  description:
    "Five certified mold remediation specialties: attic, crawl space, basement, black mold removal, plus inspection & testing. Free inspections, transparent pricing.",
  alternates: { canonical: `${siteConfig.siteUrl}/services/` },
};

export default function ServicesIndexPage() {
  const url = `${siteConfig.siteUrl}/services/`;
  return (
    <>
      <JsonLd data={[speakableSchema({ url, cssSelectors: [".speakable"] })]} />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Services" }]}
      />
      <HubHero
        h1="Mold Remediation Services"
        answer="Five specialties, one certified process: containment, removal, treatment, moisture fix, verification. Every service starts with a free inspection and ends with a written quote — pick your problem area below."
      />
      <section className="block" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">What We Do</span>
          <h2 id="services-h" className="reveal">
            Five Specialties. One Certified Process.
          </h2>
          <div className="grid cols-3" style={{ marginTop: 26 }}>
            {services.map((s, i) => (
              <div
                key={s.slug}
                className="card reveal"
                {...(i % 3 > 0 ? { "data-delay": String(i % 3) } : {})}
              >
                <h3>{s.name}</h3>
                <p>{s.blurb}</p>
                <Link className="more" href={`/services/${s.slug}/`}>
                  {s.name} <Icon name="arrow" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Get Your Free Inspection"
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
