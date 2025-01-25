import { FC, lazy } from "react";
import { Outlet, RouteObject } from "react-router-dom";

import DefaultLayout, { Loader } from "../components/layout";

const Home = lazy<FC>(() => import("./home"));
const HomeV2 = lazy<FC>(() => import("./home-v2"));

const routes: RouteObject[] = [
    {
        // Component: DefaultLayout,
        loader: () => <Loader spinning />,
        children: [
            {
                Component: Home,
                path: "",
                index: true,
            },
            {
                Component: HomeV2,
                path: "v2",
            },
            {
                Component: Outlet,
                path: "*",
            },
        ],
    },
];

export default routes;
