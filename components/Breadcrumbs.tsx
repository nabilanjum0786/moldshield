import Link from "next/link";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; href?: string };

/** Visible breadcrumb trail + BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const urlItems = items.map((c) => ({
    name: c.name,
    url: c.href ?? "",
  }));
  return (
    <>
      <JsonLd data={breadcrumbSchema(urlItems.filter((i) => i.url))} />
      <div className="wrap">
        <nav className="crumb" aria-label="Breadcrumb">
          {items.map((c, i) => (
            <span key={i} style={{ display: "contents" }}>
              {i > 0 && (
                <span className="sep" aria-hidden="true">
                  ›
                </span>
              )}
              {c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            </span>
          ))}
        </nav>
      </div>
    </>
  );
}
