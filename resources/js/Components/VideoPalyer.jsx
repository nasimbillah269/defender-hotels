import { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import video1 from "../../../public/images/Videos/DHRL Video 1.mp4";
import video2 from "../../../public/images/Videos/DHRL Video 2.mp4";
import { imgFallback } from "./RoomsSuites";

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

export default function VideoPalyer({ videos = PROJECT_VIDEOS, background = "blue" }) {
  const [activeId, setActiveId] = useState(videos[0]?.id);
  const active = videos.find((v) => v.id === activeId) ?? videos[0];
  if (!active) return null;

  return (
    <section className={`dh-section dh-section--${background}`}>
      <div className="container">
        <div className="dh-center dh-head" data-aos="fade">
          <p className="dh-kicker">Video Gallery</p>
          <h2 className="dh-title dh-title--sm">Bringing Our Projects &amp; Experiences to Life.</h2>
        </div>

        <div className="dh-vg" data-aos="fade">
          <div className="dh-vg__main">
            <video key={active.id} src={active.src} poster={active.thumb} controls playsInline preload="metadata" />
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
                <img className="dh-vg__thumb" src={v.thumb} alt="" loading="lazy" />
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
export function ImageGallery({ photos = [], plans, background = "pink", alt = "Project" }) {
  const hasTabs = Array.isArray(plans) && plans.length > 0;
  const [tab, setTab] = useState(hasTabs ? "plans" : "photos");
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const images = useMemo(() => (tab === "plans" ? plans : photos) ?? [], [tab, plans, photos]);
  if (!images.length) return null;

  const switchTab = (t) => setTab(t);
  const many = images.length > 1;

  return (
    <section className={`dh-section dh-section--${background}`}>
      <div className="container">
        <div className="dh-center dh-head" data-aos="fade">
          <p className="dh-kicker">Image Gallery</p>
          <h2 className="dh-title dh-title--sm">Explore Our World Through Every Frame.</h2>
        </div>

        <div className={`dh-gallery ${hasTabs ? "" : "dh-gallery--single"}`} data-aos="fade">
          {/* carousel: active image large, next one peeks (blurred) on the right */}
          <div className="dh-gallery__main dh-gallery__carousel">
            <Swiper
              key={tab}
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
                <SwiperSlide key={`${tab}-${i}`}>
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

          {hasTabs && (
            <div className="dh-gallery__tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "photos"}
                className={`dh-gallery__tab ${tab === "photos" ? "is-active" : ""}`}
                onClick={() => switchTab("photos")}
              >
                3D Photo <br /> Gallery
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "plans"}
                className={`dh-gallery__tab ${tab === "plans" ? "is-active" : ""}`}
                onClick={() => switchTab("plans")}
              >
                Floor <br /> Plans
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
