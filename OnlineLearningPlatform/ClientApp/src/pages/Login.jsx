import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import './LoginSignUp.css';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Navigate, useNavigate} from 'react-router-dom';

export default function Login() {
    const [errorPresent, setErrorPresent] = React.useState(false);
    const [loginSuccessful, setLoginSuccessful] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setErrorPresent(false);

            axios.post("https://localhost:7240/account/login", {
                username: data.get('username').toLowerCase(),
                password: data.get('password')
            })
                .then((response) => {
                    console.log(response);
                    const token = response.data.token;
                    const decodedToken = jwt_decode(token);
                    console.log(decodedToken);

                    localStorage.setItem('jwtToken', JSON.stringify(token));
                    localStorage.setItem('role', JSON.stringify(decodedToken.role));
                    localStorage.setItem('username', JSON.stringify(decodedToken.unique_name));
                    setLoginSuccessful(true);
                    setTimeout(
                        () => window.location.assign("/"),
                        1000
                    );
                }).catch(error => {
                    console.log(error);
                    setErrorPresent(true);
                    setErrorMessage(error.response.data);
            });



    };


    return (
        <div>
            <Grid container component="main" sx={{height: '100vh'}} className="login-main">
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
                      style={{background: 'linear-gradient(45deg, rgb(226, 94, 62) 0%, rgb(255, 155, 80) 40%, rgb(255, 187, 92) 100%)'}}>

                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',

                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'rgb(226, 94, 62)'}}>
                            <LockPersonIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    color="warning"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    color="warning"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    className="signButton"
                                >
                                    Sign In
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
                                <Collapse in={loginSuccessful}>
                                    <Alert
                                        severity="success"

                                        sx={{mb: 2}}
                                    >
                                        Login Successful.
                                    </Alert>
                                </Collapse>


                            </Box>

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        <label className="linkLabels">Forgot password?</label>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        <label className="linkLabels">Don't have an account? Sign Up</label>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}