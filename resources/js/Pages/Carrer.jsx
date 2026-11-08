import MainLayout from "@/Layouts/MainLayout";
import HotelBookingForm from "@/Components/HotelBookingForm";
import UploadCV from "@/Components/UploadCV";
import { Head } from "@inertiajs/react";
import banner from "../../../public/images/new/header/header.png";

export default function CareerPage({
  general,
  headerMenu,
  footerMenu2,
  footerMenu3,
  footerMenu4,
  auth,
  servicesList,
}) {
  return (
    <>
      <Head>
        <title>Careers | Defender Hotels & Resorts Ltd.</title>
        <meta
          name="description"
          content="Explore career opportunities at Defender Hotels & Resorts Ltd. Join our growing team in hospitality, real estate and tourism."
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
              <h1 className="mt-4">Career</h1>
              <h5 align="center">
                Build a meaningful career with a team shaping premium hospitality and destination living.
              </h5>
            </div>
          </div>
        </div>

        <section className="dh-section dh-section--blue">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10" data-aos="fade-up">
                <p className="dh-kicker">Career</p>
                <h2 className="dh-title">
                  Build Your Future with <br /> Defender Hotels &amp; Resorts Ltd.
                </h2>
                <p className="dh-text">
                  At DEFENDER Hotels &amp; Resorts Ltd., we believe our people are our greatest strength.
                  As a dynamic and growing group operating in real estate, hospitality, consultancy, and
                  tourism, we offer exciting opportunities to build meaningful careers in an inspiring
                  environment.
                </p>
                <p className="dh-text">
                  Whether you&rsquo;re an experienced professional or just starting out, we value passion,
                  innovation, and integrity. Join us to be part of projects that shape the future of urban
                  living and sustainable travel in Bangladesh.
                </p>

                <h3 className="dh-subhead">How to Apply</h3>
                <p className="dh-text mb-1">
                  Send your CV and cover letter to:{" "}
                  <a href="mailto:career@defenderhotels.com"><strong>career@defenderhotels.com</strong></a>
                </p>
                <p className="dh-text">Or drop your CV here.</p>

                <div className="dh-upload" data-aos="fade-up">
                  <UploadCV />
                </div>
              </div>
            </div>
          </div>
        </section>

        <HotelBookingForm servicesList={servicesList} />
      </MainLayout>
    </>
  );
}
