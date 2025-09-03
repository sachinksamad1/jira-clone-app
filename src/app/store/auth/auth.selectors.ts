import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { AuthState } from "./auth.model";

export  const selectAuthState = createFeatureSelector<AuthState>('auth');

export const SelectIsLoggedIn =  createSelector(
    selectAuthState,
    (state) => !state.uid
);

export const selctUser = createSelector(
    selectAuthState,
    (state) => ({
        uid: state.uid,
        email: state.email,
    })
);

export const selectCurrentUserId = createSelector(
    selectAuthState,
    (state) => state.uid
);