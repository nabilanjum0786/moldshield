import type { MetadataRoute } from "next";
import { siteConfig, services } from "@/lib/site-config";

/** Block preview deployments from indexing until the real domain is attached. */
export default function robots(): MetadataRoute.Robots {
  if (siteConfig.noindexPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
