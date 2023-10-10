import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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
import ViewProfileDialog from "../components/ViewProfileDialog";
import {useEffect, useState} from "react";
import axios from "axios";
import UserCredentials from "../authentication/UserCredentials";
import CourseEnrollButton from "../components/CourseEnrollButton";

export default function CourseDetails() {
    const [profileDialogOpen, setProfileDialogOpen] = React.useState(false);
    let param = useParams();
    let courseId = param.courseId;

    const [course, setCourse] = useState(null);
    const [instructor, setInstructor] = useState(null);
    const [userType, setUserType] = useState("Member");



    useEffect(() => {
        if(UserCredentials().role.includes("Lecturer")) {
            setUserType("Lecturer");
        } else if(UserCredentials().role.includes("Admin")) {
            setUserType("Admin");
        }
        axios.get(`https://localhost:7240/course/${courseId}`, {}).then((response) => {
                setCourse(response.data);
                console.log(response.data);

                axios.get(`https://localhost:7240/users/${response.data.userName}`, {}).then((response) => {
                        setInstructor(response.data);
                        console.log(response.data);
                    }
                )
            }
        )
    }, []);


    const handleProfileDialogClose = () => {
        setProfileDialogOpen(false);
    };

    const handleProfileDialogOpen = () => {
        setProfileDialogOpen(true);
    };

    let enrolledStudentsString = "10" + " Students Enrolled";

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
                                {course &&
                                    <img style={{maxHeight: "40vh"}} src={course.courseWithoutVideoDto.imageUrl}/>}

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
                                        <ListItemText primary="Enrolled Students" secondary={enrolledStudentsString}/>
                                    </ListItem>
                                    <ListItem style={{cursor: "pointer"}} onClick={() => {
                                        setProfileDialogOpen(true);
                                    }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{bgcolor: 'rgb(226, 94, 62)'}}>
                                                <Face2Icon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        {instructor &&
                                            <ListItemText primary="Instructor" secondary={instructor.userName}/>}
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
                                        {course && <ListItemText primary="Category"
                                                                 secondary={course.courseWithoutVideoDto.category}/>}
                                    </ListItem>
                                    <ListItem>
                                        {(userType === "Member") && <CourseEnrollButton courseId={courseId}/>}
                                    </ListItem>
                                    {instructor && <ViewProfileDialog userName={instructor.userName} open={profileDialogOpen} onClose={handleProfileDialogClose}/>}
                                </List>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                {course && <p>{course.courseWithoutVideoDto.description}</p>}
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </Box>
        </Box>

    );
}