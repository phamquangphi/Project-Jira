import { apiInstance } from "constant/apiInstance";
import { Comment } from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_COMMENT_API,
});
export const CommentTaskServices = {
  createComment: (payload: Comment) =>
    api.post<ApiRespone<Comment>>("/insertComment", payload),
  DeleteComment: (idComment: number) =>
    api.delete(`/deleteComment?idComment=${idComment}`),
};
