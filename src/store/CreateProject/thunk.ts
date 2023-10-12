import { createAsyncThunk } from "@reduxjs/toolkit";

import { ApiServices } from "services/Api";
import { ProjectAuthorizeServices } from "services/CreateProject";
import { AllProjcet, AssignProject, EditProject } from "types";

export const CategoryThunk = createAsyncThunk(
  "CategoryThunk",
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiServices.category();
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// hàm lưu xuống redux của Athorize
export const CreateAuthorizeThunk = createAsyncThunk(
  "Project/CreateAuthorizeThunk",
  async (payload: AllProjcet, { rejectWithValue }) => {
    try {
      const data = await ProjectAuthorizeServices.projectAuthorize(payload);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const GetAllProjectThunk = createAsyncThunk(
  "Project/GetAllProjectThunk",
  async (_, { rejectWithValue }) => {
    try {
      const data = await ProjectAuthorizeServices.GetAllProject();
      return data.data.content;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export interface update {
  id: number;
  payload: EditProject;
}
export const UpdateProjectThunk = createAsyncThunk(
  " Project/UpdateProjectThunk",
  async ({ id, payload }: update, { rejectWithValue, dispatch }) => {
    try {
      const data = await ProjectAuthorizeServices.UpdateProject(id, payload);
      await dispatch(GetAllProjectThunk());
      return data.data.content;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const DeleteProjectThunk = createAsyncThunk(
  " Project/DeleteProjectThunk",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const data = await ProjectAuthorizeServices.DeleteProject(id);
      await dispatch(GetAllProjectThunk());
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const AssignProjectThunk = createAsyncThunk(
  " Project/AssignProjectThunk",
  async (payload: AssignProject, { rejectWithValue, dispatch }) => {
    try {
      const data = await ProjectAuthorizeServices.AssignProject(payload);
      await dispatch(GetAllProjectThunk());
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const DeleteUserProjectThunk = createAsyncThunk(
  " Project/DeleteUserProjectThunk",
  async (payload: AssignProject, { rejectWithValue, dispatch }) => {
    try {
      const data = await ProjectAuthorizeServices.DeleteUserProject(payload);
      await dispatch(GetAllProjectThunk());
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const GetProjectDetailThunk = createAsyncThunk(
  " Project/GetProjectDetailThunk",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await ProjectAuthorizeServices.ProjectDetail(id);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
