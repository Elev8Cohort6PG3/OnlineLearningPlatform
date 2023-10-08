import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function CourseAdvancedInfoForm(props) {
    const {inputFields, setInputFields, activeStep, setActiveStep} = props;


    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        let newField = {videoURL: '', description: ''};
        setInputFields([...inputFields, newField]);
    }

    const removeFields = (index) => {
        if (index === 0) {
            return;
        }
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields);
        setActiveStep(2);
    }

    const handleBack = (e) => {
        e.preventDefault();
        setActiveStep(0);
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Course Content
            </Typography>
            <Grid container component="form" onSubmit={submit} spacing={3} mt={5}>
                {inputFields.map((input, index) => {
                    return (
                        <Grid container ml={5}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    name="videoURL"
                                    id="videoURL"
                                    label="video URL"

                                    autoComplete="URL"
                                    variant="standard"
                                    value={input.videoURL}
                                    onChange={event => handleFormChange(index, event)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    name="description"
                                    id="videoDescription"
                                    label="Description"

                                    autoComplete="description"
                                    variant="standard"
                                    value={input.description}
                                    onChange={event => handleFormChange(index, event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    onClick={() => removeFields(index)}
                                    variant="contained"
                                    sx={{mt: 3, mb: 2, height: "40px"}}
                                    className="nextButton"
                                >
                                    Remove <RemoveIcon fontSize="medium"/>
                                </Button>
                            </Grid>
                        </Grid>
                    )
                })}
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Button
                        onClick={addFields}
                        variant="contained"
                        sx={{mt: 3, mb: 2, height: "40px"}}
                        className="nextButton"
                    >
                        Add Field <AddIcon fontSize="medium"/>
                    </Button>
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
                <Grid item xs={6}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2, ml: 10, height: "40px"}}
                        className="nextButton"
                    >
                        Finalize <ArrowRightIcon fontSize="large"/>
                    </Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}