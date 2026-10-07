import type { PillarContent } from "../blocks";
import { atticMoldRemoval } from "./attic-mold-removal";
import { moldInspectionTesting } from "./mold-inspection-testing";
import { blackMoldRemoval } from "./black-mold-removal";
import { crawlSpaceMoldRemediation } from "./crawl-space-mold-remediation";
import { basementMoldRemoval } from "./basement-mold-removal";

/** Registry of finished pillars. Add new pillars here as they're written —
 *  generateStaticParams only builds routes for registered content. */
export const pillars: Record<string, PillarContent> = {
  "attic-mold-removal": atticMoldRemoval,
  "mold-inspection-testing": moldInspectionTesting,
  "black-mold-removal": blackMoldRemoval,
  "crawl-space-mold-remediation": crawlSpaceMoldRemediation,
  "basement-mold-removal": basementMoldRemoval,
};
