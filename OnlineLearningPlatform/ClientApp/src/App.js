import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import './custom.css';
import Login from "./pages/Login";
import AllCourses from "./pages/AllCourses";
import PrivateRoute from "./authentication/PrivateRoute";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import InstructorSignUp from "./pages/InstructorSignUp";
import CourseDetails from "./pages/CourseDetails";
import ConsumeContent from "./pages/ConsumeContent";
import StudentProfilePage from "./pages/StudentProfilePage";
import CourseCRUD from "./pages/CourseCRUD";
import Search from "./pages/Search";
import InstructorProfilePage from "./pages/InstructorProfilePage";
import AdminPanel from './pages/AdminPanel';
import StudentDashboard from "./pages/StudentDashboard";
import CourseGallery from "./components/CourseGallery";
import HomeRouter from "./routers/HomeRouter";

export default class App extends Component {
    static displayName = App.name;


    render() {
        return (
            <Layout>
                <Routes>
                    <Route index={true} element={<HomeRouter />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<SignUp/>} />
                    <Route path="/instructor-signup" element={<InstructorSignUp/>}/>
                    <Route path="/all-courses" element={<AllCourses/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/search/:searchVal" element={<Search/>}/>
                    <Route path="/profile/:studentUsername" element={<StudentProfilePage/>}/>
                    <Route path="/student-dashboard" element={<StudentDashboard/>}/>
                    <Route path="/instructor-dashboard/:instructorUsername" element={<InstructorProfilePage/>}/>
                    <Route path="/admin-panel" element={<AdminPanel/>}/>
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute requiredRole="Member" route={<StudentProfilePage/>}></PrivateRoute>
                        }
                    />
                    <Route
                        path="/consume-content/:courseId"
                        element={
                            <PrivateRoute requiredRole="Member" route={<ConsumeContent/>}></PrivateRoute>
                        }
                    />
                    <Route
                        path="/instructor-dashboard"
                        element={
                            <PrivateRoute requiredRole="Lecturer" route={<InstructorProfilePage/>}></PrivateRoute>
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
                    <Route
                        path="edit-course/:courseId"
                        element={
                            <PrivateRoute requiredRole="Lecturer" route={<CourseCRUD />}></PrivateRoute>
                        }
                    />

                </Routes>
            </Layout>
        );
    }
}
