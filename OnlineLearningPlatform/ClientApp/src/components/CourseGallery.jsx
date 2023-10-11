import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import '../css/CourseGallery.css';
import {useEffect, useState} from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import Container from "@mui/material/Container";

export default function CourseGallery(props) {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7240/course", {}).then((response) => {
                setCourses(response.data);
            }
        )
    }, []);

    return (
        <Grid id="CourseGallery" container display="flex" justifyContent="center" xs={12}>
            <Grid xs={12} item display="flex" justifyContent="center" style={{marginTop: 40, marginBottom: 40}}>
                <h2 className="featuredCoursesText">Featured Courses</h2>
            </Grid>
            <Grid xs={12} item container display="flex" justifyContent="center" style={{minHeight: 700}}>
                <div className="courseShowcaseContainer1" onClick={()=>{window.location.assign("/course-details/1")}}>
                    <Paper style={{width: 450}} className="transparentBackground dropShadow">
                        <Card sx={{width: 450}} className="transparentBackground">
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image="https://cdn.becomeopedia.com/wp-content/uploads/software-developer-6521720_960_720.jpg"
                                    alt="green iguana"
                                />
                                <CardContent style={{display: "flex", justifyContent: "center", height: 60}}
                                             className="transparentBackground blur">
                                    <Typography gutterBottom variant="h5" component="div">
                                        Learn Crud Basics
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Paper>
                </div>
                <div className="courseShowcaseContainer2" onClick={()=>{window.location.assign("/course-details/2")}}>
                    <Paper style={{width: 450}} className="transparentBackground dropShadow">
                        <Card sx={{width: 450}} className="transparentBackground">
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image="https://www.phoenix.edu/content/dam/edu/blog/2023/02/Male-programmer-writing-code-in-modern-office-704x421.jpg"
                                    alt="green iguana"
                                />
                                <CardContent style={{display: "flex", justifyContent: "center", height: 60}}
                                             className="transparentBackground blur">
                                    <Typography gutterBottom variant="h5" component="div">
                                        Learn JavaScript Basics
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Paper>
                </div>
                <div className="courseShowcaseContainer3" onClick={()=>{window.location.assign("/course-details/3")}}>
                    <Paper style={{width: 450}} className="transparentBackground dropShadow">
                        <Card sx={{width: 450}} className="transparentBackground">
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image="https://www.limestone.edu/sites/default/files/styles/news_preview_image/public/2022-03/computer-programmer.jpg"
                                    alt="green iguana"
                                />
                                <CardContent style={{display: "flex", justifyContent: "center", height: 60}}
                                             className="transparentBackground blur">
                                    <Typography gutterBottom variant="h5" component="div">
                                        Learn JavaScript Advanced
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Paper>
                </div>
                <div className="courseShowcaseContainer4" onClick={()=>{window.location.assign("/course-details/4")}}>
                    <Paper style={{width: 450}} className="transparentBackground dropShadow">
                        <Card sx={{width: 450}} className="transparentBackground">
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image="https://usa.bootcampcdn.com/wp-content/uploads/sites/119/2020/12/tes_gen_blog_code7-1-800x412.jpg"
                                    alt="green iguana"
                                />
                                <CardContent style={{display: "flex", justifyContent: "center", height: 60}}
                                             className="transparentBackground blur">
                                    <Typography gutterBottom variant="h5" component="div">
                                        Learn HTML5
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Paper>
                </div>
                <div className="courseShowcaseContainer5" onClick={()=>{window.location.assign("/course-details/5")}}>
                    <Paper style={{width: 450}} className="transparentBackground dropShadow">
                        <Card sx={{width: 450}} className="transparentBackground">
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image="https://www.simplilearn.com/ice9/free_resources_article_thumb/how_to_become_A_programmer.jpg"
                                    alt="green iguana"
                                />
                                <CardContent style={{display: "flex", justifyContent: "center", height: 60}}
                                             className="transparentBackground blur">
                                    <Typography gutterBottom variant="h5" component="div">
                                        Learn React.js
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Paper>
                </div>
            </Grid>
            <Grid xs={12} item display="flex" justifyContent="center" style={{marginTop: 40, marginBottom: 40}}>
                <h2 className="featuredCoursesText">All Courses</h2>
            </Grid>
            {courses && <Grid xs={12} item container display="flex" justifyContent="center">
                <Container sx={{py: 8}} maxWidth="90%">
                    <Grid container spacing={4}>
                        {courses && (courses.map((course, index) => (
                            <CourseCard courseInfo={course}/>
                        )))}
                    </Grid>
                </Container>


            </Grid>}


        </Grid>
    )

}