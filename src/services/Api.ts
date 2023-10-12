import { apiInstance } from "constant/apiInstance";
import { Category, Priority, Status, TaskType } from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_API,
});
export const ApiServices = {
  //quản lý option category
  category: () => api.get<TitleRespone<Category[]>>("/ProjectCategory"),
  taskType: () => api.get<ApiRespone<TaskType[]>>("/TaskType/getAll"),
  priority: () => api.get<ApiRespone<Priority[]>>("/Priority/getAll"),
  status: () => api.get<TitleRespone<Status[]>>("/Status/getAll"),
};
