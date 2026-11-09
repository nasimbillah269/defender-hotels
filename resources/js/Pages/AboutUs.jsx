import HotelBookingForm from "@/Components/HotelBookingForm";
import Luxury from "@/Components/Luxury";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import banner from "../../../public/images/new/header/header.png";

export default function AboutUs({
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
            <MainLayout auth={auth} general={general} headerMenu={headerMenu} footerMenu2={footerMenu2} footerMenu3={footerMenu3} footerMenu4={footerMenu4}>
                <Head title="About Us" />

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
                            <h1 className="mt-4">About Us</h1>
                            <h5 align="center">At Defender Hotels &amp; Resorts Ltd., we redefine luxury living through thoughtfully designed hospitality investments.</h5>
                        </div>
                    </div>
                </div>

                {/* About (shared collage section) */}
                <Luxury variant="page" />

                {/* Vision & Mission */}
                <section className="dh-section dh-section--white">
                    <div className="container">
                        <div className="row gy-4 justify-content-center">
                            <div className="col-lg-5" data-aos="fade">
                                <div className="dh-mv dh-mv--pink">
                                    <h3>Our Vision</h3>
                                    <p className="dh-text mb-0">
                                        To become a trusted leader in real estate and hospitality by developing
                                        exceptional destinations, creating sustainable investment opportunities,
                                        and delivering outstanding experiences—building a future driven by
                                        excellence, integrity, innovation, and lasting value.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-5" data-aos="fade">
                                <div className="dh-mv dh-mv--blue">
                                    <h3>Our Mission</h3>
                                    <p className="dh-text mb-0">
                                        Our mission is to develop high-quality and innovative hospitality
                                        destinations that deliver exceptional experiences and create sustainable
                                        value. We are committed to providing secure and transparent investment
                                        opportunities, contributing to economic growth through employment generation
                                        and tourism development, and ensuring outstanding service and lasting value
                                        for our clients. Through excellence, integrity, and innovation, we aim to
                                        promote Bangladesh as a globally recognized tourism destination.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Chairman message */}
                <section className="dh-section dh-section--blue">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10" data-aos="fade">
                                <p className="dh-kicker">Leadership Message</p>
                                <h2 className="dh-title">Message from the Chairman</h2>
                                <p className="dh-text">
                                    At Defender Hotels and Resorts Ltd., our vision is to elevate Bangladesh&rsquo;s
                                    hospitality landscape by delivering exceptional experiences rooted in comfort,
                                    elegance, and sustainability. We are committed to creating world-class hotels and
                                    resorts that celebrate our country&rsquo;s natural beauty while meeting international
                                    standards of service.
                                </p>
                                <p className="dh-text">
                                    Our flagship projects—Bella Maris in Inani, Cox&rsquo;s Bazar and Blue Rain Resorts in
                                    Saint Martin—reflect our dedication to quality, innovation, and guest satisfaction.
                                    These destinations are designed not just as places to stay, but as memorable
                                    experiences for travelers seeking peace, nature, and refined hospitality.
                                </p>
                                <p className="dh-text">
                                    As Chairman, I take pride in the passion and professionalism of our team, and in
                                    the trust our partners and guests place in us. Together, we are not only building
                                    resorts—we are building a stronger, more welcoming image of Bangladesh to the world.
                                </p>
                                <div className="dh-signature">
                                    <strong>Abu Bakar Siddique</strong>
                                    <span>Chairman</span>
                                    <small>Defender Hotels &amp; Resorts Ltd.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="dh-section dh-section--white">
                    <div className="container">
                        <div className="dh-center dh-head" data-aos="fade">
                            <p className="dh-kicker">Our People</p>
                            <h2 className="dh-title">Meet Our Team</h2>
                            <p className="dh-text">
                                A dedicated team committed to delivering trusted hospitality and investment solutions.
                            </p>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-10" data-aos="fade">
                                <img
                                    className="dh-img dh-img--shadow"
                                    src="/images/new/design/team-family-day.png"
                                    alt="Defender Group team at Family Day 2026"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <HotelBookingForm servicesList={servicesList} />
            </MainLayout>
        </>
    );
}
