import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

export default function ExtraServices() {
    return (
        <>
            <section className="pricing section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="section-subtitle">
                                <span>Best Prices </span>
                            </div>
                            <div className="section-title">Extra Services </div>
                            <p className="color-2">
                                The best prices for ____ relaxing vacation. The
                                utanislen ____ nestibulum ac quame odion
                                _________ sceisue the aucan.{" "}
                            </p>
                            <p className="color-2">
                                Orci varius natoque penatibus __ magnis disney
                                parturient monte _______ ridiculus mus nellen
                                etesque ________ morbine.{" "}
                            </p>
                            <div className="reservations mb-30">
                                <div className="icon">
                                    <span className="flaticon-call"></span>
                                </div>
                                <div className="text">
                                    <p className="color-2">For information </p>{" "}
                                    <a href="tel:855-100-4444">855 100 4444 </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="owl-carousel owl-theme">
                                <Swiper
                                    slidesPerView={2}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <div className="pricing-card">
                                            <img
                                                src="/images/img/pricing/1.jpg"
                                                alt=""
                                            />
                                            <div className="desc">
                                                <div className="name">
                                                    Room cleaning{" "}
                                                </div>
                                                <div className="amount">
                                                    $50 <span>/ month </span>
                                                </div>
                                                <ul className="list-unstyled list">
                                                    <li>
                                                        <i className="ti-check"></i>{" "}
                                                        Hotel ut nisan ___ duru{" "}
                                                    </li>
                                                    <li>
                                                        <i className="ti-check"></i>{" "}
                                                        Orci miss natoque ____
                                                        ince{" "}
                                                    </li>
                                                    <li>
                                                        <i className="ti-close unavailable"></i>
                                                        Clean sorem ipsum morbin{" "}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="pricing-card">
                                            <img
                                                src="/images/img/pricing/1.jpg"
                                                alt=""
                                            />
                                            <div className="desc">
                                                <div className="name">
                                                    Room cleaning{" "}
                                                </div>
                                                <div className="amount">
                                                    $50 <span>/ month </span>
                                                </div>
                                                <ul className="list-unstyled list">
                                                    <li>
                                                        <i className="ti-check"></i>{" "}
                                                        Hotel ut nisan ___ duru{" "}
                                                    </li>
                                                    <li>
                                                        <i className="ti-check"></i>{" "}
                                                        Orci miss natoque ____
                                                        ince{" "}
                                                    </li>
                                                    <li>
                                                        <i className="ti-close unavailable"></i>
                                                        Clean sorem ipsum morbin{" "}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="pricing-card">
                                            <img
                                                src="/images/img/pricing/1.jpg"
                                                alt=""
                                            />
                                            <div className="desc">
                                                <div className="name">
                                                    Room cleaning{" "}
                                                </div>
                                                <div className="amount">
                                                    $50 <span>/ month </span>
                                                </div>
                                                <ul className="list-unstyled list">
                                                    <li>
                                                        <i className="ti-check"></i>{" "}
                                                        Hotel ut nisan ___ duru{" "}
                                                    </li>
                                                    <li>
                                                        <i className="ti-check"></i>{" "}
                                                        Orci miss natoque ____
                                                        ince{" "}
                                                    </li>
                                                    <li>
                                                        <i className="ti-close unavailable"></i>
                                                        Clean sorem ipsum morbin{" "}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="pricing-card">
                                            <img
                                                src="/images/img/pricing/1.jpg"
                                                alt=""
                                            />
                                            <div className="desc">
                                                <div className="name">
                                                    Room cleaning{" "}
                                                </div>
                                                <div className="amount">
                                                    $50 <span>/ month </span>
                                                </div>
                                                <ul className="list-unstyled list">
                                                    <li>
                                                        <i className="ti-check"></i>{" "}
                                                        Hotel ut nisan ___ duru{" "}
                                                    </li>
                                                    <li>
                                                        <i className="ti-check"></i>{" "}
                                                        Orci miss natoque ____
                                                        ince{" "}
                                                    </li>
                                                    <li>
                                                        <i className="ti-close unavailable"></i>
                                                        Clean sorem ipsum morbin{" "}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
