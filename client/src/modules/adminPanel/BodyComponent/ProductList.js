import Axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    const [clickable, setClickable] = useState(false);
    let count = 0;

    const getProducts = async () => {
        try {
            const data = await Axios.get("http://localhost:8000/api/products");

            setProducts(data.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => { }, []);
    const submit = () => {
        setClickable(!clickable);
    };

    let Submitdelete = async (id) => {
        console.log("ccc", id);
        try {
            const data = await Axios.delete(
                `http://localhost:8000/api/product/${id}/${props?.details?.user?.user?._id}`,

                {
                    headers: {
                        Authorization: "Bearer " + props?.details?.user?.token,
                    },
                }
            );
            console.log("data", data);
            getProducts();
        } catch (err) {
            // setError(true);
            console.log(err);
        }
    };

    return (
        <div>
            <div className="card w-100">
                <div className="card-header">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Start typing to search for products"
                        />
                    </div>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="exampleCheck1"
                                    />
                                    S.no
                                </th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((cat) => {
                                let id = cat._id;
                                return (
                                    <tr key={cat._id}>
                                        <th scope="row">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="exampleCheck1"
                                            />
                                            {count++}
                                        </th>
                                        <td>{cat.name}</td>
                                        <td>{cat.price}</td>
                                        <td>{cat.stock}</td>
                                        <td>
                                            <Link to={`/admin/editproduct/${cat._id}`} className="btn btn-success">
                                                Update
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => Submitdelete(id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
)(ProductList);
