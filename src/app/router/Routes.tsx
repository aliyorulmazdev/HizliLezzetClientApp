import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import TableApp from "../layout/TableApp";
import RestaurantApp from "../layout/RestaurantApp";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: ':restoranid/:masaid',
      },
    ],
  },
  {
    path: '/tables',
    element: <TableApp />, // TableApp bileşenini ekrana getirin
  },
  {
    path: '/restaurants',
    element: <RestaurantApp />, // TableApp bileşenini ekrana getirin
  },
];

export const router = createBrowserRouter(routes);
