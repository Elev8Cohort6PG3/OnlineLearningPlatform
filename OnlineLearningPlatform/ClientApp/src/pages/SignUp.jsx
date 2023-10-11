import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './LoginSignUp.css';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import axios from "axios";
import jwt_decode from "jwt-decode";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect} from "react";
import UserCredentials from "../authentication/UserCredentials";

export default function SignUp() {

    const [errorPresent, setErrorPresent] = React.useState(false);
    const [registerSuccessful, setRegisterSuccessful] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    useEffect(() => {
        if (UserCredentials().isLoggedIn) {
            window.location.assign("/");
        }
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setErrorPresent(false);


        if (data.get('password') !== data.get('passwordRepeat')) {
            setErrorPresent(true);
            setErrorMessage("Passwords must match!");
            return;
        }

        axios.post("https://localhost:7240/account/register/member", {
            username: data.get('username').toLowerCase(),
            password: data.get('password'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName')
        })
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                const decodedToken = jwt_decode(token);
                console.log(decodedToken);

                localStorage.setItem('jwtToken', JSON.stringify(token));
                localStorage.setItem('role', JSON.stringify(decodedToken.role));
                localStorage.setItem('username', JSON.stringify(decodedToken.unique_name));
                localStorage.setItem('nameId', JSON.stringify(decodedToken.nameid));
                setRegisterSuccessful(true);
                setTimeout(
                    () => window.location.assign("/"),
                    1000
                );
            }).catch(error => {
            console.log(error);
            setErrorPresent(true);
            if (typeof error.response.data === "object") {
                setErrorMessage(error.response.data[0].description);
            } else if (typeof error.response.data === "string") {
                setErrorMessage(error.response.data);
            }
        });
    };

    return (
        <div style={{
            background: 'linear-gradient(45deg, rgb(226, 94, 62) 0%, rgb(255, 155, 80) 40%, rgb(255, 187, 92) 100%)',
            height: '80vh'
        }}>
            <Container component="main" maxWidth="xs" className="signup-main">
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'rgb(226, 94, 62)'}}>
                        <LockPersonIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    fullWidth
                                    id="firstName"
                                    label="First Name (optional)"
                                    autoFocus
                                    color="warning"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    label="Last Name (optional)"
                                    name="lastName"
                                    autoComplete="family-name"
                                    color="warning"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Mail Address (optional)"
                                    name="email"
                                    autoComplete="username"
                                    color="warning"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    color="warning"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    color="warning"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordRepeat"
                                    label="Repeat Password"
                                    type="password"
                                    id="passwordRepeat"
                                    autoComplete="new-password"
                                    color="warning"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            className="signButton"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>

                        <Box sx={{width: '100%'}}>

                            <Collapse in={errorPresent}>
                                <Alert
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setErrorPresent(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit"/>
                                        </IconButton>
                                    }
                                    sx={{mb: 2}}
                                >
                                    {errorMessage}
                                </Alert>
                            </Collapse>
                            <Collapse in={registerSuccessful}>
                                <Alert
                                    severity="success"

                                    sx={{mb: 2}}
                                >
                                    Registration Successful.
                                </Alert>
                            </Collapse>


                        </Box>


                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/instructor-signup" variant="body2">
                                    <label className="linkLabels">Do you want to teach with us?</label>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    <label className="linkLabels">Already have an account? Sign In</label>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}