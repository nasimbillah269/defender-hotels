import MainLayout from "@/Layouts/MainLayout";
import HotelBookingForm from "@/Components/HotelBookingForm";
import { Head } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import banner from "../../../public/images/new/header/header.png";

/**
 * Gallery page – any page using the "Galleries" template.
 * Shows the images of the galleries selected for the page in Admin > Pages.
 * Images are managed in Admin > Galleries.
 */
export default function Gallery({
  general,
  headerMenu,
  footerMenu2,
  footerMenu3,
  footerMenu4,
  page,
  galleries = [],
  auth,
  servicesList,
}) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null); // index in `visible`

  const visible = useMemo(() => {
    const list = filter === "all" ? galleries : galleries.filter((g) => g.id === filter);
    return list.flatMap((g) => g.images.map((img) => ({ ...img, gallery: g.name })));
  }, [galleries, filter]);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (step) => setOpen((i) => (i === null ? i : (i + step + visible.length) % visible.length)),
    [visible.length]
  );

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  const current = open !== null ? visible[open] : null;

  return (
    <MainLayout
      auth={auth}
      general={general}
      headerMenu={headerMenu}
      footerMenu2={footerMenu2}
      footerMenu3={footerMenu3}
      footerMenu4={footerMenu4}
    >
      <Head title={`${page?.name || "Gallery"} | Defender Hotels & Resorts`} />

      <div className="pageBanner">
        <div
          className="bgImg"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            padding: "100px 0px",
          }}
        >
          <div className="container">
            <h1 className="mt-4">{page?.name || "Gallery"}</h1>
          </div>
        </div>
      </div>

      <section className="dh-section dh-section--blue">
        <div className="container">
          <div className="dh-head" data-aos="fade-up">
            <p className="dh-kicker">Image Gallery</p>
            <h2 className="dh-title">
              Explore Our World <br /> Through Every Frame.
            </h2>
            {page?.short_description && <p className="dh-text">{page.short_description}</p>}
          </div>

          {galleries.length > 1 && (
            <div className="dh-gfilter" role="tablist">
              <button
                type="button"
                className={filter === "all" ? "is-active" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              {galleries.map((g) => (
                <button
                  type="button"
                  key={g.id}
                  className={filter === g.id ? "is-active" : ""}
                  onClick={() => setFilter(g.id)}
                >
                  {g.name}
                </button>
              ))}
            </div>
          )}

          {visible.length > 0 ? (
            <div className="dh-ggrid">
              {visible.map((img, i) => (
                <button
                  type="button"
                  key={img.id}
                  className="dh-ggrid__item"
                  onClick={() => setOpen(i)}
                  aria-label={`Open image: ${img.title || img.gallery}`}
                  data-aos="fade-up"
                  data-aos-delay={(i % 4) * 60}
                >
                  <img src={img.url} alt={img.title || img.gallery} loading="lazy" />
                  <span className="dh-ggrid__zoom" aria-hidden="true">+</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="dh-text dh-center">No images published yet. Please check back soon.</p>
          )}
        </div>
      </section>

      {current && (
        <div className="dh-lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button type="button" className="dh-lightbox__close" onClick={close} aria-label="Close">
            ×
          </button>
          {visible.length > 1 && (
            <button
              type="button"
              className="dh-lightbox__nav dh-lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous image"
            >
              ‹
            </button>
          )}
          <figure className="dh-lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={current.url} alt={current.title || current.gallery} />
            <figcaption>
              {current.title && <strong>{current.title}</strong>}
              <span>
                {open + 1} / {visible.length}
              </span>
            </figcaption>
          </figure>
          {visible.length > 1 && (
            <button
              type="button"
              className="dh-lightbox__nav dh-lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next image"
            >
              ›
            </button>
          )}
        </div>
      )}

      <HotelBookingForm servicesList={servicesList} />
    </MainLayout>
  );
}
