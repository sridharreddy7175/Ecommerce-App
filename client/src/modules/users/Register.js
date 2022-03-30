import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useHistory } from "react-router-dom";



const Register = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conformPassword, setConformPassword] = useState("");
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    let history = useHistory();
    toast.configure();

    const submit = (e) => {
        e.preventDefault();
        setSuccess(false)
        if (password !== conformPassword) {
            toast("Password Not Match");
        } else {
            var body = {
                name: firstName,
                lastName: lastName,
                email: email,
                password: password,
            };
            // console.log("body", body);

            axios
                .post("http://localhost:8000/api/signup", body)

                .then((res) => {
                    // console.log("res", res);
                    setSuccess(true)
                    setError("")
                    setFirstName("")
                    setLastName("")
                    setEmail("")
                    setPassword("")
                    setConformPassword("")
                    // if (res?.data?.status === true) {
                    //     toast.success("Success  !", {
                    //         position: toast.POSITION.TOP_CENTER,
                    //     });
                    //     navigate("/login");
                    // }
                })
                .catch((err) => {
                    // console.log("err", err.response.data);
                    // alert("Please enter the all details");
                    setError(err.response.data.error)
                });
        }
    };


    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        New account was created successfully. Please
                        <Link to="/login">Login Here</Link>
                    </div>
                </div>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    let signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div>
                        <input
                            name={firstName}
                            type="text"
                            value={firstName}
                            className="mb-3 w-100 p-2 mt-2"
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                        />
                        <br />

                        <input
                            name={lastName}
                            type="text"
                            value={lastName}
                            className="mb-3 w-100 p-2 mt-2"
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                        />
                        <br />

                        <input
                            name={email}
                            type="email"
                            value={email}
                            className="mb-3 w-100 p-2 mt-2"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />

                        <br />
                        <input
                            name={password}
                            type="password"
                            value={password}
                            className="mb-3 w-100 p-2 mt-2"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <br />

                        <input
                            name={conformPassword}
                            type="password"
                            value={conformPassword}
                            className="mb-3 w-100 p-2 mt-2"
                            onChange={(e) => setConformPassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                        <br />

                        <button
                            onClick={submit}
                            className="w-100 p-2 text-white"
                            style={{
                                background: "#31A2B8",
                                fontSize: "15px",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}

                        >Create</button>


                        <br />
                        <p className="mt-3">
                            <b>OR</b>
                        </p>

                        <p className="mt-3">
                            <Link to="/login">LOGIN</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }





    return (
        <div className="container">
            <div>
                <div className="text-center mb-2 mt-4">
                    <h6 className="">CREATE AN ACCOUNT</h6>
                </div>
                {successMessage()}
                {errorMessage()}
                {signUpForm()}
            </div>
        </div>
    );
};

export default Register;
