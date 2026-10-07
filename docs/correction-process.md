# Correction Process (internal)

How accuracy changes get logged on the public `/corrections/` page.

## Who can log a correction

- Any human editor or reviewer working on the site (nabil, content editors, technical reviewers).
- Groq / AI pipeline output can FLAG a suspected error, but only a human confirms and logs it. AI never writes corrections alone.

## When to log

Log a correction when a published page changes for **accuracy** — a wrong
number, an outdated EPA/CDC guideline, a misleading health claim, a pricing
range that no longer holds. Cosmetic edits (typo fixes, layout tweaks,
rewrites that don't change meaning) do NOT go in the log.

## Required fields

Every entry in `app/corrections/page.tsx` `CORRECTIONS` must have:

| Field       | What                                    |
|-------------|-----------------------------------------|
| `date`      | Date the correction was published (YYYY-MM-DD) |
| `page`      | Human-readable page name                |
| `pageHref`  | Canonical URL path of the corrected page |
| `whatChanged`| Exactly what was changed (old → new)   |
| `why`       | Why the old version was wrong (source cited) |
| `reviewer`  | Who verified the correction (name or role) |

## Rules

1. **Append-only.** Never edit or delete an existing entry. If a correction
   itself turns out wrong, add a NEW entry referencing the old one.
2. **No invented history.** An honest empty log beats a padded one. The
   `CORRECTIONS` array starts empty and stays empty until a real correction
   happens.
3. **Source the fix.** Every correction must cite the primary source that
   proves the new version right — EPA, CDC, IICRC S520, or equivalent. If it
   can't be sourced, the correction doesn't ship.
4. **Date stamp the page.** The corrected page's content should reflect the
   new information; the log entry is the public audit trail.

## Review standard (public-facing)

Claims are checked against EPA mold guidance (EPA's mold remediation
guidelines), CDC mold information, and IICRC S520 where process claims are
involved. Secondary sources (news, forums, other blogs) are never treated
as authorities. Claims that can't be traced to a primary source don't ship.
