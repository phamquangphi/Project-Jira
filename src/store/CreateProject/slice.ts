import { createSlice } from "@reduxjs/toolkit";
import {
  AllProjcet,
  AssignProject,
  Category,
  Detailproject,
  EditProject,
} from "types";
import {
  CategoryThunk,
  CreateAuthorizeThunk,
  DeleteProjectThunk,
  GetAllProjectThunk,
  GetProjectDetailThunk,
  UpdateProjectThunk,
} from ".";

type createInitialState = {
  category?: Category[];
  project?: AllProjcet[];
  assignProject?: AssignProject[];
  editInfo?: EditProject;
  visible?: boolean;
  Detail?: Detailproject;
};
const initialState: createInitialState = {
  category: [],
  project: [],
  Detail: null,
  editInfo: null,
  visible: false,
};

export const CreateProjectSlice = createSlice({
  name: "CreateProject",
  initialState,
  reducers: {
    OpenDrawer: (state) => {
      state.visible = true;
    },
    CloseDrawer: (state) => {
      return { ...state, visible: false };
    },

    EditProject: (state, action) => {
      state.visible = true;
      state.editInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CategoryThunk.fulfilled, (state, { payload }) => {
        state.category = payload;
      })
      // xử lý phần create Project
      .addCase(CreateAuthorizeThunk.fulfilled, (state, { payload }) => {
        state.project.push(payload);
      })
      // lấy danh sách Project về
      .addCase(GetAllProjectThunk.fulfilled, (state, { payload }) => {
        state.project = payload;
      })
      // phần update
      .addCase(UpdateProjectThunk.fulfilled, (state) => {
        state.visible = false;
      })
      //phần delete Project
      .addCase(DeleteProjectThunk.fulfilled, (state, { payload }) => {
        const projectId = payload.id;
        state.project = state.project.filter(
          (project) => project.id !== projectId
        );
      })
      .addCase(GetProjectDetailThunk.fulfilled, (state, { payload }) => {
        state.Detail = payload;
      });
  },
});
export const { reducer: CreateProjectReducer, actions: CreateProjectAction } =
  CreateProjectSlice;
