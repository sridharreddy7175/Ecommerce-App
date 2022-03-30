import React from "react";
import { Link, useHistory } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { connect } from "react-redux";
import { signoutUser } from "../../redux/modules/signin/signin_actions";

const Navbar = (props) => {
    let history = useHistory();

    const logout = () => {
        props.signoutUser();
        history.push("/");
    };

    return (
        <div>
            <nav
                className="navbar navbar-expand-lg navbar-light"
                style={{
                    backgroundColor: "#1B2D2D",
                    fontFamily: "cursive",
                }}
            >
                <div className="container">
                    <Link
                        className="navbar-brand text-white"
                        to="/"
                        style={{ fontSize: "25px" }}
                    >
                        {/* <img
                            src="navbar.png"
                            alt=""
                            width="100px"
                            style={{
                                backgroundColor: "whitesmoke",
                            }}
                        /> */}
                        Deva
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav  mx-auto">
                            <li className="nav-item active">
                                <form className="form-inline my-2 my-lg-0 w-100">
                                    <input
                                        className="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                </form>
                            </li>
                        </ul>

                        {props?.details?.user?.user?.msg === "success" ? (
                            <>
                                {props?.details?.user?.user?.role === 1 ? (
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link " to="/shop">
                                                <AiOutlineShop
                                                    style={{
                                                        fontSize: "30px",
                                                        color: "whitesmoke",
                                                    }}
                                                />
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link " to="/admin/dashboard">
                                                <FaUserCircle
                                                    style={{ fontSize: "30px", color: "whitesmoke" }}
                                                />
                                            </Link>
                                        </li>
                                        <li className="nav-item" onClick={() => logout()}>
                                            <Link className="nav-link " to="/user">
                                                <AiOutlineLogout
                                                    style={{ fontSize: "30px", color: "whitesmoke" }}
                                                />
                                            </Link>
                                        </li>
                                    </ul>
                                ) : (
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link " to="/cart">
                                                <BsCartFill
                                                    style={{ fontSize: "30px", color: "whitesmoke" }}
                                                />
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link " to="/shop">
                                                <AiOutlineShop
                                                    style={{ fontSize: "30px", color: "whitesmoke" }}
                                                />
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link " to="/user/dashboard">
                                                <FaUserCircle
                                                    style={{ fontSize: "30px", color: "whitesmoke" }}
                                                />
                                            </Link>
                                        </li>
                                        <li className="nav-item" onClick={() => logout()}>
                                            <Link className="nav-link " to="/user">
                                                <AiOutlineLogout
                                                    style={{ fontSize: "30px", color: "whitesmoke" }}
                                                />
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </>
                        ) : (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link " to="/cart">
                                        <BsCartFill
                                            style={{ fontSize: "30px", color: "whitesmoke" }}
                                        />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/shop">
                                        <AiOutlineShop
                                            style={{ fontSize: "30px", color: "whitesmoke" }}
                                        />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/login">
                                        <AiOutlineUser
                                            style={{ fontSize: "30px", color: "whitesmoke" }}
                                        />
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default connect(
    (state) => ({
        details: state.user,
    }),

    { signoutUser }
)(Navbar);
