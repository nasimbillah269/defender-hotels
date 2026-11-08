import React from "react";
import Slider from "react-slick";

export default function HomeSliderComponent({ sliders }) {
  const settings = {
    infinite: true,
    fade: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    pauseOnHover: false,
  };

  return (
    <Slider {...settings} style={{ background: "white", borderColor: "#ffffff" }}>
      {sliders.map((slider, index) => (
        <div key={slider.id ?? slider.image_url ?? index} className="slide">
          <img
            src={slider.image_url}
            alt={slider.name}
            loading="lazy"
            decoding="async"
          />

        </div>
      ))}
    </Slider>
  );
}
