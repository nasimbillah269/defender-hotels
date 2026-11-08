import { Link, usePage } from "@inertiajs/react";
import { FiPhoneCall } from "react-icons/fi";

/**
 * About section with 3-image collage.
 * variant="home" (default) → short copy + CTA
 * variant="page"           → full About Us page copy
 */
export default function Luxury({ variant = "home" }) {
  const { props } = usePage();
  const phone = props.general?.mobile || "+88 01953 000022";
  const isPage = variant === "page";

  return (
    <section className={`dh-section ${isPage ? "dh-section--pink" : "dh-section--white"}`}>
      <div className="container">
        <div className="row align-items-center gy-5">
          {/* LEFT: COLLAGE */}
          <div className="col-lg-6" data-aos="fade-right">
            <div className="dh-collage">
              <div className="dh-collage__tall">
                <img
                  className="dh-img dh-img--shadow"
                  src="/images/new/design/about-tower-tall.png"
                  alt="Bella Maris tower by the sea"
                  loading="lazy"
                />
              </div>
              <div className="dh-collage__stack dh-collage__stack--offset">
                <img
                  className="dh-img dh-img--shadow"
                  src="/images/new/design/about-tower-sunset.png"
                  alt="Bella Maris at sunset"
                  loading="lazy"
                />
                <img
                  className="dh-img dh-img--shadow"
                  src="/images/new/design/about-tower-wood.png"
                  alt="Bella Maris resort podium"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT */}
          <div className="col-lg-6" data-aos="fade-left">
            <p className="dh-kicker">About Us</p>
            <h2 className="dh-title">
              Invest in Luxury, <br /> Own a Better Future
            </h2>

            <p className="dh-text">
              Welcome to Defender Hotels &amp; Resorts Ltd., where luxury meets investment
              opportunities. With a passion for excellence and a commitment to integrity, we aim to
              create exceptional hospitality destinations and valuable ownership opportunities.
            </p>
            <p className="dh-text">
              Our vision is to bring together luxury lifestyle, quality development, and investment
              potential. Through thoughtful planning, premium properties, and a commitment to
              transparency, we strive to build lasting relationships with our investors and create a
              promising future in the hospitality industry.
            </p>

            {isPage ? (
              <p className="dh-text">
                Every Defender destination is planned around comfort, quality and long-term value —
                so that ownership becomes a rewarding journey for investors, guests and the
                communities around our projects.
              </p>
            ) : (
              <div className="dh-actions">
                <Link href="/about-us" className="dh-btn">
                  Discover More
                </Link>
                <a className="dh-call" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
                  <span className="dh-call__icon"><FiPhoneCall /></span>
                  <span>
                    <span className="dh-call__label">Call Anytime</span>
                    <span className="dh-call__num">{phone}</span>
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>

        {isPage && (
          <p className="dh-text mt-5" data-aos="fade-up">
            At Defender Hotels &amp; Resorts Ltd., we prioritize personalized attention, professional
            guidance, and a seamless experience throughout every stage of the investment journey. Our
            dedicated team of experienced professionals combines industry knowledge, market insights,
            and modern technology to help investors explore opportunities and make informed decisions.
          </p>
        )}
      </div>
    </section>
  );
}
