import { Link } from "@inertiajs/react";
import {
    FaEnvelope,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";
import WhatsAppChatButton from "./WhatsAppChatButton";
const Footer = ({ general, footerMenu2, footerMenu3, footerMenu4}) => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer className="footer dh-footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4" data-aos="fade-up">
                                <div className="footerGrid">
                                    <div className="logoDiv">
                                        <img
                                            src={`/${general.logo}`}
                                            alt={general.title}
                                        />
                                    </div>
                                    <div className="footerContactInfo" style={{maxWidth: "287px"}}>
                                        <ul>
                                            <li>
                                                <div className="iconF">
                                                    <FaPhoneAlt />
                                                </div>
                                                <p>{general.mobile} </p>
                                            </li>
                                            <li>
                                                <div className="iconF">
                                                    <FaEnvelope />
                                                </div>
                                                <p> {general.email}</p>
                                            </li>
                                            <li>
                                                <div className="iconF">
                                                    <FaMapMarkerAlt />
                                                </div>
                                                <p>
                                                {general.address_one}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 col-6" data-aos="fade-up">
                            {footerMenu2 && footerMenu2.items && (
                                <div className="footerGrid">

                                    <h5>{footerMenu2.title}</h5>
                                    <div className="footerMenuLink">

                                        <ul>
                                        {footerMenu2.items.map((item, index) => (
                                                <li key={item.id ?? item.slug ?? index}>
                                                    <Link href={item.slug}>
                                                        {item.title}{" "}
                                                    </Link>
                                                </li>
                                            ))}
                                          
                                        </ul>
                                    </div>
                                </div>
                            )}
                            </div>
                            <div className="col-md-2 col-6" data-aos="fade-up">
                            {footerMenu3 && footerMenu3.items && (
                                <div className="footerGrid">

                                    <h5>{footerMenu3.title}</h5>
                                    <div className="footerMenuLink">

                                        <ul>
                                        {footerMenu3.items.map((item, index) => (
                                                <li key={item.id ?? item.slug ?? index}>
                                                    <Link href={item.slug}>
                                                        {item.title}{" "}
                                                    </Link>
                                                </li>
                                            ))}
                                          
                                        </ul>
                                    </div>
                                </div>
                            )}
                            </div>
                            <div className="col-md-2 col-6" data-aos="fade-up">
                            {footerMenu4 && footerMenu4.items && (
                                <div className="footerGrid">

                                    <h5>{footerMenu4.title}</h5>
                                    <div className="footerMenuLink">

                                        <ul>
                                        {footerMenu4.items.map((item, index) => (
                                                <li key={item.id ?? item.slug ?? index}>
                                                    <Link href={item.slug}>
                                                        {item.title}{" "}
                                                    </Link>
                                                </li>
                                            ))}
                                          
                                        </ul>
                                    </div>
                                </div>
                            )}
                                
                            </div>
                            <div className="col-md-2 col-6" data-aos="fade-up">
                                <div className="footerGrid">
                                    <div className="qrcode">
                                        <img src="/images/img/Defender_QR.png" alt="qrCode" loading="lazy" decoding="async" />
                                    </div>
                                    <div className="footerSocialLink">
                                        <ul>
                                        {general.facebook_link && (
                                                <li key="facebook">
                                                    <a
                                                        href={
                                                            general.facebook_link
                                                        }
                                                        target="_blank"
                                                    >
                                                        <FaFacebookF />
                                                    </a>
                                                </li>
                                            )}
                                           
                                        {general.linkedin_link && (
                                                <li key="linkedin">
                                                    <a
                                                        href={
                                                            general.linkedin_link
                                                        }
                                                         target="_blank"
                                                    >
                                                         <FaLinkedinIn />
                                                    </a>
                                                </li>
                                            )}
                                        {general.pinterest_link && (
                                                <li key="pinterest">
                                                    <a
                                                        href={
                                                            general.pinterest_link
                                                        }
                                                         target="_blank"
                                                    >
                                                         <FaWhatsapp />
                                                    </a>
                                                </li>
                                            )}
                                        {general.youtube_link && (
                                                <li key="youtube">
                                                    <a
                                                        href={
                                                            general.youtube_link
                                                        }
                                                         target="_blank"
                                                    >
                                                          <FaYoutube />
                                                    </a>
                                                </li>
                                            )}
                                        {general.instagram_link && (
                                                <li key="instagram">
                                                    <a
                                                        href={
                                                            general.instagram_link
                                                        }
                                                         target="_blank"
                                                    >
                                                          <FaInstagram />
                                                    </a>
                                                </li>
                                            )}
                                        
                                        
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="copyRigt">
                                    <p>
                                        <Link href="/">
                                            © {currentYear} Defender Hotel & Resorts Ltd.
                                                All Rights Reserved.
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="designText">
                                    <p>
                                        <a href="https://natoreit.com/" target="_blank" rel="noopener noreferrer">
                                            Powered By - Natore-IT
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <WhatsAppChatButton/>
            </footer>
        </>
    );
};

export default Footer;
