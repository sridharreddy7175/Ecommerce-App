import axios from "axios";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

// SIGNIN a User
export const forgetPassword = (user) => {
    // console.log("helo")
    const { email, secret } = user;
    return async (dispatch) => {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const requestBody = {
            email: email,
            secret: secret,
        };
        // console.log("ree", requestBody);
        try {
            let dataURL = "http://localhost:8000/api/forgotpasword";
            let response = await axios.post(dataURL, requestBody);
            // console.log("res", response);
            dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
        } catch (error) {
            // console.log(error.response.data);
            dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.response.data });
        }
    };
};
