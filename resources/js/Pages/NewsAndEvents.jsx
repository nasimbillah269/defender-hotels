import MainLayout from "@/Layouts/MainLayout";
import BlogGrid from "@/Components/BlogGrid";
import HotelBookingForm from "@/Components/HotelBookingForm";
import Pagination from "@/Components/Pagination";
import { PROJECT_VIDEOS } from "@/Components/VideoPalyer";
import { VideoModal } from "@/Components/ProjectsInvestments";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import banner from "../../../public/images/new/header/header.png";

/**
 * "Latest Blog" page template – used for the Journal pages.
 * Layout is chosen from the page slug:
 *   slug contains "video" → Videos grid
 *   slug contains "blog"  → Blog cards
 *   otherwise             → News & Events posters
 */
const MODES = {
  news: {
    kicker: "News & Events",
    title: ["Stay Connected,", "Be Part of Our Journey."],
    text:
      "Discover the latest news, company updates, project milestones, and upcoming events from Defender Hotels & Resorts. Stay informed about our achievements, developments, and exciting moments as we continue shaping the future of hospitality.",
  },
  blog: {
    kicker: "Hotels & Resorts Blogs",
    title: ["Insights, Ideas & Inspiration", "for Better Investments."],
    text:
      "Explore the latest insights on hospitality, tourism, lifestyle, and investment opportunities. Stay informed with expert perspectives, industry trends, and updates from Defender Hotels & Resorts.",
  },
  video: {
    kicker: "Videos",
    title: ["Watch Our Vision,", "Experience Our Journey."],
    text:
      "Explore our projects, developments, and hospitality experiences through engaging videos. Discover our vision, investment opportunities, and the journey behind Defender Hotels & Resorts.",
  },
};

const detectMode = (page) => {
  const key = `${page?.slug ?? ""} ${page?.name ?? ""}`.toLowerCase();
  if (key.includes("video")) return "video";
  if (key.includes("blog")) return "blog";
  return "news";
};

export default function NewsAndEvents({
  general,
  headerMenu,
  footerMenu2,
  footerMenu3,
  footerMenu4,
  page,
  posts,
  auth,
  servicesList,
}) {
  const mode = detectMode(page);
  const copy = MODES[mode];
  const items = posts?.data ?? [];
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
      <Head title={`${page?.name || copy.kicker} | Defender Hotels & Resorts`} />

      {/* Banner (unchanged) */}
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
            <h1 className="mt-4">{page?.name}</h1>
          </div>
        </div>
      </div>

      <section className="dh-section dh-section--blue">
        <div className="container">
          <div className="dh-head" data-aos="fade">
            <p className="dh-kicker">{copy.kicker}</p>
            <h2 className="dh-title">
              {copy.title[0]} <br /> {copy.title[1]}
            </h2>
            <p className="dh-text">{copy.text}</p>
          </div>

          {mode === "video" ? (
            <div className="dh-video-grid">
              {PROJECT_VIDEOS.map((v, i) => (
                <button
                  type="button"
                  key={v.id}
                  className="dh-video-card"
                  data-aos="fade"
                  data-aos-delay={i * 60}
                  onClick={() => setPlaying(v.src)}
                  aria-label={`Play video: ${v.title}`}
                >
                  <img src={v.thumb} alt={v.title} loading="lazy" />
                  <span className="dh-play" />
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="row g-4 gy-5 dh-blog-grid">
                {items.map((post, index) => (
                  <div
                    key={post.id ?? post.slug ?? index}
                    className="col-sm-6 col-lg-4"
                    data-aos="fade"
                    data-aos-delay={(index % 3) * 80}
                  >
                    <BlogGrid post={post} variant={mode === "news" ? "news" : "blog"} />
                  </div>
                ))}
              </div>
              {items.length === 0 && (
                <p className="dh-text dh-center">No posts published yet. Please check back soon.</p>
              )}
              {posts?.links && (
                <div className="mt-5">
                  <Pagination pagination={posts} />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <HotelBookingForm servicesList={servicesList} />
      <VideoModal src={playing} onClose={() => setPlaying(null)} />
    </MainLayout>
  );
}
