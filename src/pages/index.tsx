import { FC, lazy } from "react";
import { Outlet, RouteObject } from "react-router-dom";

import { Loader } from "../components/layout";

const Home = lazy<FC>(() => import("./home"));
const HomeV2 = lazy<FC>(() => import("./home-v2"));
const Onboarding = lazy<FC>(() => import("./onboarding"));

const routes: RouteObject[] = [
    {
        // Component: DefaultLayout test2,
        loader: () => <Loader spinning />,
        children: [
            {
                Component: Onboarding,
                path: "",
            },
            {
                Component: Outlet,
                path: "*",
            },
        ],
    },
];

export default routes;
