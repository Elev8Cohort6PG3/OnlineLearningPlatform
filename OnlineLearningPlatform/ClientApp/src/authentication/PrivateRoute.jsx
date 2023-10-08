import React from 'react'
import Login from "../pages/Login";
import UserCredentials from "./UserCredentials";
import Unauthorized from "./Unauthorized";

function PrivateRoute(props) {
    //check if user is logged in
    //if logged in redirect to passed element
    //get path and redirect to it after user logs in
    let path = window.location.pathname;
    let RouteElement = props.route;
    let requiredRole = props.requiredRole;
    const userIsLogged = UserCredentials().isLoggedIn;
    const userRole = UserCredentials().role;

    if (!userIsLogged) {
        return <Login redirectURL={path}/>;
    } else if ((!(requiredRole === undefined) && !(userRole === requiredRole))) {
        return <Unauthorized requiredRole={requiredRole}/>
    }
    return RouteElement;
}

export default PrivateRoute;