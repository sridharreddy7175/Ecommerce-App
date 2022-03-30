import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { SigninUser } from "../../redux/modules/signin/signin_actions";

export const styles = {
    textButton: {
        fontSize: "15px",
        fontWeight: 600,
        cursor: "pointer",
        backgroundColor: "#31A2B8",
        border: "none",
    },
};

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    // console.log("props", props?.details?.error?.error)
    const submit = async (e) => {
        // console.log("hello");
        e.preventDefault();
        var body = {
            email: email,
            password: password,
        };
        // console.log("bod", body);
        setLoading(true);
        setError(props?.details?.error?.error)
        await props.SigninUser(body);
        setLoading(false);
        // setError("")
    };
    // console.log(props?.details?.user?.user?.msg, "user")
    useEffect(() => {
        if (props?.details?.user?.user?.role === 0) {
            history.push("/user/dashboard");
        }
        if (props?.details?.user?.user?.role === 1) {
            history.push("/admin/dashboard");
        }
    }, [props?.details?.user?.user?.role]);


    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
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

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <input
                        name="email"
                        type="email"
                        value={email}
                        className="mb-3 w-100 p-2 mt-2"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />

                    <br />
                    <input
                        name="password"
                        type="password"
                        className="mb-3 w-100 p-2 mt-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                    <br />

                    <button
                        onClick={submit}
                        className="w-100 p-2 text-white"

                        style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            cursor: "pointer",
                            backgroundColor: "#31A2B8",
                            border: "none",
                        }}
                    > Login</button>

                    <br />
                    <p className="mt-3">
                        <b>OR</b>
                    </p>

                    <p className="mt-3">
                        <Link to="/register">CREATE AN ACCOUNT</Link>
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            <div>
                <div className="text-center mb-5">
                    <h5 className="mt-5">Welcome!</h5>
                    <h6>SignIn to your Account</h6>
                </div>
                {loadingMessage()}
                {errorMessage()}
                {signInForm()}

            </div>
        </div>
    );
};
export default connect(
    (state) => ({
        details: state.user,
    }),

    { SigninUser }
)(Login);
