import { Link } from "@inertiajs/react";

export default function DiscountOffers() {
  return (
    <section className="dh-section dh-rewards">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-5" data-aos="fade-right">
            <p className="dh-kicker">Discount &amp; Offers</p>
            <h2 className="dh-title">
              Rewards Card <br /> Benefits
            </h2>
            <p className="dh-text">
              Enjoy exclusive privileges with the Defender Rewards Card — special offers, seasonal
              discounts and partner benefits across our hospitality network, designed to add more
              value to your ownership experience.
            </p>
            <div className="dh-actions">
              <Link href="/rewards-card" className="dh-btn dh-btn--gold">
                Discover More
              </Link>
            </div>
          </div>

          <div className="col-lg-7" data-aos="fade-left">
            <img
              className="dh-rewards__img"
              src="/images/new/design/rewards-card.png"
              alt="Defender Rewards Card"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
