import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CourseCard from "../components/CourseCard";
import "../css/ProfilePage.css";
import axios from "axios";
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import UserCredentials from "../authentication/UserCredentials";
import EditUserProfile from "../components/EditUserProfile";


export default function StudentProfilePage(props) {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [courses, setCourses] = useState(null);
  const [student, setStudent] = React.useState(null);
  let param = useParams();
  let studentUsername = param.studentUsername;
  const [currentUserIsAuthorized, setCurrentUserIsAuthorized] = useState(false);

  useEffect(() => {
    if (param.studentUsername === UserCredentials().username) {
      setCurrentUserIsAuthorized(true);
    }
    if (param.studentUsername === undefined) {
      studentUsername = UserCredentials().username;
      setCurrentUserIsAuthorized(true);
    }
    axios.get(`https://localhost:7240/course`, {}).then((response) => {
          setCourses(response.data);
          axios.get(`https://localhost:7240/users/${studentUsername}`, {}).then((response) => {
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
        }
    )
  }, [editDialogOpen]);

  return (
      <div id="ProfilePage">
        <Grid container>
          <Grid item className='col' xs={12} sm={3}>
            <div className="profile">
              {student && <Avatar src="https://source.unsplash.com/random?wallpapers?9" sx={{width: 108, height: 108}}>{student.userName}</Avatar>}
              {student && <h4>{student.userName}</h4>}
              {student && currentUserIsAuthorized && <EditUserProfile editDialogOpen={editDialogOpen} setEditDialogOpen={setEditDialogOpen} userName={student.userName}/>}
            </div>
            {student && <Typography><p>Name: {student.firstName}</p><p>Surname: {student.lastName}</p></Typography>}
            {student && <Typography><p>Email: {student.email}</p></Typography>}
            {student && courses && <Typography><p>Enrolled Courses: {courses.length}</p></Typography>}
          </Grid>
          <Grid item className='col' xs={12} sm={9}>
            <h3>My Courses</h3>
            <Grid container>
              {courses && courses.map((course, index) => (
                  <CourseCard courseInfo={course}/>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
  );
}

