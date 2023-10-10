import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect} from "react";
import axios from "axios";
import UserCredentials from "../authentication/UserCredentials";

export default function EditUserProfile(props) {
    const {editDialogOpen, setEditDialogOpen} = props;
    const [user, setUser] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");


    useEffect(() => {
        axios.get(`https://localhost:7240/users/${props.userName}`, {}).then((response) => {

                if (response.data.firstName === null || response.data.firstName === undefined || response.data.firstName === "") {
                    response.data.firstName = "Not Provided";
                } if (response.data.lastName === null || response.data.lastName === undefined || response.data.lastName === "") {
                    response.data.lastName = "Not Provided";
                } if (response.data.email === null || response.data.email === undefined || response.data.email === "") {
                    response.data.email = "Not Provided";
                }
                console.log(response.data);
                setUser(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }
        )
    }, [editDialogOpen]);


    const handleSubmit = (event) => {
        event.preventDefault();

        let postData = {
            firstname: firstName,
            lastName: lastName,
            email: email,
        };

        let axiosConfig = {
            headers: {
                'Authorization': `bearer ${UserCredentials().token}`,
            }
        };

        axios.put('https://localhost:7240/users', postData, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
        setEditDialogOpen(false);
        window.location.reload();
    };

    const handleClickOpen = () => {
        setEditDialogOpen(true);
    };

    const handleClose = () => {
        setEditDialogOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" style={{color: "white"}} onClick={handleClickOpen}>
                Edit Profile
            </Button>
            <Dialog open={editDialogOpen} onClose={handleClose}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="name"
                        fullWidth
                        variant="standard"
                        value={firstName}
                        onChange={(e)=>{setFirstName(e.target.value)}}
                    />
                    <TextField
                        margin="dense"
                        id="lastName"
                        label="Last Name"
                        type="name"
                        fullWidth
                        variant="standard"
                        value={lastName}
                        onChange={(e)=>{setLastName(e.target.value)}}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(e)=>{handleSubmit(e)}}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}