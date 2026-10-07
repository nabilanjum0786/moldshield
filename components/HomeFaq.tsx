import dynamic from "next/dynamic";
const FaqAccordion = dynamic(() => import("./FaqAccordion").then((m) => m.FaqAccordion), {
  loading: () => <div aria-busy="true"><p>Loading questions…</p></div>,
});
import { JsonLd, faqJsonLd } from "@/lib/schema";
import { homeFaqs } from "@/content/home-faqs";

/** FAQ hub (§18) — end of page, before final CTA. FAQPage schema. */
export function HomeFaq() {
  return (
    <section className="block alt" aria-labelledby="faq-h">
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <div className="wrap">
        <span className="eyebrow reveal">Questions, Answered</span>
        <h2 id="faq-h" className="reveal">
          Mold Questions We Hear Every Day
        </h2>
        <p className="lede reveal">
          Straight answers, 50–70 words each. Every answer links deeper —
          that&apos;s what makes this a hub.
        </p>
        <div className="reveal" style={{ marginTop: 26, maxWidth: 860 }}>
          <FaqAccordion items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
