import {useEffect, useState} from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import * as React from "react";
import '../css/SimpleSearch.css';
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";

function SimpleSearch(props) {
    const {searchResults, setSearchResults, predeterminedSearchVal, autoFocus} = props;
    const [searchVal, setSearchVal] = useState("");
    const [courses, setCourses] = useState("");
    const [isSmall, setIsSmall] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        if ((props.searchResults === undefined)) {
            setIsSmall(true);
        }
        axios.get("https://localhost:7240/course", {}).then((response) => {
                setCourses(response.data);
                if (!(predeterminedSearchVal === undefined)) {
                    setSearchVal(predeterminedSearchVal);
                    const filterBySearch = response.data.filter((course) => {
                        if (course.courseWithoutVideoDto.title.toLowerCase()
                            .includes(predeterminedSearchVal.toLowerCase())) {
                            return course;
                        }
                    })
                    setSearchResults(filterBySearch);
                }
            }
        )
    }, [predeterminedSearchVal]);

    function handleOnChange(e) {
        setSearchVal(e.target.value);
        if (e.target.value === "") {
            setFilteredCourses(courses.slice(0, 0));
            if (!(props.searchResults === undefined)) {
                setSearchResults(courses);
            }
            return;
        }
        const filterBySearch = courses.filter((course) => {
            if (course.courseWithoutVideoDto.title.toLowerCase()
                .includes(e.target.value.toLowerCase())) {
                return course;
            }
        })
        const smallResults = filterBySearch.slice(0, 3);
        setFilteredCourses(smallResults);
        if (!(props.searchResults === undefined)) {
            setSearchResults(filterBySearch);
        }
    }


    function handleSearchClick() {
        setSearchVal("");
        setFilteredCourses(courses.slice(0, 0));
        navigate(`/search/${searchVal}`);
    }

    return (
        <div>
            <div className="searchDiv">
                <TextField autoFocus={autoFocus} placeholder="search" onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearchClick();
                    }
                }}
                           value={searchVal} className="searchInput" onChange={e => handleOnChange(e)}>
                </TextField>
                <SearchIcon className="searchIcon" onClick={handleSearchClick}/>
            </div>

            <Grid item className="courseSearchGrid" xs={12} sm={6} md={3}>

                {filteredCourses && isSmall && filteredCourses.map((course) => {
                    return (
                        <Card
                            className="courseSearchCard"
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'rgba(198,61,47,0.18)',
                                backdropFilter: 'blur(100px)',
                                cursor: 'pointer',
                                width: "220px",
                                marginLeft: "10px"
                            }}
                            onClick={() => {
                                window.location.assign(`/course-details/${course.courseWithoutVideoDto.id}`)
                            }}
                        >
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {course.courseWithoutVideoDto.title}
                                </Typography>
                                <Typography maxWidth={350}
                                            style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap"
                                            }}>
                                    {course.courseWithoutVideoDto.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })
                }
            </Grid>

        </div>
    );

}

export default SimpleSearch;