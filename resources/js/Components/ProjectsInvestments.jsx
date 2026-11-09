import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import video1 from "../../../public/images/Videos/DHRL Video 1.mp4";
import video2 from "../../../public/images/Videos/DHRL Video 2.mp4";

const VIDEOS = [
  { id: "v1", src: video1, thumb: "/images/new/design/video-thumb-1.png", title: "Defender Hotels & Resorts" },
  { id: "v2", src: video2, thumb: "/images/new/design/video-thumb-2.png", title: "Bella Maris, Inani – Cox's Bazar" },
];

/** Fullscreen video modal (also used by other sections via named export). */
/** Returns { id, vertical } for YouTube links (watch, youtu.be, embed, shorts, live), else null. */
export function parseYouTube(url = "") {
  const m = String(url).match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? { id: m[1], vertical: /\/shorts\//.test(url) } : null;
}

export function VideoModal({ src, onClose }) {
  useEffect(() => {
    if (!src) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  if (!src) return null;
  const youTube = parseYouTube(src);

  return (
    <div className="dh-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="dh-modal__inner" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="dh-modal__close" onClick={onClose} aria-label="Close video">
          ×
        </button>
        {youTube ? (
          <div className={`dh-modal__yt ${youTube.vertical ? "is-vertical" : ""}`}>
            <iframe
              src={`https://www.youtube.com/embed/${youTube.id}?autoplay=1&rel=0`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video src={src} controls autoPlay playsInline />
        )}
      </div>
    </div>
  );
}

export default function ProjectsInvestments() {
  const [active, setActive] = useState(null);

  return (
    <section className="dh-section dh-section--pink">
      <div className="container">
        <div className="row align-items-center gy-5">
          {/* LEFT CONTENT */}
          <div className="col-lg-6" data-aos="fade">
            <p className="dh-kicker">Projects &amp; Investments</p>
            <h2 className="dh-title">
              Why Should You <br /> Invest in Defender <br className="d-none d-lg-block" /> Projects?
            </h2>
            <p className="dh-text">
              Invest in Defender Hotels &amp; Resorts Ltd., where hospitality meets investment
              opportunities. With a focus on ethical financial practices, transparent ownership, and
              quality development, we aim to create valuable opportunities in the growing tourism
              sector. Our commitment to integrity, professionalism, and investor confidence drives us
              toward a sustainable and prosperous future.
            </p>
            <div className="dh-actions">
              <Link href="/invest-now" className="dh-btn">
                Become an Investor
              </Link>
            </div>
          </div>

          {/* RIGHT VIDEOS */}
          <div className="col-lg-5 offset-lg-1" data-aos="fade">
            <div className="dh-video-cards">
              {VIDEOS.map((v, i) => (
                <button
                  type="button"
                  key={v.id}
                  className={`dh-video-card ${i === 1 ? "dh-video-card--offset" : ""}`}
                  onClick={() => setActive(v.src)}
                  aria-label={`Play video: ${v.title}`}
                >
                  <img src={v.thumb} alt={v.title} loading="lazy" />
                  <span className="dh-play" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <VideoModal src={active} onClose={() => setActive(null)} />
    </section>
  );
}
