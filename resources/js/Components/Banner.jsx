import { Link } from "@inertiajs/react";
import banner from "../../../public/images/web-hosting-nanhost.png";
const Banner = () => {
    return (
        <>
            <div
                className="homeBannerPart"
                style={{
                    backgroundImage: `url(${banner})`,
                    backgroundPosition: "center",
                }}
            >
                <div className="bannerOverly">
                    <div className="container">
                        <h1>Secure and Reliable Hosting Providers</h1>
                        <p>For Your Business</p>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="bannerGrid">
                                    <ul>
                                        <li>
                                            <Link to="#">
                                                No hidden Policy, No extra
                                                charge
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Most Powerful Hosting
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">Fast Web Hosting</Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                99.9% Uptime Commitment
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Softaculous Available || One
                                                lick Installer
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Easy & Flexible Policy
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="bannerGrid">
                                    <ul>
                                        <li>
                                            <Link to="#">
                                                No hidden Policy, No extra
                                                charge
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Most Powerful Hosting
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">Fast Web Hosting</Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                99.9% Uptime Commitment
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Softaculous Available || One
                                                lick Installer
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                Easy & Flexible Policy
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
