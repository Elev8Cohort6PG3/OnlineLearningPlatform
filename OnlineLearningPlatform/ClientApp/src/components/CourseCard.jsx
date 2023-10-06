import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import * as React from "react";

export default function CourseCard(props) {
    let card = props.card;
    let index = props.index;

    return (
        <Grid item key={card} xs={12} sm={6} md={3}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(198,61,47,0.87)',
                    backdropFilter: 'blur(100px)'
                }}
                onClick={() => {
                    window.location.assign(`/course-details/${index}`)
                }}
            >
                <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                />
                <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Course One
                    </Typography>
                    <Typography>
                        We learn how to make an lms system.
                    </Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </Grid>
    )
}