import { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import video1 from "../../../public/images/Videos/DHRL Video 1.mp4";
import video2 from "../../../public/images/Videos/DHRL Video 2.mp4";
import { imgFallback } from "./RoomsSuites";
import { parseYouTube } from "./ProjectsInvestments";

/**
 * Project media sections shared by the project pages
 * (Bella Maris, Blue Rain Resorts, Lusai Cottage, Raj Darbar).
 *
 *  - default export  VideoPalyer  → "Video Gallery" section
 *  - named export    ImageGallery → "Image Gallery" section (optional 3D / Floor Plan tabs)
 */

export const PROJECT_VIDEOS = [
  {
    id: "v1",
    src: video1,
    thumb: "/images/new/design/video-thumb-1.png",
    title: "Bella Maris — Where Luxury Meets Timeless Value",
    text: "A vision of modern luxury combining elegant architecture, premium hospitality and exceptional lifestyle experiences.",
  },
  {
    id: "v2",
    src: video2,
    thumb: "/images/new/design/video-thumb-2.png",
    title: "Bella Maris — Inani, Cox's Bazar",
    text: "Every aspect of the project reflects a commitment to comfort, quality and long-term value.",
  },
];

/** Playlist needs at least this many cards to fill the column beside the player. */
const MIN_PLAYLIST = 4;

export default function VideoPalyer({ videos: source = PROJECT_VIDEOS, background = "blue" }) {
  // too few videos → repeat them (with unique ids) so the playlist has no empty space
  const videos = useMemo(() => {
    if (!source.length || source.length >= MIN_PLAYLIST) return source;
    return Array.from({ length: MIN_PLAYLIST }, (_, i) => ({
      ...source[i % source.length],
      id: `${source[i % source.length].id}-${i}`,
    }));
  }, [source]);
  const [activeId, setActiveId] = useState(videos[0]?.id);
  const active = videos.find((v) => v.id === activeId) ?? videos[0];
  if (!active) return null;
  const youTube = parseYouTube(active.src);

  return (
    <section className={`dh-section dh-section--${background}`}>
      <div className="container">
        <div className="dh-center dh-head" data-aos="fade">
          <p className="dh-kicker">Video Gallery</p>
          <h2 className="dh-title dh-title--sm">Bringing Our Projects &amp; Experiences to Life.</h2>
        </div>

        <div className="dh-vg" data-aos="fade">
          <div className="dh-vg__main">
            {youTube ? (
              <iframe
                key={active.id}
                src={`https://www.youtube.com/embed/${youTube.id}?rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video key={active.id} src={active.src} poster={active.thumb} controls playsInline preload="metadata" />
            )}
          </div>

          <div className="dh-vg__list">
            {videos.map((v) => (
              <button
                type="button"
                key={v.id}
                className={`dh-vg__item ${v.id === active.id ? "is-active" : ""}`}
                onClick={() => setActiveId(v.id)}
                aria-pressed={v.id === active.id}
              >
                <img className="dh-vg__thumb" src={v.thumb} alt="" loading="lazy" onError={imgFallback} />
                <span>
                  <h6>{v.title}</h6>
                  <p>{v.text}</p>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ImageGallery
 * @param sets  { photos: string[], plans?: string[] }  – when `plans` is given,
 *              "3D Photo Gallery" / "Floor Plans" tabs are shown.
 */
export function ImageGallery({ photos = [], recent, plans, background = "pink", alt = "Project" }) {
  // "3D Photo" and "Floor Plan" tabs are always shown (an empty one shows a "coming soon" note);
  // "Recent Image" appears only when images are supplied
  const sets = useMemo(() => {
    const list = (v) => (Array.isArray(v) ? v : []);
    return [
      { key: "photos", label: ["3D", "Photo"], images: list(photos) },
      { key: "recent", label: ["Recent", "Image"], images: list(recent), optional: true },
      { key: "plans", label: ["Floor", "Plan"], images: list(plans) },
    ].filter((s) => !s.optional || s.images.length > 0);
  }, [photos, recent, plans]);
  const tabThumb = (s) => s.images[0] ?? sets.find((x) => x.images.length)?.images[0];
  const [tab, setTab] = useState(sets[0]?.key);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const current = sets.find((s) => s.key === tab) ?? sets[0];
  if (!sets.some((s) => s.images.length)) return null;

  const images = current.images;
  const hasTabs = sets.length > 1;
  const many = images.length > 1;

  return (
    <section className={`dh-section dh-section--${background}`}>
      <div className="container">
        <div className="dh-gallery-panel" data-aos="fade">
        <h2 className="dh-gallery-panel__title">Photo Gallery</h2>

        <div className={`dh-gallery ${hasTabs ? "" : "dh-gallery--single"}`}>
          {hasTabs && (
            <div className="dh-gallery__tabs" role="tablist">
              {sets.map((s) => (
                <button
                  type="button"
                  role="tab"
                  key={s.key}
                  aria-selected={s.key === current.key}
                  className={`dh-gallery__tab ${s.key === current.key ? "is-active" : ""}`}
                  onClick={() => setTab(s.key)}
                >
                  <span className="dh-gallery__tabIcon">
                    <img src={tabThumb(s)} alt="" loading="lazy" onError={imgFallback} />
                  </span>
                  <span className="dh-gallery__tabLabel">
                    {s.label[0]} <br /> {s.label[1]}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* carousel: active image large, next one peeks (blurred) on the right */}
          {images.length === 0 ? (
            <div className="dh-gallery__main dh-gallery__empty">
              <p className="dh-gallery__emptyTitle">{current.label.join(" ")}s coming soon</p>
              <p className="dh-gallery__emptyText">
                Contact us for the latest {current.label.join(" ").toLowerCase()}s of {alt}.
              </p>
              <a href="#consultation" className="dh-btn">Request Details</a>
            </div>
          ) : (
          <div className="dh-gallery__main dh-gallery__carousel">
            <Swiper
              key={current.key}
              modules={[Navigation, EffectCreative]}
              effect="creative"
              loop={images.length > 3}
              rewind={images.length <= 3}
              speed={900}
              grabCursor
              slideToClickedSlide
              watchSlidesProgress
              creativeEffect={{
                limitProgress: 2,
                // images behind the active one: stacked to the right, smaller, slightly faded
                next: { translate: ["24%", 0, -120], scale: 0.84, opacity: 0.95 },
                // the outgoing image slides off to the left and fades
                prev: { translate: ["-115%", 0, -200], scale: 0.9, opacity: 0 },
              }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onBeforeInit={(sw) => {
                // nav buttons live outside <Swiper>; bind this instance to its own buttons
                sw.params.navigation.prevEl = prevRef.current;
                sw.params.navigation.nextEl = nextRef.current;
              }}
            >
              {images.map((src, i) => (
                <SwiperSlide key={`${current.key}-${i}`}>
                  <img src={src} alt={`${alt} gallery image ${i + 1}`} loading="lazy" onError={imgFallback} />
                </SwiperSlide>
              ))}
            </Swiper>
            {many && (
              <>
                <button ref={prevRef} type="button" className="dh-gallery__nav dh-gallery__nav--prev" aria-label="Previous image">&lt;</button>
                <button ref={nextRef} type="button" className="dh-gallery__nav dh-gallery__nav--next" aria-label="Next image">&gt;</button>
              </>
            )}
          </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
