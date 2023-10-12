import { combineReducers } from "@reduxjs/toolkit";
import { UsersReducer } from "./Users";
import { CreateProjectReducer } from "./CreateProject";
import { TaskProjectReducer } from "./TaskProject";
import { CommentTaskSliceReducer } from "./Comment/slice";

export const rootReducer = combineReducers({
  users: UsersReducer,
  createProject: CreateProjectReducer,
  taskProject: TaskProjectReducer,
  commentTask: CommentTaskSliceReducer,
});
