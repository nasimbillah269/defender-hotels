import MainLayout from "@/Layouts/MainLayout";
import HotelBookingForm from "@/Components/HotelBookingForm";
import { ImageGallery } from "@/Components/VideoPalyer";
import { Head, Link } from "@inertiajs/react";
import banner from "../../../public/images/new/header/header.png";

export default function projectOverView({
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
                <Head title="Project Overview" />

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
                            <h1 className="mt-4">Project Overview</h1>
                        </div>
                    </div>
                </div>

                <section className="dh-section dh-section--pink">
                    <div className="container">
                        <div className="row align-items-center gy-5">
                            <div className="col-lg-6" data-aos="fade-right">
                                <p className="dh-kicker">Project Overview</p>
                                <h2 className="dh-title dh-title--sm">
                                    Enjoy a Luxury <br /> Experience at Bella Maris
                                </h2>
                                <p className="dh-text">
                                    Welcome to Defender Hotels &amp; Resorts Ltd., where we turn your dreams into
                                    reality. With a passion for excellence and a commitment to integrity, we strive
                                    to provide unparalleled service to our clients in every ownership.
                                </p>
                                <p className="dh-text">
                                    At Bella Maris, every detail is curated to ensure an unforgettable experience —
                                    whether you are seeking a romantic retreat, a family getaway, or a destination for
                                    your next corporate event. Unwind at our spa, enjoy refined dining, and discover
                                    a lifestyle where luxury meets long-term value.
                                </p>
                                <div className="dh-actions">
                                    <Link href="/invest-now" className="dh-btn">Become an Investor</Link>
                                    <Link href="/bella-maris" className="dh-btn dh-btn--gold">Explore Bella Maris</Link>
                                </div>
                            </div>
                            <div className="col-lg-6" data-aos="fade-left">
                                <img
                                    className="dh-img dh-img--shadow"
                                    src="/images/img/DHRL Bella Maris_00007.jpg"
                                    alt="Bella Maris overview"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <ImageGallery
                    photos={[
                        "/images/img/DHRL Bella Maris_00004.jpg",
                        "/images/img/DHRL Bella Maris_00005.jpg",
                        "/images/new/design/bella-overview.png",
                    ]}
                    plans={["/images/new/over.webp", "/images/new/design/bella-masterplan.png"]}
                    alt="Bella Maris"
                    background="blue"
                />

                <HotelBookingForm servicesList={servicesList} />
            </MainLayout>
        </>
    );
}
