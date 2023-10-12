import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiServices } from "services/Api";
import { TaskProjectServices } from "services/ProjectTask";
import {
  CreateTask,
  updateDescription,
  updatePriority,
  updateStatus,
} from "types";

export const TaskProjectThunk = createAsyncThunk(
  "Project/TaskProjectThunk",
  async (payload: CreateTask, { rejectWithValue }) => {
    try {
      const data = await TaskProjectServices.createTask(payload);

      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const TaskTypeThunk = createAsyncThunk(
  "TaskTypeThunk",
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiServices.taskType();
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const PriorityThunk = createAsyncThunk(
  "PriorityThunk",
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiServices.priority();
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const StatusThunk = createAsyncThunk(
  "StatusThunk",
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiServices.status();
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const GetTaskDetailThunk = createAsyncThunk(
  "Project/GetTaskDetailThunk",
  async (taskid: number, { rejectWithValue }) => {
    try {
      const data = await TaskProjectServices.getTaskDetail(taskid);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const UpdateStatusTaskThunk = createAsyncThunk(
  "Project/UpdateStatusTaskThunk",
  async (payload: updateStatus, { rejectWithValue }) => {
    try {
      const data = await TaskProjectServices.updateStatus(payload);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const UpdatePriorityTaskThunk = createAsyncThunk(
  "Project/UpdatePriorityTaskThunk",
  async (payload: updatePriority, { rejectWithValue }) => {
    try {
      const data = await TaskProjectServices.updatePriority(payload);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const UpdateDescriptionTaskThunk = createAsyncThunk(
  "Project/UpdateDescriptionTaskThunk",
  async (payload: updateDescription, { rejectWithValue }) => {
    try {
      const data = await TaskProjectServices.updateDescription(payload);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const RemoveTaskThunk = createAsyncThunk(
  "Project/RemoveTaskThunk",
  async (taskId: number, { rejectWithValue }) => {
    try {
      const data = await TaskProjectServices.removeTask(taskId);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
