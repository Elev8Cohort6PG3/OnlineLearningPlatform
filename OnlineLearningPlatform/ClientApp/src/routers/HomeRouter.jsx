
import React from "react";
import UserCredentials from "../authentication/UserCredentials";
import CourseGallery from "../components/CourseGallery";
import Home from "../pages/Home";

export default function HomeRouter() {
    const userIsLogged = UserCredentials().isLoggedIn;

    if (userIsLogged) {
        return <CourseGallery/>;
    } else {
        return <Home/>
    }

}