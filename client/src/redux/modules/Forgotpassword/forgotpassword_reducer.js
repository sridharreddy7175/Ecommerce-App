import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE

} from "./forgotpassword_action";

export var ForgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                user: [],
                loading: true,
                error: null,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case FORGOT_PASSWORD_FAILURE:
            return {
                user: [],
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
