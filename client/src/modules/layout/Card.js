import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";

const Card = (props) => {
    const [reDirect, setReDirect] = useState(false);
    console.log("id", props);
    let history = useHistory();

    const addToCart = async (id, name, price) => {
        let body = {
            id: props?.details?.user?.user?._id,
            productId: id,
            quantity: 1,
            name: name,
            price: price,
        };
        // console.log("body", body);

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
                // console.log("data", data);
                if (data.data.active === true) {
                    history.push("/cart");
                }
            } catch (err) {
                // setError(true);
                console.log(err);
            }
        }

    };

    return (
        <div className="">
            <div className="card">
                <Link to={`/user/product/${props.product._id}`}>
                    <img
                        className="card-img-top"
                        src={`http://localhost:8000/api/product/photo/${props.product._id}`}
                        width="300px"
                        alt="Card image cap"
                    />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{props.product.name}</h5>
                    <p className="card-text">
                        <b>&#x20b9; {props.product.price}</b>
                    </p>
                    <div className="row">
                        <button
                            type="button"
                            onClick={() =>
                                addToCart(
                                    props.product._id,
                                    props.product.name,
                                    props.product.price
                                )
                            }
                            className="btn btn-block btn-outline-success mt-2 mb-2"
                        >
                            AddToCart
                        </button>
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
)(Card);
