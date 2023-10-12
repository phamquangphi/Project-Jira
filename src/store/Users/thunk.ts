import { createAsyncThunk } from "@reduxjs/toolkit";

import { LoginSchemaType } from "schema/LoginSchema";
import { UsersServices } from "services/Users";
import { editUser } from "types";

//tạo hàm api login
export const LoginThunk = createAsyncThunk(
  "Users/LoginThunk",
  async (payload: LoginSchemaType, { rejectWithValue }) => {
    try {
      const data = await UsersServices.login(payload);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const GetUserThunk = createAsyncThunk(
  "Users/GetUserThunk",
  async (key: string, { rejectWithValue }) => {
    try {
      const data = await UsersServices.getUser(key);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const GetUserByProjectThunk = createAsyncThunk(
  "Users/GetUserByProjectThunk",
  async (idProject: number, { rejectWithValue }) => {
    try {
      const data = await UsersServices.getUserByProject(idProject);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const UpdateUsertThunk = createAsyncThunk(
  "Users/UpdateUsertThunk",
  async (payload: editUser, { rejectWithValue }) => {
    try {
      const data = await UsersServices.updateUser(payload);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const DeleteUsersThunk = createAsyncThunk(
  "Users/DeleteUsersThunk",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await UsersServices.deleteUsers(id);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
