import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import VideoEmbed from "../components/VideoEmbed";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import UserCredentials from "../authentication/UserCredentials";
import Button from "@mui/material/Button";




function VerticalLinearStepper(props) {
    let steps = props.steps;
    let activeStep = props.activeStep;
    let setActiveStep = props.setActiveStep;
    let embedId = props.embedId;
    let setEmbedId = props.setEmbedId;
    let enrollment = props.enrollment;

    const handleStep = (stepNumber) => {
        setActiveStep(stepNumber);
        setEmbedId(steps[stepNumber].url.split('?v=')[1]);
        let completionRate = (((stepNumber) / (steps.length) ) * 100).toFixed(2);
        console.log("completion rate" + completionRate);
        axios.put('https://localhost:7240/Enrollment', {
            id: enrollment.id,
            completionPercentage: parseInt(completionRate)
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const handleFinish = () => {
        let completionRate = 100;
        console.log("completion rate" + completionRate);
        axios.put('https://localhost:7240/Enrollment', {
            id: enrollment.id,
            completionPercentage: parseInt(completionRate)
        })
            .then(function (response) {
                console.log(response);
                window.location.assign("/student-dashboard");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Box sx={{maxWidth: 400}}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps && steps.map((step, index) => (
                    <Step key={step.url}>
                        <StepLabel
                        >
                            <a onClick={() => {
                                handleStep(index)
                            }}>  Lesson {index+1}  </a>
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>

                        </StepContent>
                    </Step>
                ))}
                {steps && activeStep === steps.length-1 && (
                    <Paper elevation={0} sx={{ p: 3 }}>
                        <Typography style={{fontSize: "12px"}}>Click to Finish this Course!</Typography>
                        <Button className="nextButton" onClick={()=>{handleFinish()}} sx={{ mt: 1, mr: 1 }}>
                            Finish
                        </Button>
                    </Paper>
                )}
            </Stepper>
        </Box>
    );
}


export default function ConsumeContent() {
    let param = useParams();
    let courseId = param.courseId;
    const [course, setCourse] = useState(null);
    const [enrollment, setEnrollment] = useState(null);
    const [steps, setSteps] = React.useState(null);
    const [completionRate, setCompletionRate] = React.useState(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const [embedId, setEmbedId] = useState(null);


    useEffect(() => {
        axios.get(`https://localhost:7240/course/${courseId}`, {}).then((response) => {
                setCourse(response.data);
                console.log(response.data);
                setSteps(response.data.videoDto);

                axios.get(`https://localhost:7240/Enrollment/user/${UserCredentials().username}`, {}).then((res) => {
                    const results = res.data.filter(obj => {
                        return obj.courseId === parseInt(courseId);
                    });
                    setEnrollment(results[0]);
                    setCompletionRate(results[0].completionPercentage);
                    setActiveStep(Math.ceil((response.data.videoDto.length) * ((results[0].completionPercentage)/100)) );
                    setEmbedId(response.data.videoDto[Math.ceil((response.data.videoDto.length) * ((results[0].completionPercentage)/100))].url.split('?v=')[1]);
                    }
                )
            }
        )
    }, []);

    return (
        <div>
            <Box sx={{display: 'flex'}}>

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) => theme.palette.grey[100],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={3}>


                            <Grid item xs={12}>
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>


                                    {course && <Typography style={{fontSize: "40px"}}>{course.courseWithoutVideoDto.title}</Typography>}

                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',

                                    }}
                                >

                                    <VideoEmbed embedId={embedId}/>

                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '500px',
                                        overflowY: 'scroll',
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none'
                                    }}
                                >
                                    <VerticalLinearStepper  enrollment={enrollment} embedId={embedId} setEmbedId={setEmbedId} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps}/>

                                </Paper>
                            </Grid>

                            <Grid item xs={12}>
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>


                                    {course && <Typography style={{fontSize: "25px"}}>{course.courseWithoutVideoDto.description}</Typography>}

                                </Paper>
                            </Grid>


                        </Grid>

                    </Container>
                </Box>
            </Box>
        </div>
    );
}