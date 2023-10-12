import { apiInstance } from "constant/apiInstance";
import {
  CreateTask,
  ListTaskDeTail,
  updateDescription,
  updatePriority,
  updateStatus,
} from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_CREATE_PROJECT_API,
});
export const TaskProjectServices = {
  //TASK ALL
  createTask: (payload: CreateTask) =>
    api.post<ApiRespone<CreateTask>>("/createTask", payload),
  //TASK DETAIL
  getTaskDetail: (taskid: number) =>
    api.get<ApiRespone<ListTaskDeTail>>(`/getTaskDetail?taskId=${taskid}`),

  updateStatus: (payload: updateStatus) => api.put("/updateStatus", payload),

  updatePriority: (payload: updatePriority) =>
    api.put("/updatePriority", payload),

  updateDescription: (payload: updateDescription) =>
    api.put("/updateDescription", payload),
  removeTask: (taskId: number) => api.delete(`/removeTask?taskId=${taskId}`),
};
