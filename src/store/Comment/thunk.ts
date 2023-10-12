import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentTaskServices } from "services/Comment";
import { Comment } from "types";

export const CreateCommentThunk = createAsyncThunk(
  "Comment/CreateCommentThunk",
  async (payload: Comment, { rejectWithValue }) => {
    try {
      const data = await CommentTaskServices.createComment(payload);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const DeleteCommentThunk = createAsyncThunk(
  "Comment/DeleteCommentThunk",
  async (idComment: number, { rejectWithValue }) => {
    try {
      const data = await CommentTaskServices.DeleteComment(idComment);
      return data.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
