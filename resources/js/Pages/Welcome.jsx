import ChooseUs from "@/Components/ChooseUs";
import ClientsSay from "@/Components/ClientsSay";
import DiscountOffers from "@/Components/DiscountOffers";
import HomeBannerBookingForm from "@/Components/HomeBannerBookingForm";
import HomeSliderComponet from "@/Components/HomeSliderCoponent";
import HotelBookingForm from "@/Components/HotelBookingForm";
import HotelFacilities from "@/Components/HotelFacilities";
import InvestorVideos from "@/Components/InvestorVideos";
import Luxury from "@/Components/Luxury";
import OurNews from "@/Components/OurNews";
import ProjectsInvestments from "@/Components/ProjectsInvestments";
import RoomsSuites from "@/Components/RoomsSuites";
import VideoPalyer from "@/Components/VideoPalyer";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function Welcome({
    general,
    headerMenu,
    footerMenu2,
    footerMenu3,
    footerMenu4,
    posts,
    services,
    services2,
    servicesList,
    bookingUrl,
    categores,
    auth,
    sliders,
  
}) {

    return (
        <>
        <Head>
            <title>Luxury Hotel Investment in Bangladesh | Defender Hotels & Resorts</title>
            <meta
                name="description"
                content="Invest in premium hotel suites with Defender Hotels & Resorts. Secure, high-return hospitality investments in Bangladesh."
            />

            <meta property="og:title" content="Luxury Hotel Investment | Defender Hotels & Resorts" />
            <meta
                property="og:description"
                content="Premium hotel investment opportunities with guaranteed returns and luxury hospitality management."
            />
        </Head>

            <MainLayout auth={auth} general={general} headerMenu={headerMenu} footerMenu2={footerMenu2} footerMenu3={footerMenu3} footerMenu4={footerMenu4} >
                <Head title={general.title} />
                {/* <VideoPalyer /> */}
                <HomeSliderComponet sliders={sliders}/>
                <HomeBannerBookingForm bookingUrl={bookingUrl} servicesList={servicesList} />
                <Luxury />
                <ProjectsInvestments />
                <RoomsSuites services={services} services2={services2} />
                <ChooseUs />
                <DiscountOffers />
                {/* FAQ section */}
                <HotelFacilities />
                <ClientsSay general={general} />
                <InvestorVideos />
                {/* <OurNews posts={posts} /> */}
                <HotelBookingForm  servicesList={servicesList} />
            </MainLayout>
        </>
    );
}
