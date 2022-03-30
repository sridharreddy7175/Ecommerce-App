import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Axios from "axios";

const SignalProduct = (props) => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory()

    const getProduct = async () => {
        try {
            var resProducts = await fetch(`http://localhost:8000/api/product/${id}`);
            var response = await resProducts.json();
            console.log("res", response);
            setName(response.name);
            setPrice(response.price);
            setDescription(response.description);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getProduct();
    }, []);

    const addToCart = async (id, name, price) => {
        let body = {
            id: props?.details?.user?.user?._id,
            productId: id,
            quantity: 1,
            name: name,
            price: price,
        };
        console.log("body", body);

        if (!props?.details?.user?.user?._id) {
            // alert("Please login")
            history.push("/login");
        }
        else {
            try {
                const data = await Axios.post(
                    "http://localhost:8000/api/product/cart",
                    body
                );
                console.log("data", data);
                if (data.data.active === true) {
                    history.push("/cart");
                }
                else {
                    alert("Please Login")

                }
            } catch (err) {
                // setError(true);
                console.log(err);
            }
        }
    };

    return (
        <div className="container mb-5">
            <div className="mt-3">
                <span>
                    Home / <Link to="/shop">Products </Link>/ {name}
                </span>
            </div>
            <div className="mt-3 card-product rounded">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 pt-3 pb-3 text-left">
                            <img
                                src={`http://localhost:8000/api/product/photo/${id}`}
                                alt=""
                                width="100%"
                                height="100%"
                                className="rounded"
                            />
                        </div>
                        <div className="col-md-6">
                            <h5 className="pt-3">{name}</h5>
                            <h6 className="pt-1">Brand : Not Set</h6>
                            <hr />
                            <h4>
                                <b>{price}</b>
                            </h4>
                            <div>
                                <button className="mr-4 plusButton">+</button>
                                <button className="plusButton">-</button>
                            </div>
                            <button
                                className="addtocartbutton"
                                onClick={() => addToCart(id, name, price)}
                            >
                                ADD TO CART
                            </button>
                            <button className="addtocartbutton">BUY NOW</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 card-product rounded">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a
                            className="nav-link active"
                            id="home-tab"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                        >
                            DESCRIPTION
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="profile-tab"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                        >
                            CUSTOMER FEEDBACK
                        </a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div
                        className="tab-pane fade show active pt-3 pb-3 text-left pl-2"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                    >
                        {description}
                    </div>
                    <div
                        className="tab-pane fade pt-3 pb-3 text-left pl-2"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        Coming Soon
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
)(SignalProduct);
