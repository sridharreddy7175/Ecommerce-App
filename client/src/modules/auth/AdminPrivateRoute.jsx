import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";


const AdminPrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                props?.details?.user?.user?.role === 1 ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};
export default connect(
    (state) => ({
        details: state.user,
    }),

    {}
)(AdminPrivateRoute);