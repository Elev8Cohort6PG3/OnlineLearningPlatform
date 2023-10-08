import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PublishIcon from '@mui/icons-material/Publish';
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

export default function CoursePublishForm(props) {
    const {courseTitle, courseDescription, courseCategory, inputFields, setActiveStep} = props;

    const handlePublish = (e) => {
        e.preventDefault();
        setActiveStep(3);
    }


    const handleBack = (e) => {
        e.preventDefault();
        setActiveStep(1);
    }


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Course Summary
            </Typography>
            <List disablePadding>
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Course Title" secondary={courseTitle}/>
                </ListItem>
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Course Description" secondary={courseDescription}/>
                </ListItem>
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Category" secondary={courseCategory}/>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item container direction="column" xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom sx={{mt: 2}}>
                        Content Details
                    </Typography>
                    <Grid container>
                        {inputFields.map((inputField) => (
                            <React.Fragment>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>Video URL: {inputField.videoURL}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>Description: {inputField.description}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        sx={{mt: 3, mb: 2, height: "40px"}}
                        className="nextButton"
                        onClick={(e) => {
                            handleBack(e)
                        }}
                    >
                        Back <ArrowLeftIcon fontSize="large"/>
                    </Button>
                </Grid>
                <Grid sx={{display: "flex", justifyContent: "flex-end"}} item xs={12}>
                    <Button
                        variant="contained"
                        sx={{mt: 3, mb: 2, height: "40px"}}
                        className="nextButton"
                        onClick={(e)=>{handlePublish(e)}}
                    >
                        Publish <PublishIcon fontSize="medium"/>
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}