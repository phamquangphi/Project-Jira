import { apiInstance } from "constant/apiInstance";
import { Detailproject } from "types";

import { AllProjcet, AssignProject, EditProject } from "types/Create";

const api = apiInstance({
  baseURL: import.meta.env.VITE_CREATE_PROJECT_API,
});
export const ProjectAuthorizeServices = {
  projectAuthorize: (payload: AllProjcet) =>
    api.post<ApiRespone<AllProjcet>>("/createProjectAuthorize", payload),

  //lấy dự án về
  GetAllProject: () => api.get<ApiRespone<AllProjcet[]>>("/getAllProject"),

  UpdateProject: (id: number, payload: EditProject) =>
    api.put<ApiRespone<EditProject>>(`/updateProject?projectId=${id}`, payload),

  DeleteProject: (id: number) => api.delete(`/deleteProject?projectId=${id}`),

  AssignProject: (payload: AssignProject) =>
    api.post<ApiRespone<AssignProject>>("/assignUserProject", payload),

  DeleteUserProject: (payload: AssignProject) =>
    api.post<ApiRespone<AssignProject>>("/removeUserFromProject", payload),

  ProjectDetail: (id: number) =>
    api.get<ApiRespone<Detailproject>>(`/getProjectDetail?id=${id}`),
};
