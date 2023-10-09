import {useState} from "react";
import SimpleSearch from "../components/SimpleSearch";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CourseCard from "../components/CourseCard";
import * as React from "react";

export default function Search(props) {
    const [searchResults, setSearchResults] = useState(null);
    let param = useParams();
    let searchVal = param.searchVal;
    return(
        <div>
            <div style={{
                background: 'linear-gradient(90deg, rgb(226, 94, 62) 0%, rgb(255, 155, 80) 53%, rgb(255, 187, 92) 100%)',
                backgroundBlendMode: 'multiply'
            }}>
                <main>
                    <Box className="searchPageContainer"
                         sx={{
                            bgcolor: 'background.paper',
                            pt: 8,
                            pb: 6,
                            backgroundColor: 'rgba(0,0,0,0)'
                        }}
                    >
                        <Container style={{padding: "0px"}} maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                Search Courses
                            </Typography>
                            <SimpleSearch autoFocus={true} searchResults={searchResults} setSearchResults={setSearchResults} predeterminedSearchVal={searchVal}/>
                        </Container>
                    </Box>
                    <Container sx={{py: 8}} maxWidth="90%">
                        <Grid container spacing={4}>
                            {searchResults && (searchResults.map((course, index) => (
                                <CourseCard courseInfo={course}/>
                            )))}
                        </Grid>
                    </Container>
                </main>

                <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
                    <Typography variant="h6" align="center" gutterBottom>
                        Learning Management System
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        component="p"
                    >
                        Could be start of something big!
                    </Typography>
                </Box>

            </div>


        </div>



    );
}