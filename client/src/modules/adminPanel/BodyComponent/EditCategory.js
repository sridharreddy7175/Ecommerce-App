import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

const EditCategory = (props) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const getCategory = async () => {
        try {
            var resProducts = await fetch(`http://localhost:8000/api/category/${id}`);
            var response = await resProducts.json();
            setName(response.name);
            // console.log("response123", response);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getCategory();
    }, []);

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



    const onSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        let body = {
            name: name,
        };
        try {
            const data = await Axios.put(
                `http://localhost:8000/api/category/${id}/${props?.details?.user?.user?._id}`,
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
            return <h4 className="text-success">UpdateCategory successfully</h4>;
        }
    };

    const warningMessage = () => {
        if (error) {
            return <h4 className="text-success">Failed to update category</h4>;
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
                    Update Category
                </button>
            </div>
        </form>
    );

    return (
        <div className="container">
            <h3 className="text-center pt-3">Update a category here</h3>
            <p className="text-center pb-3">Add a new  Update category for new tshirts</p>
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
)(EditCategory);
