import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Inertia } from '@inertiajs/inertia';
import AOS from 'aos';
import { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
export default function MainLayout({ 
    children,  
    general,
    auth,
    headerMenu, 
    footerMenu2,
    footerMenu3,
    footerMenu4
}) {
const { url } = usePage();
    useEffect(() => {
        // Initialize AOS with options
        AOS.init({
          duration: 1500, // Animation duration
          once: true,     // Whether animation should happen only once
          easing: 'ease-in-out',
        });
    
        // Refresh AOS on every Inertia navigation
        const unlisten = Inertia.on('navigate', () => {
          AOS.refresh();
        });
    
        return () => unlisten(); // Clean up event listener on unmount
      }, []);


    return (
        <>
        <Head>
            {/* Primary SEO */}
            <title>Defender Hotels & Resorts</title>
            <meta
              name="description"
              content="Defender Hotels & Resorts offers premium hospitality investments, luxury suites, and world-class resort experiences."
            />

            {/* Canonical */}
            <link rel="canonical" href={`https://defenderhotels.com${url}`} />

            {/* Open Graph (Facebook, LinkedIn) */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Defender Hotels & Resorts" />
            <meta property="og:title" content="Defender Hotels & Resorts" />
            <meta
              property="og:description"
              content="Premium hospitality investments and luxury resort experiences."
            />
            <meta
              property="og:image"
              content="https://defenderhotels.com/images/seo/og-image.jpeg"
            />
            <meta property="og:url" content={`https://defenderhotels.com${url}`} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Defender Hotels & Resorts" />
            <meta
              name="twitter:description"
              content="Premium hospitality investments and luxury resort experiences."
            />
            <meta
              name="twitter:image"
              content="https://defenderhotels.com/images/seo/og-image.jpeg"
            />
          </Head>

            <Header auth={auth} general={general} headerMenu={headerMenu} />
            <main>{children}</main>
            <Footer  general={general} footerMenu2={ footerMenu2} footerMenu3={footerMenu3} footerMenu4={footerMenu4}/>
        
      {/* ================= MOBILE STICKY CTA ================= */}
      <div className="mobile-cta-bar d-sm-block d-md-none">
        <a href="/invest-now">Invest Now</a>
      </div>
</>
    );
}
