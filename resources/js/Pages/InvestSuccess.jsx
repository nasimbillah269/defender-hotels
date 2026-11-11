import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import { FiCheck, FiHome, FiPhoneCall } from "react-icons/fi";
import banner from "../../../public/images/new/header/header.png";

/**
 * Thank-you page shown after the Invest Now form is submitted (/invest-now/success).
 */
const bdt = (n) => (n ? `BDT ${Number(n).toLocaleString()}` : "—");

export default function InvestSuccess({ investment, general, headerMenu, footerMenu2, footerMenu3, footerMenu4, auth }) {
  const phone = general?.mobile || "+88 01953 000022";
  const rows = [
    ["Reference No.", investment.reference],
    ["Applicant Name", investment.name],
    ["Category of Ownership", investment.category || "—"],
    ["Number of Ownership", investment.quantity || "—"],
    ["Ownership Price", bdt(investment.amount)],
    ["Investment Amount", bdt(investment.booking_amount)],
    ["Payment Type", investment.payment_method || "—"],
    ["Submitted On", investment.date],
  ];

  return (
    <MainLayout
      auth={auth}
      general={general}
      headerMenu={headerMenu}
      footerMenu2={footerMenu2}
      footerMenu3={footerMenu3}
      footerMenu4={footerMenu4}
    >
      <Head title="Investment Submitted | Defender Hotels & Resorts" />

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
            <h1 className="mt-4">Thank You</h1>
          </div>
        </div>
      </div>

      <section className="dh-section dh-section--blue">
        <div className="container">
          <div className="dh-success" data-aos="fade">
            <span className="dh-success__icon" aria-hidden="true">
              <FiCheck />
            </span>
            <p className="dh-kicker">Investment Request Received</p>
            <h2 className="dh-success__title">Thank you, {investment.name}!</h2>
            <p className="dh-success__lead">
              Your investment request has been submitted successfully. Please keep your reference
              number <strong>{investment.reference}</strong> for any future communication.
            </p>

            <dl className="dh-success__summary">
              {rows.map(([label, value]) => (
                <div className="dh-success__row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <p className="dh-success__note">
              By submitting this form, you agree to be contacted by our team for verification and next steps.
            </p>

            <div className="dh-success__actions">
              <Link href="/" className="dh-btn">
                <FiHome /> Back to Home
              </Link>
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="dh-btn dh-btn--outline">
                <FiPhoneCall /> {phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
