import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CourseCard from "../components/CourseCard";
import {useEffect, useState} from "react";
import axios from "axios";


export default function AllCourses() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7240/course", {}).then((response) => {
                setCourses(response.data);
            }
        )
    }, []);

    return (
        <div style={{
            background: 'linear-gradient(90deg, rgb(226, 94, 62) 0%, rgb(255, 155, 80) 53%, rgb(255, 187, 92) 100%)',
            backgroundBlendMode: 'multiply'
        }}>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                        backgroundColor: 'rgba(0,0,0,0)'
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Offered Courses
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Could be start of something big!
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{py: 8}} maxWidth="90%">
                    <Grid container spacing={4}>
                        {courses && (courses.map((course, index) => (
                            <CourseCard courseInfo={course}/>
                        )))}
                    </Grid>
                </Container>
            </main>

            <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Learning Management System
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Could be start of something big!
                </Typography>
            </Box>

        </div>
    );
}