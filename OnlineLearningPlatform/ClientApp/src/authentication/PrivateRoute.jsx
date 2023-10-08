import React from 'react'
import Login from "../pages/Login";
import UserCredentials from "./UserCredentials";



function PrivateRoute(props) {
    //check if user is logged in
    //if logged in redirect to passed element
    //get path and redirect to it after user logs in

    let path = window.location.pathname;
    let RouteElement = props.route;
    const userIsLogged = UserCredentials().isLoggedIn;

    if (!userIsLogged) {
        return <Login redirectURL={path} />;
    }
    return RouteElement;
}

export default PrivateRoute;