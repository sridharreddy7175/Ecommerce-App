import Axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";

const Shop = () => {
    const [products, setProducts] = useState([]);

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
    return (
        <div className="container mt-2 ">
            <h3 className="mb-4">Welcome to the Store</h3>
            <div className="row text-center">
                {products?.map((product, index) => {
                    return (
                        <div className="row">
                            <div key={index} className="col-md-3 mb-4 mr-4">
                                <Card product={product} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Shop;
