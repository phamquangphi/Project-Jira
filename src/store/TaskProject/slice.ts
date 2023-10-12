import { createSlice } from "@reduxjs/toolkit";
import {
  Assigness,
  CreateTask,
  ListTaskDeTail,
  Priority,
  Status,
  TaskType,
} from "types";
import {
  GetTaskDetailThunk,
  PriorityThunk,
  StatusThunk,
  TaskProjectThunk,
  TaskTypeThunk,
} from ".";

type TaskInitialState = {
  allTaskProject?: CreateTask[];
  taskType?: TaskType[];
  priority?: Priority[];
  status?: Status[];
  vsTask?: boolean;
  listTaskDetial?: ListTaskDeTail;
  assigness?: Assigness[];
};
const initialState: TaskInitialState = {
  allTaskProject: [],
  taskType: [],
  priority: [],
  status: [],
  vsTask: false,
  listTaskDetial: null,
  assigness: [],
};
export const TaskProjectSlice = createSlice({
  name: "TaskProject",
  initialState,
  reducers: {
    OpenTask: (state) => {
      state.vsTask = true;
    },
    CloseTask: (state) => {
      state.vsTask = false;
    },
    ChangeAssign: (state, action) => {
      state.listTaskDetial.assigness = [
        ...state.listTaskDetial.assigness,
        action.payload,
      ];
    },
    DeleteAssign: (state, action) => {
      state.listTaskDetial.assigness = [
        ...state.listTaskDetial.assigness.filter(
          (us) => us.id !== action.payload
        ),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TaskProjectThunk.fulfilled, (state, { payload }) => {
        state.allTaskProject.push(payload);
        state.vsTask = false;
      })
      .addCase(TaskTypeThunk.fulfilled, (state, { payload }) => {
        state.taskType = payload;
      })
      .addCase(PriorityThunk.fulfilled, (state, { payload }) => {
        state.priority = payload;
      })
      .addCase(StatusThunk.fulfilled, (state, { payload }) => {
        state.status = payload;
      })
      .addCase(GetTaskDetailThunk.fulfilled, (state, { payload }) => {
        state.listTaskDetial = payload;
      });
  },
});
export const { reducer: TaskProjectReducer, actions: TaskProjectAction } =
  TaskProjectSlice;
