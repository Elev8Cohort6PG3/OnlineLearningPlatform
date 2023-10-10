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


export default function InstructorProfilePage() {
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [courses, setCourses] = useState(null);
    const [instructor, setInstructor] = React.useState(null);
    let param = useParams();
    let instructorUsername = param.instructorUsername;
    const [currentUserIsAuthorized, setCurrentUserIsAuthorized] = useState(false);

    useEffect(() => {
        if (param.instructorUsername === UserCredentials().username) {
            setCurrentUserIsAuthorized(true);
        }
        if (param.instructorUsername === undefined) {
            instructorUsername = UserCredentials().username;
            setCurrentUserIsAuthorized(true);
        }
        axios.get(`https://localhost:7240/course/all-courses/${instructorUsername}`, {}).then((response) => {
                setCourses(response.data);
                axios.get(`https://localhost:7240/users/${instructorUsername}`, {}).then((response) => {
                        if (response.data.firstName === null || response.data.firstName === undefined || response.data.firstName === "") {
                            response.data.firstName = "Not Provided";
                        }
                        if (response.data.lastName === null || response.data.lastName === undefined || response.data.lastName === "") {
                            response.data.lastName = "Not Provided";
                        }
                        if (response.data.email === null || response.data.email === undefined || response.data.email === "") {
                            response.data.email = "Not Provided";
                        }
                        setInstructor(response.data);
                    }
                )
            }
        )
    }, [editDialogOpen]);

    return (
        <div id="ProfilePage">
            <Grid container>
                <Grid item className='col' xs={12} sm={3}>
                    <div className="profile">
                        {instructor && <Avatar src="https://source.unsplash.com/random?wallpapers?9"
                                               sx={{width: 108, height: 108}}>{instructor.userName}</Avatar>}
                        {instructor && <h4>{instructor.userName}</h4>}
                        {instructor && currentUserIsAuthorized &&
                            <EditUserProfile editDialogOpen={editDialogOpen} setEditDialogOpen={setEditDialogOpen}
                                             userName={instructor.userName}/>}
                    </div>
                    {instructor && <Typography><p>Name: {instructor.firstName}</p><p>Surname: {instructor.lastName}</p>
                    </Typography>}
                    {instructor && <Typography><p>Email: {instructor.email}</p></Typography>}
                    {instructor && courses && <Typography><p>Published Courses: {courses.length}</p></Typography>}
                </Grid>
                <Grid item className='col' xs={12} sm={9}>
                    <h3>My Courses</h3>
                    <Grid container>
                        {courses && courses.map((course, index) => (
                            <CourseCard courseInfo={course} instructorPageCourseCard={true}
                                        currentUserIsAuthorized={currentUserIsAuthorized}/>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

