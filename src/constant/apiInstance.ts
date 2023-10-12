import axios, { CreateAxiosDefaults, AxiosRequestHeaders } from "axios";

const TOKEN_CTYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NiIsIkhldEhhblN0cmluZyI6IjMxLzAxLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNjY1OTIwMDAwMCIsIm5iZiI6MTY3ODI5NDgwMCwiZXhwIjoxNzA2ODA2ODAwfQ.RmFBx9ElL7VuYNzZnzMoGUHyC3iXKRpw7Yvq2LsXk0Q";

export const apiInstance = (config?: CreateAxiosDefaults) => {
  const api = axios.create(config);
  api.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        TokenCybersoft: TOKEN_CTYBERSOFT,
        Authorization: "Bearer" + " " + localStorage.getItem("accessToken"),
      } as unknown as AxiosRequestHeaders,
    };
  });
  return api;
};
