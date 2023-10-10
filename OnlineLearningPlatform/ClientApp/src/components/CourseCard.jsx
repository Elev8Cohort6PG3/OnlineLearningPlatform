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

export default function CourseCard(props) {
    const navigate = useNavigate();
    const [InstructorPageCourseCard, setInstructorPageCourseCard] = useState(false);

    useEffect(() => {
        if(!(props.instructorPageCourseCard === undefined) && (props.instructorPageCourseCard === true)) {
            setInstructorPageCourseCard(true);
        }
    }, []);

    let course = props.courseInfo;
    let courseBasics = course.courseWithoutVideoDto;

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
                <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '56.25%',
                    }}
                    image={courseBasics.imageUrl}
                    onClick={() => {
                        window.location.assign(`/course-details/${courseBasics.id}`)
                    }}
                />
                <CardContent onClick={() => {
                    window.location.assign(`/course-details/${courseBasics.id}`)
                }} sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {courseBasics.title}
                    </Typography>
                    <Typography maxWidth={350}
                                style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
                        {courseBasics.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={()=>{navigate(`/edit-course/${courseBasics.id}`)}}>Edit Course</Button>
                    <Button>Delete Course</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}