import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/project/:id",
    Component: ProjectDetail,
  },
]);
