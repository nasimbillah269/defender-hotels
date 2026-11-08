import MainLayout from "@/Layouts/MainLayout";
import BlogGrid from "@/Components/BlogGrid";
import HotelBookingForm from "@/Components/HotelBookingForm";
import Pagination from "@/Components/Pagination";
import { Head } from "@inertiajs/react";
import banner from "../../../public/images/new/header/header.png";

/**
 * Blog listing page (/blog).
 * Posts come from Admin > Blog (posts.type = 4).
 */
export default function Blogs({
  general,
  headerMenu,
  footerMenu2,
  footerMenu3,
  footerMenu4,
  page,
  posts,
  auth,
  servicesList,
}) {
  const items = posts?.data ?? [];

  return (
    <MainLayout
      auth={auth}
      general={general}
      headerMenu={headerMenu}
      footerMenu2={footerMenu2}
      footerMenu3={footerMenu3}
      footerMenu4={footerMenu4}
    >
      <Head title={`${page?.name || "Blog"} | Defender Hotels & Resorts`} />

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
            <h1 className="mt-4">{page?.name || "Blog"}</h1>
          </div>
        </div>
      </div>

      <section className="dh-section dh-section--blue">
        <div className="container">
          <div className="dh-head" data-aos="fade-up">
            <p className="dh-kicker">Hotels &amp; Resorts Blogs</p>
            <h2 className="dh-title">
              Insights, Ideas &amp; Inspiration <br /> for Better Investments.
            </h2>
            <p className="dh-text">
              Explore the latest insights on hospitality, tourism, lifestyle, and investment
              opportunities. Stay informed with expert perspectives, industry trends, and updates
              from Defender Hotels &amp; Resorts.
            </p>
          </div>

          <div className="row g-4 gy-5 dh-blog-grid">
            {items.map((post, index) => (
              <div
                key={post.id ?? post.slug ?? index}
                className="col-sm-6 col-lg-4"
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 80}
              >
                <BlogGrid post={post} variant="blog" />
              </div>
            ))}
          </div>

          {items.length === 0 && (
            <p className="dh-text dh-center">No blogs published yet. Please check back soon.</p>
          )}

          {posts?.last_page > 1 && (
            <div className="mt-5">
              <Pagination pagination={posts} />
            </div>
          )}
        </div>
      </section>

      <HotelBookingForm servicesList={servicesList} />
    </MainLayout>
  );
}
