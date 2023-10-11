import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CourseCard from "../components/CourseCard";
import "../css/ProfilePage.css";
import axios from "axios";
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import UserCredentials from "../authentication/UserCredentials";
import EditUserProfile from "../components/EditUserProfile";
import AllCourses from "./AllCourses";


export default function StudentDashboard() {
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [courses, setCourses] = useState(null);
    const [allCourses, setAllCourses] = useState(null);
    const [student, setStudent] = React.useState(null);
    const [studentUsername, setStudentUsername] = React.useState(null);
    const [courseIdsArray, setCourseIdsArray] = useState([]);


    useEffect(() => {
        setStudentUsername(UserCredentials().username);

        axios.get(`https://localhost:7240/users/${UserCredentials().username}`, {}).then((response) => {
                if (response.data.firstName === null || response.data.firstName === undefined || response.data.firstName === "") {
                    response.data.firstName = "Not Provided";
                }
                if (response.data.lastName === null || response.data.lastName === undefined || response.data.lastName === "") {
                    response.data.lastName = "Not Provided";
                }
                if (response.data.email === null || response.data.email === undefined || response.data.email === "") {
                    response.data.email = "Not Provided";
                }
                setStudent(response.data);
            }
        )


        axios.get("https://localhost:7240/course", {}).then((response) => {
                setAllCourses(response.data);
            }
        )


        let postData = {};
        let axiosConfig = {
            headers: {
                'Authorization': `bearer ${UserCredentials().token}`,
            }
        };


        axios.get(`https://localhost:7240/Enrollment/user/${UserCredentials().username}`, postData, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res.data);
                for (let i = 0; i < res.data.length; i++) {
                    courseIdsArray.push(res.data[i].courseId);
                }

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })


    }, []);

    return (
        <div id="ProfilePage">
            <Grid container>
                <Grid item className='col' xs={12} sm={12}>
                    <div className="profile">
                        {student && <Avatar src="https://source.unsplash.com/random?wallpapers?9"
                                            sx={{width: 108, height: 108}}>{student.userName}</Avatar>}
                        {student && <h4>{student.userName}</h4>}
                    </div>
                    <Grid item xs={12} sm={12} display="flex" justifyContent="center">
                        {student &&
                            <Typography><p>{student.firstName}</p><p>{student.lastName}</p></Typography>}
                        {student && courses && <Typography><p>Enrolled Courses: {courses.length}</p></Typography>}
                    </Grid>

                </Grid>
                <Grid item className='col' xs={12} sm={12}>
                    <h3>Available Courses</h3>
                    <Grid container>
                        {allCourses && allCourses.map((course, index) => (
                            <CourseCard courseInfo={course}/>
                        ))}
                    </Grid>
                </Grid>
                <Grid item className='col' xs={12} sm={12}>
                    <h3>My Courses</h3>
                    <Grid container>
                        {courseIdsArray && courseIdsArray.map((courseId, index) => (
                            <CourseCard courseId={courseId}/>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

