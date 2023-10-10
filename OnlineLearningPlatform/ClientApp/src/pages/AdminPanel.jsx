import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CourseCard from "../components/CourseCard";
import "../css/AdminPanel.css";
import axios from "axios";
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import UserCredentials from "../authentication/UserCredentials";
import EditButton from "../components/AdminEditUser";


export default function AdminPanel(props) {
    const [users, setUsers] = useState([]);

    let axiosConfig = {
        headers: {
            'Authorization': `bearer ${UserCredentials().token}`,
        }
    };

    

    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [courses, setCourses] = useState(null);
    const [instructor, setInstructor] = React.useState(null);
    let param = useParams();
    let instructorUsername = param.instructorUsername;
    const [currentUserIsAuthorized, setCurrentUserIsAuthorized] = useState(false);

    useEffect(() => {
        if (param.instructorUsername === UserCredentials().username) {
            setCurrentUserIsAuthorized(true);
        }
        if (param.instructorUsername === undefined) {
            instructorUsername = UserCredentials().username;
            setCurrentUserIsAuthorized(true);
        }
        axios.get(`https://localhost:7240/course/all-courses/${instructorUsername}`, {}).then((response) => {
                setCourses(response.data);
                axios.get(`https://localhost:7240/users/${instructorUsername}`, {}).then((response) => {
                        if (response.data.firstName === null || response.data.firstName === undefined || response.data.firstName === "") {
                            response.data.firstName = "Not Provided";
                        }
                        if (response.data.lastName === null || response.data.lastName === undefined || response.data.lastName === "") {
                            response.data.lastName = "Not Provided";
                        }
                        if (response.data.email === null || response.data.email === undefined || response.data.email === "") {
                            response.data.email = "Not Provided";
                        }
                        setInstructor(response.data);
                    }
                )
            }
        )
    }, [editDialogOpen]);

    useEffect(() => {
        // Fetch user information
        axios.get('https://localhost:7240/users', axiosConfig)
          .then((res) => res.data)
          .then((userInformation) => {
            // Fetch user roles
            axios.get('https://localhost:7240/admin/users-with-roles', axiosConfig)
              .then((res) => res.data)
              .then((userRoles) => {
                // Combine user information and roles
                const combinedData = userInformation.map((user) => {
                  const userRole = userRoles.find((role) => role.username === user.userName); // Use username to match
                  if (userRole) {
                    return { ...user, role: userRole.roles.join(', ') }; // Join roles into a single string
                  }
                  return { ...user, role: 'No Role' };
                });
                console.log("Combined Data:", combinedData);
                setUsers(combinedData);
              })
              .catch((err) => {
                console.log("Error fetching user roles:", err);
              });
          })
          .catch((err) => {
            console.log("Error fetching user information:", err);
          });
      }, []);
      

    return (
        <div id="AdminPanel">
            <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
              <EditButton userName={user.userName} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    );
}

