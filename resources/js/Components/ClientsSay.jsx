import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

/**
 * Testimonials – "What They're Talking About Defender?"
 * Centered carousel: the active card is highlighted, neighbours are scaled down.
 * Visibility is still controlled from admin via general.reviewStatus.
 */
const TESTIMONIALS = [
  {
    id: "t1",
    name: "Mehedi Hasan",
    org: "Dhaka, Bangladesh",
    role: "Investor",
    text:
      "From the first conversation, the Defender team was transparent and professional. The investment details were clearly explained, and the process felt structured and trustworthy.",
  },
  {
    id: "t2",
    name: "Farzana Ahmed",
    org: "Chattogram, Bangladesh",
    role: "Client",
    text:
      "The project presentation was well-prepared and realistic. What impressed me most was the team's responsiveness and the clarity around ownership options. It felt like a premium experience.",
  },
  {
    id: "t3",
    name: "Shahriar Kabir",
    org: "Uttara, Dhaka",
    role: "Investor",
    text:
      "Defender Hotels & Resorts maintains a professional approach—proper documentation, clear communication, and a strong focus on long-term value. A smooth and confidence-building journey.",
  },
  {
    id: "t4",
    name: "Nusrat Jahan",
    org: "Sylhet, Bangladesh",
    role: "Client",
    text:
      "I liked how patiently the team answered every question. The ownership categories and benefits were explained clearly, and follow-ups were always on time.",
  },
  {
    id: "t5",
    name: "Sadia Rahman",
    org: "London, UK (NRI)",
    role: "NRI Investor",
    text:
      "Being abroad, I needed a team that communicates clearly and provides documentation properly. Defender's team was consistent, professional, and quick to respond.",
  },
  {
    id: "t6",
    name: "Kazi Mahmud",
    org: "Toronto, Canada (NRI)",
    role: "NRI Investor",
    text:
      "The transparency in ownership terms and the structured approach stood out. Even from overseas, I felt supported throughout the inquiry process.",
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function ClientsSay({ general }) {
  if (!general?.reviewStatus) return null;

  return (
    <section className="dh-section dh-section--blue dh-testi">
      <div className="container">
        <div className="dh-center dh-head mb-2" data-aos="fade-up">
          <p className="dh-kicker">Testimonials</p>
          <h2 className="dh-title">
            What They&rsquo;re Talking <br /> About Defender?
          </h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          centeredSlides
          loop
          spaceBetween={18}
          slidesPerView={1.1}
          breakpoints={{ 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="dh-testi__card">
                <p className="dh-testi__text">{t.text}</p>
                <div className="dh-testi__person">
                  <span className="dh-testi__avatar" aria-hidden="true">
                    {initials(t.name)}
                  </span>
                  <div>
                    <div className="dh-testi__stars" aria-label="5 out of 5">★★★★★</div>
                    <p className="dh-testi__name">{t.name}</p>
                    <p className="dh-testi__org">{t.org}</p>
                    <p className="dh-testi__role">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
