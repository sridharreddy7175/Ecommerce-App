import Axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const CategoriesList = (props) => {
    const [categories, setCategories] = useState([]);
    const [clickable, setClickable] = useState(false);
    let count = 0;

    const getCategories = async () => {
        try {
            const data = await Axios.get("http://localhost:8000/api/categories");

            setCategories(data.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getCategories();
    }, [clickable]);

    useEffect(() => {

    }, []);
    const submit = () => {
        setClickable(!clickable);
    };

    let Submitdelete = async (id) => {
        console.log("ccc", id);
        try {
            const data = await Axios.delete(
                `http://localhost:8000/api/category/${id}/${props?.details?.user?.user?._id}`,

                {
                    headers: {
                        Authorization: "Bearer " + props?.details?.user?.token,
                    },
                }
            );
            console.log("data", data);
            getCategories();
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
                            placeholder="Start typing to search for categories"
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
                                <th scope="col">Count</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => {
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
                                        <td>0</td>
                                        <td>{cat.createdAt?.slice(0, 4)}</td>
                                        <td>
                                            <button
                                                style={{ display: "flex" }}
                                                onClick={() => submit()}
                                            >
                                                ...
                                            </button>
                                            {clickable ? (
                                                <>
                                                    <Link to={`/admin/editcategory/${cat._id}`}>
                                                        Edit
                                                    </Link>
                                                    <br />
                                                    <button onClick={() => Submitdelete(id)}>
                                                        Delete
                                                    </button>
                                                </>
                                            ) : null}
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
)(CategoriesList);
