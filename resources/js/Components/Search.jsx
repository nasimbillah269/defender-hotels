import { Link } from "@inertiajs/react";

const Search = () => {
    return (
        <>
            <div className="searchPart">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="searchDiv">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Your Domain Name"
                                    />
                                    <button
                                        className="input-group-text"
                                        id="basic-addon2"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="domainDiv">
                        <ul>
                            <li>
                                <Link to="#">
                                    <img src="/images/com-doamin.png" alt="" />
                                    <strong>$12.00</strong>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src="/images/net.png" alt="" />
                                    <strong>$13.00</strong>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src="/images/biz.png" alt="" />
                                    <strong>$14.00</strong>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src="/images/org1.png" alt="" />
                                    <strong>$14.00</strong>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src="/images/info-logo.png" alt="" />
                                    <strong>$12.00</strong>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
