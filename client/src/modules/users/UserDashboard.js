import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import image1 from "../../images/order.png";
import image2 from "../../images/settings.png";
import image3 from "../../images/map.png";

const UserDashboard = (props) => {
    return (
        <div className="container">
            <div className="mt-3">
                <span>
                    Home / <Link to="/user">Dashboard</Link>
                </span>
            </div>
            <div
                className="mt-5 card-profile"
                style={{
                    border: "1px solid black",
                }}
            >
                <h6 className="pl-2">
                    Name:-
                    <b>{props?.details?.user?.user?.name}</b>
                </h6>
                <h6 className="pr-2">
                    Order:-
                    &nbsp; 0 orders
                </h6>
                <h6 className="p1-2">
                    Member Since:
                    <b> {props?.details?.user?.user?.createdAt?.slice(0, 4)}</b>
                </h6>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card1 pt-2">
                            <div style={{ display: "flex" }}>
                                <img src={image1} className="ml-2" width="65px" alt="" />
                                <h5 className="ml-4 mt-3">
                                    <Link to="/user/order">Your Orders</Link>
                                </h5>
                            </div>
                            <h6 className="text-center pb-5 ml-5">
                                {" "}
                                <span>Track, Return or buy things again</span>
                            </h6>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card1 pt-2 pr-2">
                            <div style={{ display: "flex" }}>
                                <img src={image2} className="ml-2" width="65px" alt="" />
                                <h5 className="ml-5 mt-3">
                                    <Link to="/user/profile">Your Profile</Link>
                                </h5>
                            </div>
                            <h6 className="text-center pb-4 ml-5">
                                {" "}
                                <span>
                                    Edit Login Details, name and
                                    <br />
                                    mobile number
                                </span>
                            </h6>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card1 pt-2">
                            <div style={{ display: "flex" }}>
                                <img src={image3} className="ml-2" width="65px" alt="" />
                                <h5 className="ml-4 mt-3">
                                    <Link to="/">Your Address</Link>
                                </h5>
                            </div>
                            <h6 className="text-center pb-5 ml-5">
                                {" "}
                                <span>Edit Address for orders and gifts</span>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(
    (state) => ({
        details: state.user,
    }),

    {}
)(UserDashboard);
