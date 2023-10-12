import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
export const CommentTaskSlice = createSlice({
  name: "Comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});
export const {
  reducer: CommentTaskSliceReducer,
  actions: CommentTaskSliceActions,
} = CommentTaskSlice;
