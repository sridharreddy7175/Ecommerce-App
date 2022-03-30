// import React, { useEffect } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";


// const PrivateRoute = ({ component: Component, ...rest }) => {



//     return (
//         <Route
//             {...rest}
//             render={props =>
//                 props?.details?.user?.user?.role === 0 ? (
//                     <Component {...props} />
//                 ) : (
//                     <Redirect
//                         to={{
//                             pathname: "/login",
//                             state: { from: props.location }
//                         }}
//                     />
//                 )
//             }
//         />
//     );
// };
// export default connect(
//     (state) => ({
//         details: state.user,
//     }),

//     {}
// )(PrivateRoute);

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";


const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} component={(props) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            return <Component {...props} />
        } else {
            return <Redirect to={`/login`} />
        }
    }} />
}

export default connect(
    (state) => ({
        details: state.user,
    }),

    {}
)(PrivateRoute);