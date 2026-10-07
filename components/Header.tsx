"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig, services } from "@/lib/site-config";
import { Icon } from "./icons";

/** Site header — v3: condenses with blur once scrolled. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">
        <Link className="logo" href="/" aria-label={`${siteConfig.brandName} home`}>
          <span className="logo-mark" aria-hidden="true">
            <Icon name="shield" />
          </span>
          MoldShield
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/services/">Services</Link>
          <Link href="/locations/">Locations</Link>
          <Link href="/process/">Our Process</Link>
          <Link href="/about/">About</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
        <a className="header-phone" href={siteConfig.phoneHref}>
          <Icon name="phone" />
          {siteConfig.phoneDisplay}
        </a>
      </div>
    </header>
  );
}

// Keep the old chrome.tsx import surface working for any page not yet
// converted (they will be converted). New code imports from ./Header.
export { Header as SiteHeader };
export const serviceLinks = services.map((s) => ({
  href: `/services/${s.slug}/`,
  label: s.name,
}));
