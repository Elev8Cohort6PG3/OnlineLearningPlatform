import Button from "@mui/material/Button";
import UserCredentials from "../authentication/UserCredentials";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CourseEnrollButton(props) {
    let courseId = parseInt(props.courseId);
    const [enrolled, setEnrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let postData = {};
        let axiosConfig = {
            headers: {
                'Authorization': `bearer ${UserCredentials().token}`,
            }
        };
        axios.get(`https://localhost:7240/Enrollment/user/${UserCredentials().username}`, postData, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res.data);
                const isTheUserEnrolledToThisCourse = res.data.filter(enrollment => {
                    return enrollment.courseId === courseId;
                });
                console.log(isTheUserEnrolledToThisCourse)
                if(isTheUserEnrolledToThisCourse.length > 0) {
                    setEnrolled(true);
                }
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }, []);

    const handleGoToCourse = (event) => {
        event.preventDefault();
        navigate(`/consume-content/${courseId}`);

    };
    const handleEnroll = (event) => {
        console.log("handleEnroll")
        event.preventDefault();
        let postData = {};
        let axiosConfig = {
            headers: {
                'Authorization': `bearer ${UserCredentials().token}`,
            }
        };
        axios.post(`https://localhost:7240/Enrollment/${courseId}`, postData, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                setEnrolled(true);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    };

    return (<div>
            {!enrolled && <Button className="nextButton" variant="contained" id="enrollButton" onClick={(e) => {handleEnroll(e)}}>Enroll</Button>}
            {enrolled && <Button className="nextButton" variant="contained" id="enrollButton" onClick={(e) => {handleGoToCourse(e)}}>Go to Course</Button>}
    </div>

    )

}