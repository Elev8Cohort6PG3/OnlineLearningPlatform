import React from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import "../css/HomePage.css";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Home(props) {
  // let displayName = Home.name;
  return (
    <div id="HomePage">
      <Grid container>
        <Grid item sm={6}>
          <div id="MainText">
            <h2>Start your journey</h2>
            <h1>TODAY!</h1>
            <div className="Buttons">
              <Button
                variant="contained"
                className="button"
                size="large"
                href="/login"
                sx={{ mt: 1, mb: 2 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                size="large"
                href="/signup"
                sx={{ mt: 1, mb: 2 }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item sm={6}>
          <img src="https://i.imgur.com/LcfTfsc.jpg" />
        </Grid>
      </Grid>
      <h1 style={{textAlign: "center", paddingTop: "25px"}}>Read our customer reviews:</h1>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>buralara</Grid>
        <Grid item xs={12} sm={6} md={3}>coursecard gibi</Grid>
        <Grid item xs={12} sm={6} md={3}>reviewcard</Grid>
        <Grid item xs={12} sm={6} md={3}>gelecek</Grid>
      </Grid>
    </div>
  );
}
