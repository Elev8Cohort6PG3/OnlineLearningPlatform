import React from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import CourseCard from "../components/CourseCard";
import {courses} from "../MockData";

import "../css/ProfilePage.css";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function StudentProfilePage() {
  return (
    <div id="ProfilePage">
      <Grid container>
        {/*any spacing breaks the grid*/}
        <Grid item className='col' xs={12} sm={3}>
          <div className="profile">
            <Avatar src="https://source.unsplash.com/random?wallpapers?9" sx={{ width: 108, height: 108 }}>USER NAME</Avatar>
            <h4>USER NAME</h4>
            <Button variant="contained" sx={{mt: 1, mb: 2}}>Edit Profile</Button>
          </div>

          <p>user id</p>
          <p>email</p>
          <p>other user details</p>
        </Grid>
        <Grid item className='col' xs={12} sm={9}>
          <h3>My Courses</h3>
          <Grid container>
          {courses.map((course, index) => (
                            <CourseCard courseInfo={course}/>
                        ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default StudentProfilePage;
