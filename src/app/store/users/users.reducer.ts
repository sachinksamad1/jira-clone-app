import { createReducer, on } from "@ngrx/store";
import { UsersState } from "./users.model";
import { UsersActions } from "./users.actions";

export const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const usersReducers = createReducer(
  initialState,

 on(UsersActions.loadUsers, (state) => ({ ...state, isLoading: true })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    isLoading: false,
    users,
    error: null,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
)