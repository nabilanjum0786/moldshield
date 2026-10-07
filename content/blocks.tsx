import { AnswerBlock, CtaCard, Faq, type FaqItem } from "@/components/content";

// ── Block schema: every pillar/town page is an array of these blocks. ──
// The Groq pipeline will eventually generate these objects; the renderer
// below turns them into the final page. Same skeleton, unique flesh.

export type Block =
  | { type: "answer"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "cta"; title: string; body: string }
  | { type: "faq"; items: FaqItem[]; heading?: string }
  | { type: "process"; steps: { name: string; text: string }[]; heading?: string }
  | { type: "stat"; text: string }; // quotable statistic callout (GEO bait)

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="richtext">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "answer":
            return <AnswerBlock key={i}>{b.text}</AnswerBlock>;
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "list":
            return (
              <ul key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "table":
            return (
              <figure key={i}>
                {b.caption && <figcaption>{b.caption}</figcaption>}
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
            );
          case "cta":
            return <CtaCard key={i} title={b.title} body={b.body} />;
          case "faq":
            return <Faq key={i} items={b.items} heading={b.heading} />;
          case "process":
            return (
              <section key={i} aria-label={b.heading || "Our Process"}>
                <h2>{b.heading || "Our Process"}</h2>
                <ol className="steps">
                  {b.steps.map((s, j) => (
                    <li key={j}>
                      <span className="step-n" aria-hidden="true">
                        {j + 1}
                      </span>
                      <div>
                        <strong>{s.name}</strong>
                        <p style={{ margin: "4px 0 0" }}>{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            );
          case "stat":
            return (
              <blockquote key={i} className="speakable">
                <p style={{ margin: 0 }}>{b.text}</p>
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/** Pillar content shape. */
export type PillarContent = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroAnswer: string;
  blocks: Block[];
  faqs: FaqItem[];
  processSteps: { name: string; text: string }[];
  areaServed: string[];
};
