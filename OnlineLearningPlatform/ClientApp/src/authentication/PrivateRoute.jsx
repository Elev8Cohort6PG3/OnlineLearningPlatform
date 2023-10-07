import React from 'react'
import Login from "../pages/Login";
import UserCredentials from "./UserCredentials";
import {useParams} from "react-router-dom";


function PrivateRoute(props) {
    let path = window.location.pathname;
    let RouteElement = props.route;
    const userIsLogged = UserCredentials().isLoggedIn;

    if (!userIsLogged) {
        return <Login redirectURL={path} />;
    }
    return RouteElement;
}

export default PrivateRoute;