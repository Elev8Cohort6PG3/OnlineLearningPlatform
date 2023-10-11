import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function CourseBasicInfoForm(props) {
    const {courseTitle, setCourseTitle, courseDescription, setCourseDescription, courseCategory, setCourseCategory, imageURL, setImageURL, activeStep, setActiveStep} = props;
    const handleSubmit = (event) => {
        event.preventDefault();
        let imgUrl = document.getElementById("imageURL").value;
        if(!(imgUrl.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
            alert("Please provide a valid image link!");
            return;
        }
        setActiveStep(1);
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Course Metadata
            </Typography>
            <Grid container component="form" onSubmit={handleSubmit}  spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="courseTitle"
                        name="courseTitle"
                        label="Title"
                        fullWidth
                        autoComplete="title"
                        variant="standard"
                        value={courseTitle}
                        onChange={(e)=>{setCourseTitle(e.target.value)}}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="courseDescription"
                        name="courseDescription"
                        label="Description"
                        fullWidth
                        multiline
                        autoComplete="description"
                        variant="standard"
                        value={courseDescription}
                        onChange={(e)=>{setCourseDescription(e.target.value)}}

                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="courseCategory"
                        name="courseCategory"
                        label="Category"
                        fullWidth
                        autoComplete="category"
                        variant="standard"
                        value={courseCategory}
                        onChange={(e)=>{setCourseCategory(e.target.value)}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="imageURL"
                        name="imageURL"
                        label="Image URL"
                        fullWidth
                        autoComplete="URL"
                        variant="standard"
                        value={imageURL}
                        onChange={(e)=>{setImageURL(e.target.value)}}
                    />
                </Grid>
                <Grid sx={{display: "flex", justifyContent: "flex-end"}} item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2, height: "40px"}}
                        className="nextButton"
                    >
                        Course Content <ArrowRightIcon fontSize="large"/>
                    </Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}