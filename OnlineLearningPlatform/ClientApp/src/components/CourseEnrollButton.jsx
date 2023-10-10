import Button from "@mui/material/Button";
import UserCredentials from "../authentication/UserCredentials";
import axios from "axios";

export default function CourseEnrollButton(props) {
    let courseId = props.courseId;
    const handleEnroll = (event) => {
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
                document.getElementById("enrollButton").innerText = "Enrolled";
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    };

    return (
        <Button className="nextButton" variant="contained" id="enrollButton" onClick={(e) => {handleEnroll(e)}}>Enroll</Button>
    )

}