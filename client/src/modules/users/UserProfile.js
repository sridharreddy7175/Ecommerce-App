import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

export const styles = {
    textButton: {
        fontSize: "15px",
        fontWeight: 600,
        cursor: "pointer",
        background: "#DC4146",
    },
};

const UserProfile = (props) => {
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    let history = useHistory();

    toast.configure();

    const getuserById = () => {
        let config = {
            headers: {
                Authorization: "Bearer " + props?.details?.user?.token,
            },
        };
        axios
            .get(
                `http://localhost:8000/api/user/${props?.details?.user?.user?._id}`,
                config
            )
            .then((res) => {
                setFirstName(res.data.name);
                setEmail(res.data.email);
                setPhone(res.data.phone);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log("props", props?.details?.user?.user?._id);

    useEffect(() => {
        getuserById();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setSuccess(false);

        var body = {
            id: props?.details?.user?.user?._id,
            name: firstName,
            email: props?.details?.user?.user?.email,
            phone: phone,
            password: password,
        };
        // console.log("body", body);
        try {
            const data = await axios.put(
                `http://localhost:8000/api/user/${props?.details?.user?.user?._id}`,
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
            // setName("");
        } catch (err) {
            // setError(true);
            setError(err.response.data.error);
        }
    };

    let UpdateProfile = () => {
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
                            name={email}
                            type="email"
                            className="mb-3 w-100 p-2 mt-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />

                        <br />
                        <input
                            name={phone}
                            type="number"
                            value={phone}
                            className="mb-3 w-100 p-2 mt-2"
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                        />
                        <br />

                        <inputBox
                            name={password}
                            type="password"
                            className="mb-3 w-100 p-2 mt-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <br />

                        <button onClick={submit}>Update Profile</button>

                        <br />
                    </div>
                </div>
            </div>
        );
    };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        Profile Updated successfully . Please
                        <Link to="/user/dashboard"> UserDashboard Here</Link>
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

    return (
        <div className="container">
            <div>
                <div className="text-center mb-2 mt-4">
                    <h4 className="">
                        <b>My Profile</b>
                    </h4>
                </div>
                {successMessage()}
                {errorMessage()}
                {UpdateProfile()}
            </div>
        </div>
    );
};

export default connect(
    (state) => ({
        details: state.user,
    }),

    {}
)(UserProfile);
