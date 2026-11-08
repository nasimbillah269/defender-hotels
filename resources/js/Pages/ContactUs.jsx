import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import banner from "../../../public/images/new/header/header.png";
import AlertMessageComponents from "@/Components/AlertMassageCompononets";
import { FiPhone, FiMail, FiMapPin, FiSend, FiClock, FiArrowUpRight } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";

const usable = (url) => url && url !== "#" && !url.startsWith("#");

export default function ContactUs({
  general,
  headerMenu,
  footerMenu2,
  footerMenu3,
  footerMenu4,
  auth,
}) {
  const { data, setData, post, reset, processing, errors } = useForm({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactSubmit = (e) => {
    e.preventDefault();
    post(route("contactMail"), { onSuccess: () => reset() });
  };

  // Contact details come from Admin > General Setting (fallbacks keep the page complete)
  const phone = general?.mobile || "+88 01953 000022";
  const email = general?.email || "hello@defenderhotels.com";
  const address =
    general?.address_one ||
    "Suvastu Jahanara Square, House No.-39, Road-11, Banani, Dhaka-1213, Bangladesh";
  const tel = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Suvastu Jahanara Square, Banani, Dhaka")}`;

  const socials = [
    { url: general?.facebook_link, icon: <FaFacebookF />, label: "Facebook" },
    { url: general?.linkedin_link, icon: <FaLinkedinIn />, label: "LinkedIn" },
    { url: general?.youtube_link, icon: <FaYoutube />, label: "YouTube" },
    { url: general?.instagram_link, icon: <FaInstagram />, label: "Instagram" },
    { url: general?.pinterest_link, icon: <FaWhatsapp />, label: "WhatsApp" }, // the WhatsApp link is stored in this field
  ].filter((s) => usable(s.url));

  return (
    <>
      <Head>
        <title>Contact Us | Defender Hotels &amp; Resorts</title>
        <meta
          name="description"
          content="Contact Defender Hotels & Resorts for investment inquiries, bookings, and project information. Our team is ready to assist you."
        />
        <meta property="og:title" content="Contact Us | Defender Hotels & Resorts" />
        <meta
          property="og:description"
          content="Reach out to Defender Hotels & Resorts for bookings, ownership inquiries, and support."
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
        {/* Banner */}
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
              <h1 className="mt-4">Contact Us</h1>
              <h5 align="center">
                We’re here to help—send us a message and our team will respond shortly.
              </h5>
            </div>
          </div>
        </div>

        <section className="dh-section dh-contact">
          <div className="container">
            <div className="dh-contact__wrap" data-aos="fade-up">
              {/* ---- Left: contact information ---- */}
              <aside className="dh-contact__info">
                <p className="dh-contact__kicker">Contact Information</p>
                <h2>Let’s talk about your next investment.</h2>
                <p className="dh-contact__lead">
                  Our team is ready to help with ownership details, project information and bookings.
                </p>

                <ul className="dh-contact__list">
                  <li>
                    <span className="dh-contact__ico"><FiPhone /></span>
                    <span>
                      <small>Call Us</small>
                      <a href={tel}>{phone}</a>
                    </span>
                  </li>
                  <li>
                    <span className="dh-contact__ico"><FiMail /></span>
                    <span>
                      <small>Email Us</small>
                      <a href={`mailto:${email}`}>{email}</a>
                    </span>
                  </li>
                  <li>
                    <span className="dh-contact__ico"><FiMapPin /></span>
                    <span>
                      <small>Visit Us</small>
                      <a href={mapsLink} target="_blank" rel="noopener noreferrer">{address}</a>
                    </span>
                  </li>
                  <li>
                    <span className="dh-contact__ico"><FiClock /></span>
                    <span>
                      <small>Response Time</small>
                      Within 24 hours on working days
                    </span>
                  </li>
                </ul>

                {socials.length > 0 && (
                  <div className="dh-contact__social">
                    <small>Follow us</small>
                    <div>
                      {socials.map((s) => (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </aside>

              {/* ---- Right: form ---- */}
              <div className="dh-contact__form">
                <p className="dh-kicker">Get in Touch</p>
                <h2 className="dh-title dh-title--sm">Send Us a Message</h2>
                <p className="dh-text">
                  For bookings, investment inquiries, or general questions—fill out the form and we’ll get back to you.
                </p>

                <AlertMessageComponents status={errors.status} message={errors.message || errors.messages} />

                <form onSubmit={contactSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="c-name">Your Name</label>
                      <input
                        id="c-name"
                        type="text"
                        className="form-control"
                        placeholder="Full name"
                        value={data.name}
                        required
                        onChange={(e) => setData("name", e.target.value)}
                      />
                      {errors.name && <span className="dh-field-error">{errors.name}</span>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="c-email">Your Email</label>
                      <input
                        id="c-email"
                        type="email"
                        className="form-control"
                        placeholder="example@email.com"
                        value={data.email}
                        required
                        onChange={(e) => setData("email", e.target.value)}
                      />
                      {errors.email && <span className="dh-field-error">{errors.email}</span>}
                    </div>

                    <div className="col-12">
                      <label className="form-label" htmlFor="c-subject">Subject</label>
                      <input
                        id="c-subject"
                        type="text"
                        className="form-control"
                        placeholder="How can we help?"
                        value={data.subject}
                        required
                        onChange={(e) => setData("subject", e.target.value)}
                      />
                      {errors.subject && <span className="dh-field-error">{errors.subject}</span>}
                    </div>

                    <div className="col-12">
                      <label className="form-label" htmlFor="c-message">Message</label>
                      <textarea
                        id="c-message"
                        className="form-control"
                        placeholder="Write your message..."
                        rows={5}
                        maxLength={500}
                        value={data.message}
                        required
                        onChange={(e) => setData("message", e.target.value)}
                      />
                      {errors.message && <span className="dh-field-error">{errors.message}</span>}
                    </div>

                    <div className="col-12 dh-contact__actions">
                      <button type="submit" disabled={processing} className="dh-contact__submit">
                        {processing ? "Sending..." : "Send Message"} <FiSend aria-hidden="true" />
                      </button>
                      <p className="dh-contact__note">We typically respond within 24 hours on working days.</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* ---- Map ---- */}
            <div className="dh-contact__map" data-aos="fade-up">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29206.413098238932!2d90.408608!3d23.790077!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76cf4240757%3A0x2284e62b52c67a3e!2sSuvastu%20Jahanara%20Square!5e0!3m2!1sen!2sus!4v1748178928818!5m2!1sen!2sus"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Defender Hotels & Resorts Location Map"
              />
              <a className="dh-contact__mapchip" href={mapsLink} target="_blank" rel="noopener noreferrer">
                <span className="dh-contact__ico"><FiMapPin /></span>
                <span>
                  <strong>Defender Hotels &amp; Resorts</strong>
                  <small>Suvastu Jahanara Square, Banani, Dhaka</small>
                </span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
