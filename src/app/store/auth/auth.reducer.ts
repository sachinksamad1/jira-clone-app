import { AuthState } from "./auth.model";
import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "./auth.actions";

export const initialState : AuthState = {
    uid: null,
    email: null,
    isLoading: false,
    error: null,
};

export const authReducer = createReducer(
    initialState,

    on(AuthActions.login, AuthActions.register, (state) => {
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    }),

    on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, { uid, email}) => {
        return {
            ...state,
            isLoading: false,
            uid,
            email,
            error: null,
        };
    }),

    on(AuthActions.loginFailure, AuthActions.registerFailure, (state) => {
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    }),

    on(AuthActions.logoutSuccess, () => initialState )
)