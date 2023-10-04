import { createBrowserRouter } from "react-router-dom";

import Root from "../layout/Root";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import About from "../pages/About";
import Career from "../pages/Career";
import MoreDetailsCard from "../components/MoreDetailsCard";
import Privetroute from "../protectedroute/Privetroute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/about",
                element: <About></About>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/registration",
                element: <Registration></Registration>,
            },
            {
                path: "/career",
                element: <Career></Career>
            },
            {
                path: "/details/:id",
                element: <Privetroute><MoreDetailsCard></MoreDetailsCard></Privetroute>
            },
        ],
    },
]);
export default router