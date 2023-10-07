import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {courses, enrollments, users} from "../MockData";
import {useParams} from "react-router-dom";
import Person2Icon from '@mui/icons-material/Person2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Face2Icon from '@mui/icons-material/Face2';
import BookIcon from '@mui/icons-material/Book';
import CategoryIcon from '@mui/icons-material/Category';
import Button from "@mui/material/Button";
import './CourseDetails.css';

export default function CourseDetails() {
    let param = useParams();
    let courseId = param.courseId;

    let course = courses[courseId];

    let currentCourseEnrollments = enrollments.filter(function (en) {
        return en.courseId == courseId;
    });

    let instructorUser = users.filter(function (us) {
        return us.userId === course.instructorId;
    });

    console.log(instructorUser);

    let instructorName = instructorUser[0].username;

    let secondaryString = currentCourseEnrollments.length + " Students Enrolled";

    return (

        <Box sx={{display: 'flex'}}>


            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >

                <Container className="course-details-main" maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',


                                }}
                            >

                                <img style={{maxHeight: "40vh"}} src={course.imageUrl}/>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',

                                }}
                            >

                                <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar sx={{bgcolor: 'rgb(226, 94, 62)'}}>
                                                <Person2Icon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Enrolled Students" secondary={secondaryString}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar sx={{bgcolor: 'rgb(226, 94, 62)'}}>
                                                <Face2Icon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Instructor" secondary={instructorName}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar sx={{bgcolor: 'rgb(226, 94, 62)'}}>
                                                <BookIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Chapters" secondary="20 hours"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar sx={{bgcolor: 'rgb(226, 94, 62)'}}>
                                                <CategoryIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Category" secondary={course.category}/>
                                    </ListItem>
                                    <Button className="enrollButton" variant="contained">Enroll</Button>
                                </List>


                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                <p>{course.description}</p>

                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </Box>
        </Box>

    );
}