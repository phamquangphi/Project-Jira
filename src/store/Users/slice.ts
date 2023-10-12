import { createSlice } from "@reduxjs/toolkit";
import {
  GetUserByProjectThunk,
  GetUserThunk,
  LoginThunk,
  UpdateUsertThunk,
} from "./thunk";
import { Getuser, Users, editUser } from "types/Users";

type UsersInitialState = {
  user?: Users;
  accessToken?: string;
  userSearch?: Getuser[];
  UserByProject?: Getuser[];
  EditUsers?: editUser;
  ModalEdit?: boolean;
};

const initialState: UsersInitialState = {
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  userSearch: [],
  UserByProject: [],
  ModalEdit: false,
};
export const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
      localStorage.removeItem("accessToken");
    },
    OpenModal: (state) => {
      state.ModalEdit = true;
    },
    CloseModal: (state) => {
      state.ModalEdit = false;
    },
    editUser: (state, action) => {
      state.EditUsers = action.payload;
      state.ModalEdit = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        if (payload) {
          localStorage.setItem("accessToken", payload.accessToken);
        }
      })
      .addCase(GetUserThunk.fulfilled, (state, { payload }) => {
        state.userSearch = payload;
      })
      .addCase(GetUserByProjectThunk.fulfilled, (state, { payload }) => {
        state.UserByProject = payload;
      })
      .addCase(UpdateUsertThunk.fulfilled, (state) => {
        state.ModalEdit = false;
      });
  },
});
export const { reducer: UsersReducer, actions: UsersAction } = UsersSlice;
