import * as React from 'react';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


export default function AllCourses() {
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
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={3}>
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
                        ))}
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