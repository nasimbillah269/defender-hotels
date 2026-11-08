import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

export default function OurClient() {
    return (
        <>
            <section className="clients">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="owl-carousel owl-theme">
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <div className="clients-logo">
                                            <a href="#0">
                                                <img
                                                    src="/images/img/clients/1.png"
                                                    alt="client"
                                                />
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="clients-logo">
                                            <a href="#0">
                                                <img
                                                    src="/images/img/clients/2.png"
                                                    alt="client"
                                                />
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="clients-logo">
                                            <a href="#0">
                                                <img
                                                    src="/images/img/clients/3.png"
                                                    alt="client"
                                                />
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="clients-logo">
                                            <a href="#0">
                                                <img
                                                    src="/images/img/clients/4.png"
                                                    alt="client"
                                                />
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="clients-logo">
                                            <a href="#0">
                                                <img
                                                    src="/images/img/clients/5.png"
                                                    alt="client"
                                                />
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="clients-logo">
                                            <a href="#0">
                                                <img
                                                    src="/images/img/clients/6.png"
                                                    alt="client"
                                                />
                                            </a>
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
