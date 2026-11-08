import MainLayout from "@/Layouts/MainLayout";
import HotelBookingForm from "@/Components/HotelBookingForm";
import VideoPalyer, { ImageGallery } from "@/Components/VideoPalyer";
import { Head, Link } from "@inertiajs/react";
import { FiFileText, FiMapPin } from "react-icons/fi";
import banner from "../../../public/images/new/header/header.png";

const OWNERSHIP = [
  { name: "Premium Suite", size: "1100 sft" },
  { name: "Luxury Suite", size: "1800 & 1100 sft" },
  { name: "Deluxe Suite", size: "1800 sft" },
  { name: "Triplex Villa", size: "1730 sft" },
  { name: "Luxury Villa", size: "1930 sft" },
  { name: "Presidential Villa", size: "4500 sft" },
];

const PHOTOS = [
  "/images/new/design/bella-overview.png",
  "/images/img/DHRL Bella Maris_00007.jpg",
  "/images/img/DHRL Bella Maris_00004.jpg",
  "/images/img/DHRL Bella Maris_00005.jpg",
  "/images/new/design/bella-ownership.png",
];
const PLANS = ["/images/new/design/bella-masterplan.png", "/images/new/over.webp"];

export default function BellaMaris({
  general,
  headerMenu,
  footerMenu2,
  footerMenu3,
  footerMenu4,
  servicesList,
  auth,
}) {
  return (
    <>
      <Head title="Bella Maris | Defender Hotels & Resorts Ltd.">
        <meta
          name="description"
          content="Discover Bella Maris by Defender Hotels & Resorts Ltd. Explore project overview, ownership categories, gallery and videos — designed for premium lifestyle and long-term value."
        />
      </Head>

      <MainLayout
        auth={auth}
        general={general}
        headerMenu={headerMenu}
        footerMenu2={footerMenu2}
        footerMenu3={footerMenu3}
        footerMenu4={footerMenu4}
      >
        {/* Banner (unchanged) */}
        <div className="pageBanner">
          <div
            className="bgImg"
            style={{
              backgroundImage: `url(${banner})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "110px 0px",
            }}
          >
            <div className="container">
              <h1 className="mt-4">Bella Maris</h1>
              <h5 align="center">A premium hospitality destination by Defender Hotels &amp; Resorts Ltd.</h5>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <section className="dh-section dh-section--pink">
          <div className="container">
            <div className="row align-items-center gy-5">
              <div className="col-lg-6" data-aos="fade-right">
                <p className="dh-kicker">Project Overview</p>
                <h2 className="dh-title dh-title--sm">
                  Bella Maris — Where Luxury <br className="d-none d-xl-block" /> Meets Timeless Value.
                </h2>
                <p className="dh-text">
                  Bella Maris represents a vision of modern luxury, combining elegant architecture,
                  premium hospitality, and exceptional lifestyle experiences. Designed with attention
                  to detail, every aspect of the project reflects a commitment to comfort, quality,
                  and long-term value.
                </p>
                <p className="dh-text">
                  From contemporary architectural design and world-class facilities to thoughtfully
                  planned guest experiences, Bella Maris aims to create a destination where luxury
                  meets convenience. With a focus on transparent ownership, quality development, and
                  sustainable growth, the project offers an opportunity to experience the benefits of
                  premium hospitality while building a connection with a promising investment
                  destination.
                </p>
                <div className="dh-actions">
                  <Link href="/invest-now" className="dh-btn">Become an Investor</Link>
                  <div className="dh-icon-box">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Inani+Beach+Cox%27s+Bazar"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View location on map"
                      title="Location"
                    >
                      <FiMapPin />
                    </a>
                    <a href="#consultation" aria-label="Request brochure" title="Request brochure">
                      <FiFileText />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6" data-aos="fade-left">
                <img
                  className="dh-img dh-img--shadow"
                  src="/images/new/design/bella-overview.png"
                  alt="Bella Maris tower at sunset"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category of Ownership */}
        <section className="dh-section dh-section--blue">
          <div className="container">
            <div className="dh-center dh-head" data-aos="fade-up">
              <p className="dh-kicker">Category of Ownership</p>
              <h2 className="dh-title dh-title--sm">Your Ownership, Your Lifestyle, Your Future.</h2>
            </div>
            <div className="row align-items-center gy-4">
              <div className="col-lg-7" data-aos="fade-right">
                <img
                  className="dh-img"
                  src="/images/new/design/bella-ownership.png"
                  alt="Bella Maris rooftop lounge"
                  loading="lazy"
                />
              </div>
              <div className="col-lg-5" data-aos="fade-left">
                <div className="dh-pills">
                  {OWNERSHIP.map((o) => (
                    <div className="dh-pill" key={o.name}>
                      <div className="dh-pill__top">{o.name}</div>
                      <div className="dh-pill__bottom">{o.size}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ImageGallery photos={PHOTOS} plans={PLANS} alt="Bella Maris" background="pink" />
        <VideoPalyer background="blue" />

        <HotelBookingForm servicesList={servicesList} />
      </MainLayout>
    </>
  );
}
