import React from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import UserCredentials from "../authentication/UserCredentials";

import "../css/HomePage.css";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Home(props) {
  let role = UserCredentials().role;
  let isLoggedIn = UserCredentials().isLoggedIn;
  console.log(isLoggedIn);
  // let displayName = Home.name;
  return (
    <div id="HomePage">
      <Grid container>
        <Grid item sm={6}>
          <div id="MainText">
            {isLoggedIn ? (
              <><h2>Welcome back!</h2>
              {role[2] === 'Lecturer' && role[1] === 'Admin' && role[0] === 'Member' &&(
                <><Button
                    variant="contained"
                    className="button"
                    size="large"
                    href="/admin-panel"
                    sx={{ mt: 1, mb: 2, marginRight: 2 }}
                  >
                    Go to Admin Panel
                  </Button><Button
                    variant="contained"
                    className="button"
                    size="large"
                    href="/instructor-dashboard"
                    sx={{ mt: 1, mb: 2, marginRight: 2 }}
                  >
                      Go to Lecturer Dashboard
                    </Button></>           
              )}
              {role[1] === 'Lecturer' && role[0] === 'Member' &&(
                <Button
                  variant="contained"
                  className="button"
                  size="large"
                  href="/instructor-dashboard"
                  sx={{ mt: 1, mb: 2, marginRight: 2 }}
                >
                  Go to Lecturer Dashboard
                </Button>
                
              )}
              {role[0] === 'Member' && (
                <Button
                  variant="contained"
                  className="button"
                  size="large"
                  href="/student-dashboard"
                  sx={{ mt: 1, mb: 2, marginRight: 2 }}
                >
                  Go to Student Dashboard
                </Button>
              )}
              {role[0] === 'Admin' && (
                <Button
                  variant="contained"
                  className="button"
                  size="large"
                  href="/admin-panel"
                  sx={{ mt: 1, mb: 2, marginRight: 2 }}
                >
                  Go to Admin Panel
                </Button>
              )}
              {role === 'Lecturer' && (
                <Button
                  variant="contained"
                  className="button"
                  size="large"
                  href="/instructor-dashboard"
                  sx={{ mt: 1, mb: 2, marginRight: 2 }}
                >
                  Lecturer Dashboard
                </Button>
                
              )}
              </>
            ) : (
              <div>
                <h2>Start your journey</h2>
                <h1>TODAY!</h1>
                <div className="Buttons">
                  <Button
                    variant="contained"
                    className="button"
                    size="large"
                    href="/login"
                    sx={{ mt: 1, mb: 2, marginRight: 2 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-in-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                    <span style={{ marginLeft: "8px" }}>Login</span>
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    href="/signup"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      <path
                        fill-rule="evenodd"
                        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                      />
                    </svg>
                    <span style={{ marginLeft: "8px" }}>Sign Up</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid item sm={6}>
          <img
            src="https://i.imgur.com/LcfTfsc.jpg"
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid>
      <h1 style={{ textAlign: "center", paddingTop: "25px" }}>
        Read our customer reviews:
      </h1>
      <Grid container spacing={4}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgba(198,61,47,0.87)",
                backdropFilter: "blur(10px)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  pt: "2.5%",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={review.image}
                  alt={review.name}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {review.name}
                </Typography>
                <Typography style={{ maxHeight: "100px", overflow: "hidden" }}>
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const reviews = [
  {
    name: "Ahmet",
    comment:
      "I recently had the opportunity to explore Learning Management System, and I must say, it left quite an impression on me. This innovative website offers a diverse and comprehensive range of courses that cater to learners of all levels and interests.",
    image: "https://picsum.photos/id/91/200",
  },
  {
    name: "Mahmut",
    comment:
      "This new learning website is a game-changer in online education. With its extensive course selection and user-friendly interface, it offers a seamless learning experience that caters to learners of all backgrounds and interests.",
    image: "https://picsum.photos/id/177/200",
  },
  {
    name: "Mehmet",
    comment:
      "I'm thoroughly impressed with this new learning platform. Its diverse range of courses, interactive content, and engaging instructors make learning enjoyable and enriching, making it a standout choice in the world of online education.",
    image: "https://picsum.photos/id/453/200",
  },
  {
    name: "Gizem",
    comment:
      "This learning website exceeds expectations with its exceptional course quality and user-friendly interface. Its comprehensive content and expert instructors create a dynamic and engaging learning environment, setting a new standard in online education.",
    image: "https://picsum.photos/id/65/200",
  },
];
