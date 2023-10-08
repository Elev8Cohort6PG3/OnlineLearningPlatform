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
import {useState} from "react";

const steps = ['Course Information', 'Course Content', 'Finalize'];

export default function CourseCRUD() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [courseTitle, setCourseTitle] = React.useState("");
    const [courseDescription, setCourseDescription] = React.useState("");
    const [courseCategory, setCourseCategory] = React.useState("");
    const [inputFields, setInputFields] = useState([
        {videoURL: '', description: ''}
    ]);


    function getStepContent(step) {
        switch (step) {
            case 0:
                return <CourseBasicInfoForm courseTitle={courseTitle}
                                            setCourseTitle={setCourseTitle}
                                            courseDescription={courseDescription}
                                            setCourseDescription={setCourseDescription}
                                            courseCategory={courseCategory}
                                            setCourseCategory={setCourseCategory}
                                            activeStep={activeStep}
                                            setActiveStep={setActiveStep}/>;
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
                            <Step key={label}>
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