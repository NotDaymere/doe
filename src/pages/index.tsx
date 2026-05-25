import { FC, lazy } from "react";
import { Outlet, RouteObject } from "react-router-dom";

import { Loader } from "../components/layout";
import Onboarding from "./onboarding";

const HomeV2 = lazy<FC>(() => import("./home-v2"));

const routes: RouteObject[] = [
    {
        // Component: DefaultLayout,
        loader: () => <Loader spinning />,
        children: [
            {
                Component: HomeV2,
                path: "",
                index: true,
            },
            {
                Component: Onboarding,
                path: "onboarding",
            },
            {
                Component: Outlet,
                path: "*",
            },
        ],
    },
];

export default routes;
