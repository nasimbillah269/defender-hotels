import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Keyboard, Navigation, Pagination, Scrollbar } from "swiper/modules";
import BlogGrid from "./BlogGrid";

export default function OurNews({posts}) {
    return (
        <>
            <section className="news section-padding bg-darkblack">
                <div className="container">
                    <div className="row">
                        
                            {posts.map( (post, index) =>
                                <div className="col-md-3"  data-aos="fade" >
                                 <BlogGrid post={post} />
                                </div>
                            )}
                            {/* <div className="owl-carousel owl-theme">
                                <Swiper
                                    slidesPerView={3}
                                    centeredSlides={false}
                                    slidesPerGroupSkip={1}
                                    grabCursor={true}
                                    keyboard={{
                                        enabled: true,
                                    }}
                                    breakpoints={{
                                        769: {
                                            slidesPerView: 3,
                                            slidesPerGroup: 1,
                                        },
                                    }}
                                    scrollbar={true}
                                    navigation={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[
                                        Keyboard,
                                        Scrollbar,
                                        Navigation,
                                        Pagination,
                                        
                                    ]}
                                    className="mySwiper"
                                >
                                    {posts.map( (post) =>
                                        <SwiperSlide>
                                            <BlogGrid post={post} />
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div> */}
                        </div>
                  
                </div>
            </section>
        </>
    );
}
