import React from 'react'
import Login from "../pages/Login";
import UserCredentials from "./UserCredentials";


function PrivateRoute(props) {
    let RouteElement = props.route;
    const userIsLogged = UserCredentials().isLoggedIn;
    console.log(UserCredentials().isLoggedIn)
    if (!userIsLogged) {
        return <Login />;
    }
    return RouteElement;
}




export default PrivateRoute;