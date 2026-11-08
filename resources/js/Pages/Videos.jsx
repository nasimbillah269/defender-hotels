import MainLayout from "@/Layouts/MainLayout";
import HotelBookingForm from "@/Components/HotelBookingForm";
import { VideoModal, parseYouTube } from "@/Components/ProjectsInvestments";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import banner from "../../../public/images/new/header/header.png";

/**
 * Videos page (/videos).
 * Videos come from Admin > Videos (title, YouTube link, thumbnail).
 */
const thumbFor = (v) => {
  const yt = parseYouTube(v.url);
  if (v.thumb && !/noimage\.jpg$/i.test(v.thumb)) return v.thumb;
  return yt ? `https://img.youtube.com/vi/${yt.id}/hqdefault.jpg` : v.thumb;
};

export default function Videos({
  general,
  headerMenu,
  footerMenu2,
  footerMenu3,
  footerMenu4,
  page,
  videos = [],
  auth,
  servicesList,
}) {
  const [playing, setPlaying] = useState(null);

  return (
    <MainLayout
      auth={auth}
      general={general}
      headerMenu={headerMenu}
      footerMenu2={footerMenu2}
      footerMenu3={footerMenu3}
      footerMenu4={footerMenu4}
    >
      <Head title={`${page?.name || "Videos"} | Defender Hotels & Resorts`} />

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
            <h1 className="mt-4">{page?.name || "Videos"}</h1>
          </div>
        </div>
      </div>

      <section className="dh-section dh-section--blue">
        <div className="container">
          <div className="dh-head" data-aos="fade-up">
            <p className="dh-kicker">Videos</p>
            <h2 className="dh-title">
              Watch Our Vision, <br /> Experience Our Journey.
            </h2>
            <p className="dh-text">
              Explore our projects, developments, and hospitality experiences through engaging
              videos. Discover our vision, investment opportunities, and the journey behind Defender
              Hotels &amp; Resorts.
            </p>
          </div>

          {videos.length > 0 ? (
            <div className="dh-video-grid">
              {videos.map((v, i) => (
                <button
                  type="button"
                  key={v.id}
                  className="dh-video-card"
                  data-aos="fade-up"
                  data-aos-delay={(i % 4) * 60}
                  onClick={() => setPlaying(v.url)}
                  aria-label={`Play video: ${v.title}`}
                  title={v.title}
                >
                  <img src={thumbFor(v)} alt={v.title} loading="lazy" />
                  <span className="dh-play" />
                </button>
              ))}
            </div>
          ) : (
            <p className="dh-text dh-center">No videos published yet. Please check back soon.</p>
          )}
        </div>
      </section>

      <HotelBookingForm servicesList={servicesList} />
      <VideoModal src={playing} onClose={() => setPlaying(null)} />
    </MainLayout>
  );
}
