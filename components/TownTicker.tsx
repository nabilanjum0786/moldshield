import locations from "@/data/locations.json";

/**
 * Town ticker marquee (from stitch-v2/v3) — Dayton metro towns,
 * duplicated for a seamless infinite loop. Pauses on hover.
 */
export function TownTicker() {
  const towns: string[] = [
    locations.city.name,
    ...(locations.towns as { name: string }[]).map((t) => t.name),
  ];
  const loop = [...towns, ...towns];
  return (
    <div className="town-marquee" aria-label="Areas we serve">
      <div className="marquee-track" aria-hidden="true">
        {loop.map((town, i) => (
          <span key={`${town}-${i}`}>
            {town} <b>•</b>
          </span>
        ))}
      </div>
      <span className="sr-only">Areas we serve: {towns.join(", ")}</span>
    </div>
  );
}
