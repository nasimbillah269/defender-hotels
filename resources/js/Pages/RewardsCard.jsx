import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import banner from "../../../public/images/new/header/header.png";

export default function RewardsCard({
  general,
  headerMenu,
  footerMenu2,
  footerMenu3,
  footerMenu4,
  auth,
}) {
  return (
    <MainLayout
      auth={auth}
      general={general}
      headerMenu={headerMenu}
      footerMenu2={footerMenu2}
      footerMenu3={footerMenu3}
      footerMenu4={footerMenu4}
    >
      <Head title="Rewards Card | Defender Hotels & Resorts">
        <meta
          name="description"
          content="Defender Rewards Card is a premium privilege program for eligible ownership customers. Enjoy partner offers and lifestyle benefits as we roll out facilities."
        />
      </Head>

      {/* Page Banner (same style as other pages) */}
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
            <h1 className="mt-4">Rewards Card</h1>
            <h5 align='center'>
              Premium privileges for eligible ownership customers
            </h5>
          </div>
        </div>
      </div>

      {/* White premium section */}
      <section className="rewards-page section-padding">
        <div className="container">
          <div className="rewards-header" data-aos="fade-up">
            <p className="rewards-kicker">DEFENDER PRIVILEGES</p>
            <h2 className="rewards-title">Defender Rewards Card</h2>
            <p className="rewards-subtitle">
              A premium benefit program designed to add more value to your
              ownership journey. Facilities and partner benefits are currently
              being developed and will be rolled out in phases.
            </p>
          </div>

          <div className="row align-items-center gy-4 rewards-grid">
            {/* Card Visual */}
            <div className="col-lg-5" data-aos="fade-right">
              <div className="rewards-card-visual">
                <div className="rewards-card">
                  <div className="rewards-card__brand">DEFENDER</div>
                  <div className="rewards-card__label">Rewards</div>

                  <div className="rewards-card__number">**** **** **** 2026</div>

                  <div className="rewards-card__footer">
                    <span>Premium Member</span>
                    <span>Hotels &amp; Resorts</span>
                  </div>
                </div>

                <p className="rewards-note">
                  * Card design is a visual mockup. Final card details and
                  eligibility criteria will be announced officially.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="col-lg-7" data-aos="fade-left">
              <div className="rewards-content">
                <h3 className="rewards-content__title">What the card means</h3>
                <p className="rewards-content__text">
                  The Defender Rewards Card is planned for premium customers who
                  purchase a certain amount of ownership. This program is being
                  developed to offer lifestyle privileges and partner discounts
                  across our hospitality ecosystem.
                </p>

                <div className="rewards-list">
                  <div className="rewards-list__item">
                    <h5>Priority Support</h5>
                    <p>
                      Dedicated assistance for booking and ownership-related
                      queries.
                    </p>
                  </div>

                  <div className="rewards-list__item">
                    <h5>Exclusive Offers</h5>
                    <p>
                      Special seasonal offers, selected discounts and partner
                      benefits (coming soon).
                    </p>
                  </div>

                  <div className="rewards-list__item">
                    <h5>Owner Privileges</h5>
                    <p>
                      Planned perks for eligible owners at Defender properties
                      as facilities are introduced.
                    </p>
                  </div>
                </div>

                <div className="rewards-cta">
                  <Link href="/projects" className="btn btn-primary">
                    Explore Ownership Opportunities
                  </Link>
                  <Link href="/contact-us" className="btn btn-outline-dark ms-2">
                    Contact Us
                  </Link>
                </div>

                <div className="rewards-muted">
                  We’re currently building the benefits network. Updates will be
                  shared through official channels as soon as partners and
                  facilities are finalized.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
