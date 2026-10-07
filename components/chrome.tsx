// chrome.tsx — replaced by components/Header.tsx + components/Footer.tsx.
// This shim keeps the old import surface working during the migration.
export { Header, SiteHeader, serviceLinks } from "./Header";
export { Footer, MobileCallBar } from "./Footer";
// Old name for the sticky mobile call bar.
export { MobileCallBar as StickyCallBar } from "./Footer";
