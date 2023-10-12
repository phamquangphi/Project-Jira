import AuthLayout from "components/playouts/AuthLayout";
import MainPlayout from "components/playouts/MainPlayout";
import { PATH } from "constant/config";
import { Create, Home, Login, Management, Register } from "pages";
import NotFound from "pages/NotFound";
import User from "pages/User";
import { RouteObject } from "react-router-dom";

export const reouter: RouteObject[] = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: PATH.register,
        element: <Register />,
      },
    ],
  },
  {
    element: <MainPlayout />,
    children: [
      {
        path: PATH.manager,
        element: <Management />,
      },
      {
        path: PATH.create,
        element: <Create />,
      },
      {
        path: "/ProjectDetail/:ProjectId",
        element: <Home />,
      },
      {
        path: PATH.user,
        element: <User />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
