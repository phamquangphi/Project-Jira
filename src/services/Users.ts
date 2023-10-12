import { apiInstance } from "constant/apiInstance";

import { LoginSchemaType } from "schema/LoginSchema";
import { RegisterSchemaType } from "schema/RegisterSchema";
import { Getuser, Users, editUser } from "types/Users";

const api = apiInstance({
  baseURL: import.meta.env.VITE_MANAGE_USER_API,
});
export const UsersServices = {
  //quản lý thông tin người dùng
  register: (payload: RegisterSchemaType) =>
    api.post<ApiRespone<Users>>("/signup", payload),
  login: (payload: LoginSchemaType) =>
    api.post<ApiRespone<Users>>("/signin", payload),

  //lấy thông tin user
  getUser: (key: string) =>
    api.get<ApiRespone<Getuser[]>>(`/getUser?keyword=${key}`),

  //Get user by project
  getUserByProject: (idProject: number) =>
    api.get<ApiRespone<Getuser[]>>(
      `/getUserByProjectId?idProject=${idProject}`
    ),
  updateUser: (payload: editUser) =>
    api.put<ApiRespone<editUser>>("/editUser", payload),
  deleteUsers: (id: number) => api.delete(`/deleteUser?id=${id}`),
};
