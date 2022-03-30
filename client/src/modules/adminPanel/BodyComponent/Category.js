import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

const Category = (props) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    );

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    };

    console.log("props", props?.details?.user?.token);

    const onSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        let body = {
            name: name,
        };
        try {
            const data = await Axios.post(
                `http://localhost:8000/api/category/create/${props?.details?.user?.user?._id}`,
                body,
                {
                    headers: {
                        Authorization: "Bearer " + props?.details?.user?.token,
                    },
                }
            );
            console.log("data", data);
            setSuccess(true);
            setError("");
            setName("");
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">Category created successfully</h4>;
        }
    };

    const warningMessage = () => {
        if (error) {
            return <h4 className="text-success">Failed to create category</h4>;
        }
    };

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input
                    type="text"
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder="For Ex. Summer"
                />
                <button onClick={onSubmit} className="btn btn-outline-info">
                    Create Category
                </button>
            </div>
        </form>
    );

    return (
        <div className="container">
            <h3 className="text-center pt-3">Create a category here</h3>
            <p className="text-center pb-3">Add a new category for new tshirts</p>
            <div className="container bg-info p-4">
                <div className="row bg-white rounded">
                    <div className="col-md-8 offset-md-2">
                        {successMessage()}
                        {warningMessage()}
                        {myCategoryForm()}
                        {goBack()}
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
)(Category);
