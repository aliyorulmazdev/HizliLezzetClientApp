import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: ':restoranid/:masaid',
      }
    ]
  },
]

export const router = createBrowserRouter(routes);
