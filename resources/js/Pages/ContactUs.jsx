import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import banner from "../../../public/images/new/header/header.png";
import AlertMessageComponents from "@/Components/AlertMassageCompononets";

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

    post(route("contactMail"), {
      onSuccess: () => {
        reset();
      },
      onError: () => {
        // server validation errors will show via `errors`
      },
    });
  };

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
              <h5 align='center'>
                We’re here to help—send us a message and our team will respond shortly.
              </h5>
            </div>
          </div>
        </div>

        <section className="contact section-padding">
          <div className="container">
            {/* Contact Cards */}
            <div className="row g-4 justify-content-center" data-aos="fade-up">
              <div className="col-md-4">
                <div className="contact-card">
                  <div className="contact-icon">
                    <img
                      src="/images/img/icons/Defender Hotels Website Mockup Sample-39.png"
                      alt="Phone"
                      loading="lazy"
                    />
                  </div>
                  <h5 className="contact-title">Call Us</h5>
                  <p className="contact-text">
                    <a href="tel:+8801886993344">+88 01953 000022</a>
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="contact-card">
                  <div className="contact-icon">
                    <img
                      src="/images/img/icons/Defender Hotels Website Mockup Sample-40.png"
                      alt="Address"
                      loading="lazy"
                    />
                  </div>
                  <h5 className="contact-title">Visit Us</h5>
                  <p className="contact-text">
                    Suvastu Jahanara Square, House 39, Road 11,
                    <br />
                    Banani, Dhaka-1213, Bangladesh.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="contact-card">
                  <div className="contact-icon">
                    <img
                      src="/images/img/icons/Defender Hotels Website Mockup Sample-41.png"
                      alt="Email"
                      loading="lazy"
                    />
                  </div>
                  <h5 className="contact-title">Email Us</h5>
                  <p className="contact-text">
                    <a href="mailto:hello@defenderhotels.com">hello@defenderhotels.com</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="row justify-content-center mt-4">
              <div className="col-lg-10" data-aos="fade-right">
                <div className="contact-form-wrap">
                  <div className="contact-form-head">
                    <p className="contact-kicker">Get in Touch</p>
                    <h2 className="contact-headline">Send Us a Message</h2>
                    <p className="contact-subline">
                      For bookings, investment inquiries, or general questions—please fill out the form below.
                    </p>
                  </div>

                  <AlertMessageComponents status={errors.status} message={errors.message} />

                  <form onSubmit={contactSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Your Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full name"
                          value={data.name}
                          required
                          onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Your Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="example@email.com"
                          value={data.email}
                          required
                          onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                      </div>

                      <div className="col-md-12">
                        <label className="form-label">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="How can we help?"
                          value={data.subject}
                          required
                          onChange={(e) => setData("subject", e.target.value)}
                        />
                        {errors.subject && <span className="text-danger">{errors.subject}</span>}
                      </div>

                      <div className="col-md-12">
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-control"
                          placeholder="Write your message..."
                          rows={5}
                          value={data.message}
                          required
                          onChange={(e) => setData("message", e.target.value)}
                        />
                        {errors.message && <span className="text-danger">{errors.message}</span>}
                      </div>

                      <div className="col-md-12">
                        <button type="submit" disabled={processing} className="btnSendMsg">
                          {processing ? "Sending..." : "Send Message"}
                        </button>
                        <p className="form-note mt-3">
                          We typically respond within 24 hours on working days.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="row mt-4" data-aos="fade-up">
              <div className="col-12">
                <div className="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29206.413098238932!2d90.408608!3d23.790077!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76cf4240757%3A0x2284e62b52c67a3e!2sSuvastu%20Jahanara%20Square!5e0!3m2!1sen!2sus!4v1748178928818!5m2!1sen!2sus"
                    width="100%"
                    height="380"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Defender Hotels & Resorts Location Map"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
