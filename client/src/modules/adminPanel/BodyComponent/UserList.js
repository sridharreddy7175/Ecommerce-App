import Axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const CategoriesList = (props) => {
    const [users, setUsers] = useState([]);
    const [clickable, setClickable] = useState(false);
    let count = 0;

    const getCategories = async () => {
        try {
            const data = await Axios.get("http://localhost:8000/api/users");

            setUsers(data.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getCategories();
    }, [clickable]);

    useEffect(() => { }, []);
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
        <div className="container">
            <h4 className="mt-3 mb-3">UsersList </h4>
            <div className="card w-100">
                <div className="card-header">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Start typing to search for customers"
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
                                <th scope="col">Registered</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((cat) => {
                                return (
                                    <tr key={cat._id}>
                                        {cat.role === 1 ? null : (
                                            <>
                                                <th scope="row">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="exampleCheck1"
                                                    />
                                                    {count++}
                                                </th>

                                                <td>{cat.name}</td>
                                                <td>{cat.createdAt?.slice(0, 10)}</td>

                                                <td>{cat.email}</td>
                                                <td>{cat.phone}</td>
                                            </>
                                        )}
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
