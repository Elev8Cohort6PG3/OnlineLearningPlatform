import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import VideoEmbed from "./VideoEmbed";


const steps = [
    {
        label: 'Video 1',
        description: `We learn bla bla.`,
    },
    {
        label: 'Video 2',
        description:
            'We learn bla bla.',
    },
    {
        label: 'Video 3',
        description: `We learn bla bla.`,
    }
];

function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleStep = (stepNumber) => {
        setActiveStep(stepNumber);
    };

    return (
        <Box sx={{maxWidth: 400}}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                        >
                            <a onClick={() => {
                                handleStep(index)
                            }}>  {step.label}  </a>
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>

                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length - 1 && (
                <Paper square elevation={0} sx={{p: 3}}>
                    <Typography>You've finished this course!</Typography>
                    <Button sx={{mt: 1, mr: 1}}>
                        Go To My Courses
                    </Button>
                </Paper>
            )}
        </Box>
    );
}


export default function ConsumeContent() {

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


                                    Course Info

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

                                    <VideoEmbed embedId="rokGy0huYEA"/>

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
                                    <VerticalLinearStepper/>

                                </Paper>
                            </Grid>


                        </Grid>

                    </Container>
                </Box>
            </Box>
        </div>
    );
}