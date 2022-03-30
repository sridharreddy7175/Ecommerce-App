import Axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

const CreateProduct = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const [stock, setStock] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [createdProduct, setCreateProduct] = useState("");
    const [categories, setCategories] = useState([]);
    const { id } = useParams();


    const getCategories = async () => {
        try {
            const data = await Axios.get("http://localhost:8000/api/categories");

            setCategories(data.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getCategories()
    }, [])

    const getProduct = async () => {
        try {
            var resProducts = await fetch(`http://localhost:8000/api/product/${id}`);
            var response = await resProducts.json();
            console.log("res", response);
            setName(response.name);
            setPrice(response.price);
            setDescription(response.description);
            setCategory(response.category);
            setStock(response.stock);
            setPhoto(response.photo);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getProduct();
    }, []);

    const handlePhoto = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setPhoto(file);
        };

        reader.readAsDataURL(file);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setError("");
        // setSuccess(false);
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("stock", stock);
        setLoading(true);

        try {
            const data = await Axios.put(
                `http://localhost:8000/api/product/${id}/${props?.details?.user?.user?._id}`,
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + props?.details?.user?.token,
                    },
                }
            );
            console.log("data", data);
            // setSuccess(true);
            setLoading(false);
            setError("");
            setName("");
            setPhoto("");
            setPrice("");
            setStock("");
            setDescription("");
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    const createProductForm = () => (
        <form>
            <div className="form-group pt-3">
                <label className="btn btn-block btn-success">
                    <input
                        // onChange={handleChange("photo")}
                        onChange={handlePhoto}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={(e) => setName(e.target.value)}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories &&
                        categories.map((cate, index) => (
                            <option key={index} value={cate._id}>
                                {cate.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={(e) => setStock(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Stock"
                    value={stock}
                />
            </div>

            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-success mb-3"
            >
                Update Product
            </button>
        </form>
    );

    return (
        <div className="pb-5">
            <h3 className="text-center pt-1">Edit a product here!</h3>
            <p className="text-center pb-1">Welcome to product creation section</p>
            <div className="container bg-info p-4">
                <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                    Admin Home
                </Link>
                <div className="row bg-dark text-white rounded">
                    <div className="col-md-8 offset-md-2">
                        {/* {successMessage()} */}
                        {createProductForm()}
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
)(CreateProduct);
