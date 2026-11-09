import { useState } from "react";
import { FiChevronsRight } from "react-icons/fi";

/**
 * Home page FAQ section.
 * (File name kept as HotelFacilities so the project structure stays unchanged.)
 */
const FAQS = [
  {
    q: "What is Defender Hotels & Resorts Ltd.?",
    a: "Defender Hotels & Resorts Ltd. is a Bangladeshi hospitality developer creating premium hotels, resorts and restaurants — including Bella Maris (Inani, Cox's Bazar), Blue Rain Resorts (Saint Martin's), Lusai Cottage (Sajek) and Raj Darbar Highway Restaurant — with structured ownership opportunities for investors.",
  },
  {
    q: "How can I invest in Defender Hotels & Resorts Ltd.?",
    a: "Choose an ownership category, then submit the Invest Now form or request a free consultation. Our team will contact you to explain the available options, documentation and next steps.",
  },
  {
    q: "What benefits do shareholders receive?",
    a: "Shareholders receive documented ownership, a transparent profit-sharing model, exclusive owner stay privileges at Defender properties, and the potential for long-term asset value growth.",
  },
  {
    q: "How can I purchase shares?",
    a: "Select your preferred ownership category and quantity on the Invest Now page, choose a payment type (cash, cheque or bank transfer) and submit your details. A Defender representative will verify your application and guide you through the agreement.",
  },
  {
    q: "How can I learn about project development progress?",
    a: "You can follow our official website and social media channels for project updates, construction progress, announcements, and investment-related information.",
  },
];

export default function HotelFacilities() {
  const [open, setOpen] = useState(FAQS.length - 1);

  return (
    <section className="dh-section dh-section--pink">
      <div className="container">
        <div className="row gy-4 align-items-start">
          <div className="col-lg-5" data-aos="fade">
            <p className="dh-kicker">FAQ</p>
            <h2 className="dh-title dh-title--sm">
              Frequently Asked <br /> Question
            </h2>
            <img
              className="dh-img mt-3"
              src="/images/new/design/faq-office.png"
              alt="Defender Hotels & Resorts team at work"
              loading="lazy"
            />
          </div>

          <div className="col-lg-7 dh-faq" data-aos="fade">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className={`dh-faq__item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="dh-faq__btn"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>
                      {i + 1}. {f.q}
                    </span>
                    <span className="dh-faq__icon" aria-hidden="true"><FiChevronsRight /></span>
                  </button>
                  {/* always rendered so the answer can slide open/closed smoothly */}
                  <div className="dh-faq__panel" aria-hidden={!isOpen}>
                    <div className="dh-faq__inner">
                      <p className="dh-faq__ans">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
