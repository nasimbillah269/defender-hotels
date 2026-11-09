import MainLayout from "@/Layouts/MainLayout";
import HotelBookingForm from "@/Components/HotelBookingForm";
import VideoPalyer, { ImageGallery } from "@/Components/VideoPalyer";
import { imgFallback } from "@/Components/RoomsSuites";
import { Head, Link, usePage } from "@inertiajs/react";
import { FiFileText, FiMapPin, FiPhoneCall } from "react-icons/fi";
import banner from "../../../public/images/new/header/header.png";

/**
 * "Blue Rain Resorts" page template.
 * The same template also powers Lusai Cottage and Raj Darbar Highway Restaurant:
 * create a page in admin with template "Blue Rain Resorts" and a slug containing
 * "lusai" or "raj-darbar" and the matching content below is shown.
 */
const PROJECTS = {
  blue: {
    title: "Blue Rain Resorts",
    metaTitle: "Blue Rain Resorts | Saint Martin's Island | Defender Hotels & Resorts",
    metaDesc:
      "Blue Rain Resorts is a peaceful island escape on Saint Martin's Island—comfortable rooms, modern amenities and warm hospitality.",
    heading: ["Experience Island Serenity,", "Embrace Coastal Luxury."],
    intro:
      "Discover a peaceful island escape at Blue Rain Resort, located on the beautiful Saint Martin's Island. Just moments from the beach and a short walk from the main jetty, our resort offers comfortable accommodation, modern amenities, and warm hospitality. Whether for a family vacation or a relaxing getaway, enjoy a memorable island experience surrounded by natural beauty.",
    highlightsTitle: "Resort Highlights",
    highlights: [
      "Comfortable rooms with modern amenities",
      "Complimentary local breakfast",
      "Convenient access to nearby attractions",
      "Close to Chera Dwip, the island market, and beautiful beaches",
      "A welcoming environment for couples, families, and groups",
      "Personalized hospitality and a relaxing island atmosphere",
    ],
    image: "/images/new/design/blue-rain-overview.png",
    map: "Saint+Martin%27s+Island+Bangladesh",
    visit: "Plan a visit to Saint Martin's",
    benefits: {
      lead: (
        <>
          From breathtaking sunrises to peaceful starlit evenings, Blue Rain Resort offers more than
          just an island getaway.{" "}
          <strong>
            Bella Maris shareholders can enjoy special travel privileges and exclusive accommodation
            benefits at Blue Rain Resort,
          </strong>{" "}
          making every visit to Saint Martin's Island even more rewarding.
        </>
      ),
      more:
        "Experience the beauty of island living, enjoy memorable moments with loved ones, and make your ownership journey more rewarding with exclusive resort privileges.",
      tagline: "Own at Bella Maris. Enjoy Exclusive Island Experiences at Blue Rain Resort.",
    },
    gallery: {
      photos: [
        "/images/new/blue/Defender Hotels Images-19.jpg",
        "/images/new/blue/Defender Hotels Images-20.jpg",
        "/images/new/blue/Defender Hotels Images-21.jpg",
        "/images/new/blue/Defender Hotels Images-22.jpg",
        "/images/new/blue/Defender Hotels Images-23.jpg",
        "/images/new/blue/Defender Hotels Images-24.jpg",
        "/images/new/blue/Defender Hotels Images-25.jpg",
        "/images/new/blue/Defender Hotels Images-26.jpg",
      ],
    },
  },

  lusai: {
    title: "Lusai Cottage",
    metaTitle: "Lusai Cottage | Sajek Valley | Defender Hotels & Resorts",
    metaDesc:
      "Sajek Lusai Cottage — a peaceful mountain escape surrounded by green hills, rolling clouds and breathtaking landscapes.",
    heading: ["Embrace the Hills, Experience", "Nature, Discover Serenity."],
    intro:
      "Discover a peaceful mountain escape at Sajek Lusai Cottage, surrounded by lush green hills, rolling clouds, and breathtaking landscapes. Enjoy comfortable accommodation, warm hospitality, and a refreshing nature retreat—perfect for families, couples, and adventure lovers.",
    highlightsTitle: "Resort Highlights",
    highlights: [
      "Comfortable accommodation with essential amenities",
      "Beautiful mountain and valley views",
      "Peaceful surroundings and a relaxing atmosphere",
      "Easy access to Sajek's popular viewpoints and attractions",
      "Ideal for couples, families, and groups",
      "Warm hospitality and memorable hilltop experiences",
    ],
    image: "/images/new/design/lusai-overview.png",
    map: "Sajek+Valley+Rangamati",
    visit: "Plan a visit to Sajek",
    benefits: {
      lead: (
        <>
          From breathtaking mountain views to peaceful moments above the clouds, Lusai Cottage offers
          a memorable Sajek getaway.{" "}
          <strong>
            Bella Maris shareholders can enjoy special travel privileges and exclusive accommodation
            benefits at Lusai Cottage,
          </strong>{" "}
          making every visit more rewarding.
        </>
      ),
      more:
        "Experience the beauty of Sajek, reconnect with nature, and enjoy a relaxing stay with exclusive resort privileges.",
      tagline: "Own at Bella Maris. Enjoy Exclusive Stays at Lusai Cottage.",
    },
    gallery: { photos: ["/images/new/design/lusai-gallery.png"] },
  },

  raj: {
    title: "Raj Darbar Highway Restaurant",
    metaTitle: "Raj Darbar Highway Restaurant | Defender Hotels & Resorts",
    metaDesc:
      "Raj Darbar Highway Restaurant — premium dining, banquet hall and community center under one roof.",
    heading: ["Where Great Dining Meets", "Exceptional Experiences."],
    intro:
      "Discover Raj Darbar Highway Restaurant, a complete destination for dining, family gatherings, and special celebrations. Featuring a premium restaurant, modern community center, and convenient facilities, Raj Darbar brings food, comfort, and community together under one roof.",
    highlightsTitle: "Restaurant Highlights",
    highlights: [
      "Premium Restaurant & Dining Experience",
      "Modern Community Center",
      "Family-Friendly Environment",
      "Spacious & Comfortable Seating",
      "Ideal for Social Gatherings & Celebrations",
      "Convenient Highway Location",
      "Multiple Guest Facilities",
      "Welcoming Hospitality & Service",
    ],
    image: "/images/new/design/raj-darbar-overview.png",
    map: "Raj+Darbar+Highway+Restaurant",
    investor: true,
    ownership: {
      image: "/images/new/design/raj-darbar-interior.png",
      items: [
        { name: "Restaurant", sub: "Dining & Food" },
        { name: "Banquet Hall", sub: "Wedding & Celebration" },
        { name: "Community Center", sub: "Events & Gatherings" },
        { name: "Catering", sub: "Corporate & Private Orders" },
        { name: "Event Management", sub: "Complete Event Service" },
        { name: "Hospitality Investment", sub: "Long-term Income Potential" },
      ],
    },
    gallery: {
      photos: ["/images/new/design/raj-darbar-interior.png", "/images/new/design/raj-darbar-overview.png"],
      plans: ["/images/new/design/raj-darbar-overview.png"],
    },
  },
};

const detectProject = (page) => {
  const key = `${page?.slug ?? ""} ${page?.name ?? ""}`.toLowerCase();
  if (key.includes("lusai") || key.includes("sajek")) return PROJECTS.lusai;
  if (key.includes("raj") || key.includes("darbar")) return PROJECTS.raj;
  return PROJECTS.blue;
};

export default function BlueRainResorts({
  general,
  headerMenu,
  footerMenu2,
  footerMenu3,
  footerMenu4,
  auth,
  page,
}) {
  const { props } = usePage();
  const p = detectProject(page);
  const phone = general?.mobile || "+88 01953 000022";
  const tel = phone.replace(/[^+\d]/g, "");

  return (
    <>
      <Head>
        <title>{p.metaTitle}</title>
        <meta name="description" content={p.metaDesc} />
        <meta property="og:title" content={p.metaTitle} />
        <meta property="og:description" content={p.metaDesc} />
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
              padding: "100px 0px",
            }}
          >
            <div className="container">
              <h1 className="mt-4">{page?.name || p.title}</h1>
            </div>
          </div>
        </div>

        {/* Project overview */}
        <section className={`dh-section ${p.investor ? "dh-section--pink" : "dh-section--blue"}`}>
          <div className="container">
            <div className="row align-items-center gy-5">
              <div className="col-lg-6" data-aos="fade">
                <p className="dh-kicker">Project Overview</p>
                <h2 className="dh-title dh-title--sm">
                  {p.heading[0]} <br className="d-none d-xl-block" /> {p.heading[1]}
                </h2>
                <p className="dh-text">{p.intro}</p>

                <h3 className="dh-subhead">{p.highlightsTitle}</h3>
                <ul className="dh-list">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <div className="dh-actions mt-0">
                  {p.investor && (
                    <Link href="/invest-now" className="dh-btn">Become an Investor</Link>
                  )}
                  <div className="dh-icon-box">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${p.map}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View location on map"
                      title="Location"
                    >
                      <FiMapPin />
                    </a>
                    {p.investor && (
                      <a href="#consultation" aria-label="Request brochure" title="Request brochure">
                        <FiFileText />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade">
                <img
                  className="dh-img dh-img--shadow"
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  onError={imgFallback}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Plan a visit (resorts) */}
        {p.visit && (
          <section className="dh-section dh-section--white">
            <div className="container" data-aos="fade">
              <div className="dh-visit">
                <div>
                  <h3>{p.visit}</h3>
                  <p>
                    For booking and availability, contact our team or reach out via the{" "}
                    <Link href="/contact-us">&ldquo;Contact Us&rdquo;</Link> page.
                  </p>
                </div>
                <a className="dh-call" href={`tel:${tel}`}>
                  <span className="dh-call__icon"><FiPhoneCall /></span>
                  <span>
                    <span className="dh-call__label" style={{ fontSize: 20 }}>Call Anytime</span>
                    <span className="dh-call__num">{phone}</span>
                  </span>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Benefits of ownership (resorts) */}
        {p.benefits && (
          <section className="dh-section dh-section--blue">
            <div className="container">
              <div className="dh-center" data-aos="fade">
                <p className="dh-kicker">Benefits of Ownership</p>
                <h2 className="dh-title dh-title--sm">Exclusive Benefits for Bella Maris Shareholders</h2>
                <div className="mx-auto" style={{ maxWidth: 920 }}>
                  <p className="dh-text">{p.benefits.lead}</p>
                  <p className="dh-text">{p.benefits.more}</p>
                  <p className="dh-text mb-0">{p.benefits.tagline}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category of ownership (restaurant) */}
        {p.ownership && (
          <section className="dh-section dh-section--blue">
            <div className="container">
              <div className="dh-center dh-head" data-aos="fade">
                <p className="dh-kicker">Category of Ownership</p>
                <h2 className="dh-title dh-title--sm">Your Ownership, Your Lifestyle, Your Future.</h2>
              </div>
              <div className="row align-items-center gy-4">
                <div className="col-lg-7" data-aos="fade">
                  <img className="dh-img" src={p.ownership.image} alt={`${p.title} interior`} loading="lazy" />
                </div>
                <div className="col-lg-5" data-aos="fade">
                  <div className="dh-pills">
                    {p.ownership.items.map((o) => (
                      <div className="dh-pill" key={o.name}>
                        <div className="dh-pill__top">{o.name}</div>
                        <div className="dh-pill__bottom">{o.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <ImageGallery
          photos={p.gallery.photos}
          plans={p.gallery.plans}
          alt={p.title}
          background={p.investor ? "pink" : "white"}
        />
        <VideoPalyer background="blue" />

        <HotelBookingForm servicesList={props.servicesList} />
      </MainLayout>
    </>
  );
}
