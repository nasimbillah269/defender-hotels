import { useState } from "react";

const BENEFITS = [
  { id: 1, title: "Secure & Documented Ownership", desc: "Clear documentation and structured ownership process for peace of mind." },
  { id: 2, title: "Long-Term Income Opportunity", desc: "Designed to deliver long-term value and sustainable returns from a growing hospitality market." },
  { id: 3, title: "Exclusive Owner Stay Benefits", desc: "Enjoy vacation stays and special privileges at Defender properties as an owner." },
  { id: 4, title: "Premium Hospitality Investment", desc: "A premium asset class backed by quality development and professional management." },
  { id: 5, title: "Flexible Ownership Transfer", desc: "Ownership can be transferred or resold when needed, subject to the agreed terms." },
  { id: 6, title: "Potential Asset Value Growth", desc: "Hospitality real estate can grow in value as the project and destination mature." },
  { id: 7, title: "Transparent Profit-Sharing Model", desc: "An ethical, clearly defined profit-sharing structure designed around fairness." },
  { id: 8, title: "Fair Profit Distribution", desc: "Owners benefit from a structured and transparent profit distribution policy." },
];

function BenefitList({ items, openId, onToggle, className = "" }) {
  return (
    <ul className={`dh-benefits ${className}`}>
      {items.map((b) => {
        const open = openId === b.id;
        return (
          <li key={b.id} className={`dh-benefit ${open ? "is-open" : ""}`}>
            <button
              type="button"
              className="dh-benefit__btn"
              aria-expanded={open}
              onClick={() => onToggle(open ? null : b.id)}
            >
              <span>{b.title}</span>
              <i aria-hidden="true">&gt;</i>
            </button>
            {open && <p className="dh-benefit__desc">{b.desc}</p>}
          </li>
        );
      })}
    </ul>
  );
}

export default function ChooseUs() {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="dh-section dh-why">
      <div className="container">
        {/* Both columns stretch to the same height and the lists sit at the bottom,
            so the rows of the two lists line up (as in the design). */}
        <div className="row gy-4 dh-why__row">
          <div className="col-lg-5 dh-why__col" data-aos="fade-right">
            <div>
              <p className="dh-kicker">Why Choose Us</p>
              <h2 className="dh-title dh-title--sm">
                Own Premium Hospitality <br /> with Exclusive Benefits <br /> and Confidence
              </h2>
            </div>
            <BenefitList items={BENEFITS.slice(0, 4)} openId={openId} onToggle={setOpenId} className="dh-benefits--left" />
          </div>

          <div className="col-lg-6 offset-lg-1 dh-why__col" data-aos="fade-left">
            <div className="dh-why-img">
              <img
                src="/images/new/design/why-choose-clean.jpg"
                alt="Defender hotel investment returns"
                loading="lazy"
              />
            </div>
            <BenefitList items={BENEFITS.slice(4)} openId={openId} onToggle={setOpenId} className="dh-benefits--right" />
          </div>
        </div>
      </div>
    </section>
  );
}
