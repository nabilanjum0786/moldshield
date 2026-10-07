import Link from "next/link";
import { Icon } from "./icons";
import { Carousel } from "./Carousel";
import { listStates, listCities, listTowns } from "@/data";
import { services } from "@/lib/site-config";

/**
 * Homepage location sections (§12–14) — fully data-driven from the
 * data layer. States and cities render as carousels (all slides in
 * the DOM — SEO guard); towns render as pills.
 */
export function StatesCarousel() {
  const states = listStates();
  const serviceNames = services.map((s) => s.shortName).join(" · ");
  return (
    <section className="block" aria-labelledby="states-h">
      <div className="wrap">
        <span className="eyebrow reveal">Where We Serve</span>
        <h2 id="states-h" className="reveal">
          States We Serve
        </h2>
        <p className="lede reveal">
          Every live state is rendered below — no hidden slides. More states
          unlock as coverage expands.
        </p>
        <Carousel label="States carousel">
          {states.map((s) => (
            <div key={s.slug} className="card slide">
              <h3>{s.name}</h3>
              <p>{serviceNames}</p>
              <Link className="more" href={`/${s.slug}/`}>
                {s.name} mold remediation
                <Icon name="arrow" />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export function CitiesCarousel() {
  const cities: { state: string; slug: string; name: string }[] = [];
  for (const st of listStates()) {
    for (const c of listCities(st.slug)) {
      cities.push({ state: st.slug, slug: c.slug, name: c.name });
    }
  }
  return (
    <section className="block alt" aria-labelledby="cities-h">
      <div className="wrap">
        <span className="eyebrow reveal">Top Cities</span>
        <h2 id="cities-h" className="reveal">
          Cities We&apos;re Known In
        </h2>
        <p className="lede reveal">
          <strong>Earned, not given:</strong> cities enter this list by ranking
          performance. Dayton seeds the list at launch.
        </p>
        <Carousel label="Top cities carousel">
          {cities.map((c) => (
            <div key={`${c.state}-${c.slug}`} className="card slide">
              <h3>
                {c.name}, {c.state === "ohio" ? "OH" : c.state.toUpperCase()}
              </h3>
              <p>Miami Valley&apos;s mold remediation hub — all 5 services.</p>
              <Link className="more" href={`/${c.state}/${c.slug}/`}>
                Mold remediation in {c.name}
                <Icon name="arrow" />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export function TownsPills() {
  const towns: { state: string; city: string; slug: string; name: string }[] = [];
  for (const st of listStates()) {
    for (const c of listCities(st.slug)) {
      for (const t of listTowns(st.slug, c.slug)) {
        towns.push({ state: st.slug, city: c.slug, slug: t.slug, name: t.name });
      }
    }
  }
  const hubCity = towns[0]?.city ?? "";
  const hubName =
    listCities(towns[0]?.state ?? "")[0]?.name ?? "the metro";
  return (
    <section className="block" aria-labelledby="towns-h">
      <div className="wrap">
        <span className="eyebrow reveal">Nearby Towns</span>
        <h2 id="towns-h" className="reveal">
          Serving the Miami Valley
        </h2>
        <p className="lede reveal">
          Big-population towns around {hubName}. Selection starts by
          population, then by performance.
        </p>
        <div className="reveal" style={{ marginTop: 20 }}>
          {towns.map((t) => (
            <Link
              key={t.slug}
              className="pill"
              href={`/${t.state}/${t.city}/${t.slug}/`}
            >
              {t.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
