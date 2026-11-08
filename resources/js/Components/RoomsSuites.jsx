import { Link } from "@inertiajs/react";
import { useState } from "react";

/**
 * "Our Projects" – expanding accordion cards (home page).
 * Kept the original file/component name so imports stay unchanged.
 */
export const PROJECTS = [
  {
    id: "bella",
    tag: "Luxury Resort",
    name: "Bella Maries Resorts",
    rail: "Bella Maries Resorts",
    url: "/bella-maris",
    image: "/images/new/design/project-bella.png",
    heading: "Bella Maris — Luxury, Lifestyle & Long-Term Value",
    text:
      "Bella Maris brings together elegant architecture, modern facilities, and premium hospitality. Designed for comfort and exceptional guest experiences, it offers an exclusive lifestyle for guests and owners. A destination built around quality, transparency, and long-term value.",
  },
  {
    id: "blue",
    tag: "Island Resort",
    name: "Blue Rain Resorts",
    rail: "Blue Rain Resorts",
    url: "/blue-rain-resorts",
    image: "/images/new/design/blue-rain-overview.png",
    heading: "Blue Rain — Island Serenity on Saint Martin's",
    text:
      "A peaceful island escape just moments from the beach and a short walk from the main jetty. Comfortable rooms, modern amenities and warm hospitality — with exclusive stay privileges for Bella Maris shareholders.",
  },
  {
    id: "lusai",
    tag: "Hill Resort",
    name: "Lusai Cottage Resorts",
    rail: "Lusai Cottage Resorts",
    url: "/lusai-cottage",
    image: "/images/new/design/lusai-overview.png",
    heading: "Lusai Cottage — Embrace the Hills of Sajek",
    text:
      "A refreshing mountain retreat surrounded by lush green hills, rolling clouds and breathtaking valley views. Perfect for families, couples and adventure lovers seeking a calm hilltop stay.",
  },
  {
    id: "raj",
    tag: "Restaurant",
    name: "Raj Darbar Highway Restaurant",
    rail: "Raj Darbar Highway Restaurant",
    url: "/raj-darbar-highway-restaurant",
    image: "/images/new/design/raj-darbar-overview.png",
    heading: "Raj Darbar — Great Dining, Exceptional Experiences",
    text:
      "A complete destination for dining, family gatherings and celebrations. A premium restaurant, modern community center and convenient highway location — food, comfort and community under one roof.",
  },
];

export const imgFallback = (e) => {
  const fallback = "/images/new/design/bella-overview.png";
  if (!e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback;
};

export default function RoomsSuites() {
  const [active, setActive] = useState(PROJECTS[0].id);

  return (
    <section className="dh-section dh-section--white">
      <div className="container">
        <div className="dh-center dh-head" data-aos="fade-up">
          <p className="dh-kicker">Our Projects</p>
          <h2 className="dh-title">
            One Vision, Multiple <br /> Destinations, Endless Possibilities
          </h2>
        </div>

        <div className="dh-projects" data-aos="fade-up">
          {PROJECTS.map((p) => {
            const isActive = active === p.id;
            return (
              <article
                key={p.id}
                className={`dh-project ${isActive ? "is-active" : ""}`}
                onClick={() => !isActive && setActive(p.id)}
              >
                <button
                  type="button"
                  className="dh-project__rail"
                  onClick={(e) => { e.stopPropagation(); setActive(p.id); }}
                  aria-expanded={isActive}
                  aria-label={`Show ${p.name}`}
                >
                  <span className="dh-project__arrow">→</span>
                  <span className="dh-project__railTitle">{p.rail}</span>
                </button>

                <div className="dh-project__body" aria-hidden={!isActive}>
                  <div className="dh-project__media">
                    <img src={p.image} alt={p.name} loading="lazy" onError={imgFallback} />
                  </div>
                  <div className="dh-project__content">
                    <h4>{p.heading}</h4>
                    <p>{p.text}</p>
                    <div className="dh-project__foot">
                      <span className="dh-project__tag">{p.tag}</span>
                      <h3>
                        <Link href={p.url} tabIndex={isActive ? 0 : -1}>{p.name}</Link>
                      </h3>
                    </div>
                  </div>
                  <Link href={p.url} className="dh-project__corner" aria-label={p.name} tabIndex={isActive ? 0 : -1}>
                    ↗
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
