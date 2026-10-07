import React from "react";
import { siteConfig } from "./site-config";

/** Renders a JSON-LD script tag, sanitized against XSS per Next.js docs. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    slogan: siteConfig.tagline,
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    openingHours: "Mo-Su 00:00-23:59",
  };
}

/** Service schema WITHOUT a fake address — areaServed carries the geography. */
export function serviceSchema(opts: {
  serviceName: string;
  description: string;
  url: string;
  areaServed: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.serviceName,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
      telephone: siteConfig.phoneDisplay,
    },
    areaServed: opts.areaServed.map((a) => ({ "@type": "City", name: a })),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function howToSchema(opts: { name: string; steps: { name: string; text: string }[]; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** SpeakableSpecification — flags answer paragraphs for voice assistants. */
export function speakableSchema(opts: { url: string; cssSelectors: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: opts.url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: opts.cssSelectors,
    },
  };
}

export type FaqJsonLdItem = {
  question: string;
  /** Plain-text answer (HTML stripped) for the JSON-LD payload. */
  answerText: string;
};

/**
 * faqJsonLd() — builds the FAQPage payload from FAQ items. Accepts either
 * pre-cleaned { question, answerText } items or the FaqItem shape used by
 * the accordion ({ q, aHtml }); HTML is stripped to plain text so the
 * structured data never ships markup.
 */
export function faqJsonLd(
  items: FaqJsonLdItem[] | { q: string; aHtml: string }[]
): Record<string, unknown> {
  const mainEntity = items.map((f) => {
    if ("question" in f) {
      return {
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answerText },
      };
    }
    return {
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.aHtml
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      },
    };
  });
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
