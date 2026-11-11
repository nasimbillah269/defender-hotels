import { useEffect, useRef, useState } from "react";
import { VideoModal } from "./ProjectsInvestments";

/**
 * "Investor Video Review" (home page, below Testimonials):
 * one large card on the left, two smaller cards stacked on the right —
 * cards show the video thumbnail (dark card when none is set) with a centred play button;
 * a click opens the video in the modal.
 */
const VIDEOS = [
  { url: "https://www.facebook.com/reel/25156266930706825", orientation: "landscape", title: "Investor video review", thumb: null, posterEmbed: true },
  { url: "https://www.facebook.com/reel/2077778969516520", orientation: "portrait", title: "Investor review — Defender Hotels & Resorts", thumb: "/images/new/investor-videos/client-trust-guests.jpg" },
  { url: "https://www.youtube.com/shorts/XST-VWp64OE", orientation: "portrait", title: "Investor review", thumb: "/images/new/investor-videos/XST-VWp64OE.jpg" },
];

/**
 * Facebook's player rendered at its native 1280×720 and scaled to cover the card, so its own
 * play icon sits exactly in the centre — under our play button, which covers it.
 */
const POSTER_W = 1280;
const POSTER_H = 720;

function FacebookPoster({ url }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const fit = () => setScale(Math.max(box.clientWidth / POSTER_W, box.clientHeight / POSTER_H));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <span ref={boxRef} className="dh-ivr__posterBox" aria-hidden="true">
      {scale > 0 && (
        <iframe
          className="dh-ivr__poster"
          src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=${POSTER_W}&height=${POSTER_H}`}
          title=""
          tabIndex={-1}
          loading="lazy"
          width={POSTER_W}
          height={POSTER_H}
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        />
      )}
    </span>
  );
}

function VideoCard({ video, className, onPlay }) {
  return (
    <button
      type="button"
      className={`dh-ivr__card ${className}`}
      onClick={() => onPlay(video)}
      aria-label={`Play video: ${video.title}`}
    >
      {video.thumb && <img className="dh-ivr__thumb" src={video.thumb} alt="" loading="lazy" />}
      {/* no local image: show Facebook's own cover frame (non-interactive; the card handles the click) */}
      {!video.thumb && video.posterEmbed && <FacebookPoster url={video.url} />}
      <span className="dh-play" aria-hidden="true" />
    </button>
  );
}

export default function InvestorVideos() {
  const [playing, setPlaying] = useState(null);
  const [featured, ...side] = VIDEOS;

  return (
    <section className="dh-section dh-section--pink dh-ivr">
      <div className="container">
        <div className="dh-center dh-head" data-aos="fade">
          <p className="dh-kicker">Investor Video Review</p>
          <h2 className="dh-title">
            Hear from Our Investors About <br className="d-none d-md-block" /> Their Experiences
          </h2>
        </div>

        <div className="dh-ivr__grid" data-aos="fade">
          <VideoCard video={featured} className="dh-ivr__card--main" onPlay={setPlaying} />
          <div className="dh-ivr__side">
            {side.map((v) => (
              <VideoCard key={v.url} video={v} className="dh-ivr__card--small" onPlay={setPlaying} />
            ))}
          </div>
        </div>
      </div>

      <VideoModal src={playing?.url} orientation={playing?.orientation} onClose={() => setPlaying(null)} />
    </section>
  );
}
