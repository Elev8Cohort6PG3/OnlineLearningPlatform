import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import CourseBasicInfoForm from "../components/CourseBasicInfoForm";
import CourseAdvancedInfoForm from "../components/CourseAdvancedInfoForm";
import CoursePublishForm from "../components/CoursePublishForm";
import {useEffect, useState} from "react";
import '../css/courseCRUD.css';
import {useParams} from "react-router-dom";
import axios from "axios";
import UserCredentials from "../authentication/UserCredentials";
import Unauthorized from "../authentication/Unauthorized";

const steps = ['Course Information', 'Course Content', 'Finalize'];

export default function CourseCRUD() {
    let param = useParams();
    let courseId = param.courseId;
    const [instructorUsername, setInstructorUsername] = React.useState("");

    const [editMode, setEditMode] = React.useState(false);
    const [userIsAuthorized, setUserIsAuthorized] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [courseTitle, setCourseTitle] = React.useState("");
    const [courseDescription, setCourseDescription] = React.useState("");
    const [courseCategory, setCourseCategory] = React.useState("");
    const [imageURL, setImageURL] = React.useState("");
    const [inputFields, setInputFields] = useState([
        {url: '', description: ''}
    ]);


    useEffect(() => {
        if (!(courseId === undefined)) {
            setEditMode(true);
            axios.get(`https://localhost:7240/course/${courseId}`, {}).then((response) => {
                    console.log(response.data);
                    setCourseTitle(response.data.courseWithoutVideoDto.title);
                    setCourseDescription(response.data.courseWithoutVideoDto.description);
                    setCourseCategory(response.data.courseWithoutVideoDto.category);
                    setImageURL(response.data.courseWithoutVideoDto.imageUrl);
                    setInputFields(response.data.videoDto);
                    setInstructorUsername(response.data.userName);
                    setUserIsAuthorized(response.data.userName === UserCredentials().username);

                }
            )

        }
    }, []);


    function getStepContent(step) {
        if(!(userIsAuthorized) && editMode) {
            let requiredRole = "This Course Belongs to " + instructorUsername;
            return(<Unauthorized requiredRole={requiredRole}/>);
        }
        switch (step) {
            case 0:
                return <CourseBasicInfoForm courseTitle={courseTitle}
                                            setCourseTitle={setCourseTitle}
                                            courseDescription={courseDescription}
                                            setCourseDescription={setCourseDescription}
                                            courseCategory={courseCategory}
                                            setCourseCategory={setCourseCategory}
                                            activeStep={activeStep}
                                            setActiveStep={setActiveStep}
                                            imageURL={imageURL}
                                            setImageURL={setImageURL}/>;
            case 1:
                return <CourseAdvancedInfoForm inputFields={inputFields}
                                               setInputFields={setInputFields}
                                               activeStep={activeStep}
                                               setActiveStep={setActiveStep}/>;
            case 2:
                return <CoursePublishForm courseTitle={courseTitle}
                                          courseDescription={courseDescription}
                                          courseCategory={courseCategory}
                                          inputFields={inputFields}
                                          setActiveStep={setActiveStep}
                                          imageURL={imageURL} editMode={editMode} courseId={courseId}
                />;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Course CRUD Operations
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step sx={{
                                '& .MuiStepLabel-root .Mui-completed': {
                                    color: 'rgb(226, 94, 62)', // circle color (COMPLETED)
                                },
                                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                    {
                                        color: 'rgb(226, 94, 62)', // Just text label (COMPLETED)
                                    },
                                '& .MuiStepLabel-root .Mui-active': {
                                    color: 'rgb(255, 155, 80)', // circle color (ACTIVE)
                                },
                                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                    {
                                        color: 'rgb(255, 155, 80)', // Just text label (ACTIVE)
                                    },
                            }} key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Completed Course CRUD
                            </Typography>
                            <Typography variant="subtitle1">
                                Information Saved.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
}