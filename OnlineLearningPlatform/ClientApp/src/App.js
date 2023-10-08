import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import './custom.css';
import Login from "./pages/Login";
import AllCourses from "./pages/AllCourses";
import PrivateRoute from "./authentication/PrivateRoute";
import {Home} from "./pages/Home";
import SignUp from "./pages/SignUp";
import InstructorSignUp from "./pages/InstructorSignUp";
import CourseDetails from "./pages/CourseDetails";
import ConsumeContent from "./pages/ConsumeContent";
import StudentProfilePage from "./pages/StudentProfilePage";
import CourseCRUD from "./pages/CourseCRUD";

export default class App extends Component {
    static displayName = App.name;


    render() {
        return (
            <Layout>
                <Routes>
                    <Route index={true} element={<Home />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<SignUp/>} />
                    <Route path="/instructor-signup" element={<InstructorSignUp/>}/>
                    <Route path="/all-courses" element={<AllCourses/>}/>


                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute requiredRole="Member" route={<StudentProfilePage/>}></PrivateRoute>
                        }
                    />
                    <Route
                        path="/course-details/:courseId"
                        element={
                            <PrivateRoute route={<CourseDetails />}></PrivateRoute>
                        }
                    />
                    <Route
                        path="course-id"
                        element={
                            <PrivateRoute route={<ConsumeContent />}></PrivateRoute>
                        }
                    />

                    <Route
                        path="add-course"
                        element={
                            <PrivateRoute requiredRole="Lecturer" route={<CourseCRUD />}></PrivateRoute>
                        }
                    />

                </Routes>
            </Layout>
        );
    }
}
