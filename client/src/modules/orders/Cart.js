import Axios from "axios";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = (props) => {
    const [products, setProducts] = useState([]);
    const [value, setValue] = useState(1)

    useEffect(() => {
        getAddToCart();
    }, []);

    const getAddToCart = async () => {
        let body = {
            userId: props?.details?.user?.user?._id,
        };
        console.log("body", body);
        try {
            const data = await Axios.post(
                "http://localhost:8000/api/getproduct/cart",
                body
            );
            console.log("data", data.data);
            setProducts(data.data);
        } catch (err) {
            // setError(true);
            console.log(err);
        }
    };

    const remove = async (id) => {
        let body = {
            userId: props?.details?.user?.user?._id,
            productId: id,
        };
        console.log("body", body);
        try {
            const data = await Axios.post(
                "http://localhost:8000/api/getproductdelete",
                body
            );
            console.log("data", data.data);
            setProducts(data.data);
        } catch (err) {
            // setError(true);
            console.log(err);
        }
    };

    const loadAllProducts = () => {
        return (
            <div>
                {/* <h2>This section is to load products</h2> */}
                {products.length >= 1 ? (
                    <>
                        <table className="table table-striped table-dark">
                            <thead className="">
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Count</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => {
                                    return p.products.map((c) => {
                                        console.log("c", c);
                                        return (
                                            <tr>
                                                <td>
                                                    <img
                                                        className=""
                                                        src={`http://localhost:8000/api/product/photo/${c.productId}`}
                                                        width="50px"
                                                        alt=""
                                                    />
                                                </td>
                                                <td>{c.name}</td>
                                                <td>&#x20b9; {c.price}</td>
                                                <td>
                                                    <input type="number" value={value}

                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-block btn-outline-success mt-2 mb-2"
                                                        onClick={() => remove(c.productId)}
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    });
                                })}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <>
                        <h6>
                            <b className="pb-2">Cart / 0 Product</b>
                            <br />
                            <br />
                            No products in cart. <Link to="/shop">Continue shopping</Link>
                        </h6>
                    </>
                )}
            </div>
        );
    };
    const loadCheckout = () => {
        return (
            <div className="mt-2">

                <h4>Order Summary</h4>
                <hr />
                <h6>Products
                </h6>
                <hr />
                <h6>Total: $0</h6>
                <hr />
                <Link to='/'>Login to the CheckOut</Link>

            </div>
        );
    };

    return (
        <div className="container-fluid mt-2 ">
            <div className="row">
                <div className="col-md-8 pt-2">{loadAllProducts()}</div>
                <div className="col-md-4">{loadCheckout()}</div>
            </div>
        </div>
    );
};

export default connect(
    (state) => ({
        details: state.user,
    }),

    {}
)(Cart);
