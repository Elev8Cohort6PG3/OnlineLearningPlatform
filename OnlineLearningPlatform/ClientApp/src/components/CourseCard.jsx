import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import CourseDeleteDialog from "./CourseDeleteDialog";
import axios from "axios";

export default function CourseCard(props) {
    const navigate = useNavigate();
    const [instructorPageCourseCard, setInstructorPageCourseCard] = useState(false);
    const [currentUserIsAuthorized, setCurrentUserIsAuthorized] = useState(false);
    let courseId = props.courseId;
    let course = props.courseInfo;
    let courseBasics;
    if(!(course === undefined)) {
        courseBasics = course.courseWithoutVideoDto;
    }

    const [courseGotByCourseId, setCourseGotByCourseId] = useState(null);

    useEffect(() => {
        if(!(props.instructorPageCourseCard === undefined) && (props.instructorPageCourseCard === true)) {
            setInstructorPageCourseCard(true);
        }
        if(!(props.currentUserIsAuthorized === undefined) && (props.currentUserIsAuthorized === true)) {
            setCurrentUserIsAuthorized(true);
        }

        if(!(courseId === undefined)) {
            axios.get(`https://localhost:7240/course/${courseId}`).then((response)=>{
                setCourseGotByCourseId(response.data);
            })
        }
    }, []);





    return (
        <Grid item key={course} xs={12} sm={6} md={3}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(198,61,47,0.87)',
                    backdropFilter: 'blur(100px)'
                }}
            >
                {props.courseInfo &&  <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '56.25%',
                    }}
                    image={courseBasics.imageUrl}
                    onClick={() => {
                        window.location.assign(`/course-details/${courseBasics.id}`)
                    }}
                />}
                {props.courseId && courseGotByCourseId && <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '56.25%',
                    }}
                    image={courseGotByCourseId.courseWithoutVideoDto.imageUrl}
                    onClick={() => {
                        window.location.assign(`/course-details/${courseGotByCourseId.courseWithoutVideoDto.id}`)
                    }}
                />}
                {props.courseInfo && <CardContent onClick={() => {
                    window.location.assign(`/course-details/${courseBasics.id}`)
                }} sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {courseBasics.title}
                    </Typography>
                    <Typography maxWidth={350}
                                style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
                        {courseBasics.description}
                    </Typography>
                </CardContent>}
                {props.courseId && courseGotByCourseId &&  <CardContent onClick={() => {
                    window.location.assign(`/course-details/${courseGotByCourseId.courseWithoutVideoDto.id}`)
                }} sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {courseGotByCourseId.courseWithoutVideoDto.title}
                    </Typography>
                    <Typography maxWidth={350}
                                style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
                        {courseGotByCourseId.courseWithoutVideoDto.description}
                    </Typography>
                </CardContent>}
                {instructorPageCourseCard && currentUserIsAuthorized && props.courseInfo && <CardActions>
                    <Button onClick={()=>{navigate(`/edit-course/${courseBasics.id}`)}}>Edit Course</Button>
                    <CourseDeleteDialog courseId={courseBasics.id}/>
                </CardActions>}
                {instructorPageCourseCard && currentUserIsAuthorized && props.courseId && <CardActions>
                    <Button onClick={()=>{navigate(`/edit-course/${courseGotByCourseId.courseWithoutVideoDto.id}`)}}>Edit Course</Button>
                    <CourseDeleteDialog courseId={courseGotByCourseId.courseWithoutVideoDto.id}/>
                </CardActions>}
            </Card>
        </Grid>
    )
}