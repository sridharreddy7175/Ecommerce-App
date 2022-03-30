import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillLinkedin, AiFillGoogleCircle } from "react-icons/ai";

export const Footer = () => {
    return (
        <div>
            <div className="footer1">
                <div className="container text-left">
                    <div className="row">
                        <div className="col-md-4 footer2 text-left">
                            <h6 className="text-white">
                                <a href="/" className="text-white">
                                    INFORMATION
                                </a>
                            </h6>
                            <a href="/">
                                <p className="text-white mt-3">About Us</p>
                            </a>
                            <a href="/">
                                {" "}
                                <p className="text-white mt-3">Privacy Policy</p>
                            </a>

                            <p className="text-white mt-2">
                                <a href="/" className="text-white">
                                    Terms & Conditions
                                </a>
                            </p>
                            <a href="/">
                                {" "}
                                <p className="text-white mt-3">FAQS</p>
                            </a>
                            <a href="/">
                                {" "}
                                <p className="text-white mt-3">Careers</p>
                            </a>
                            <a href="/">
                                {" "}
                                <p className="text-white mt-3">Store Locator</p>
                            </a>
                        </div>
                        <div className="col-md-4 footer2 text-left">
                            <h6 className="text-white">BUYING GUIDE</h6>

                            <Link to="/about" className="mt-4">
                                <p className="text-white">Shipping</p>
                            </Link>
                            <Link to="/courses" className="mt-2">
                                <p className="text-white">Returns</p>
                            </Link>
                            <Link to="/bolg" className="mt-2">
                                <p className="text-white">
                                    Cancellation, Return, Exchange & Refund
                                </p>
                            </Link>
                            <Link to="/contact" className="mt-2">
                                <p className="text-white">Contact Us</p>
                            </Link>
                        </div>

                        <div className="col-md-4 footer2 text-left pb-3">
                            <h5 className="text-white">NEWSLETTER
                            </h5>
                            <p className="text-white mt-2">
                                Contrary to popular belief of lorem Ipsm Latin amet ltin from
                                consectetur industry.
                            </p>
                            <div className="newsletter_form form_style2 mb-4">
                                <form>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email Address"
                                    />
                                    <button
                                        type="submit"
                                        title="Subscribe"
                                        className="btn btn-default btn-sm rounded-0"
                                        name="submit"
                                        value="Submit"
                                    >
                                        {" "}
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                            <h3 className="mt-2 text-white">Follow Us</h3>
                            <span className="text-white" style={{ fontSize: "20px" }}>
                                <FaFacebook />
                            </span>
                            &nbsp;&nbsp;
                            <span className="text-white" style={{ fontSize: "20px" }}>
                                <AiFillTwitterCircle />
                            </span>
                            &nbsp;&nbsp;
                            <span className="text-white" style={{ fontSize: "20px" }}>
                                <AiFillLinkedin />
                            </span>
                            &nbsp;&nbsp;
                            <span className="text-white" style={{ fontSize: "20px" }}>
                                <AiFillGoogleCircle />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer3">
                <div className="p-3 mb-2 bg-dark text-white">
                    <div className="container">
                        <h6>© 2020 Deva | All Rights Reserved | Shopify</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};
