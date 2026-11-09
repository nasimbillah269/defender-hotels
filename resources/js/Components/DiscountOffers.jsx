import { Link } from "@inertiajs/react";

export default function DiscountOffers() {
  return (
    <section className="dh-section dh-rewards">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6" data-aos="fade">
            <p className="dh-kicker">Discount &amp; Offers</p>
            <h2 className="dh-title">
              Rewards Card <br /> Benefits
            </h2>
            <div className="dh-actions">
              <Link href="/rewards-card" className="dh-btn dh-btn--gold">
                Discover More
              </Link>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade">
            <img
              className="dh-rewards__img"
              src="/images/new/design/rewards-card-band.png"
              alt="Defender Rewards Card"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
