import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import * as React from "react";

export default function CourseCard(props) {
    let course = props.courseInfo;

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
                onClick={() => {
                    window.location.assign(`/course-details/${course.courseId}`)
                }}
            >
                <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '56.25%',
                    }}
                    image={course.imageUrl}
                />
                <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {course.title}
                    </Typography>
                    <Typography>
                        {course.description}
                    </Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </Grid>
    )
}