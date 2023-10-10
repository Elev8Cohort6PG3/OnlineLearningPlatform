import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import UserCredentials from "../authentication/UserCredentials";

const EditButton = (props) => {
  const { userName } = props;
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [user, setUser] = useState('');
  const [displayedUserName, setDisplayedUserName] = useState(''); // New state for displayed username
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editDialogOpen) {
      axios.get(`https://localhost:7240/users/${userName}`, {}).then((response) => {
        if (response.data.firstName === null || response.data.firstName === undefined || response.data.firstName === "") {
          response.data.firstName = "Not Provided";
        }
        if (response.data.lastName === null || response.data.lastName === undefined || response.data.lastName === "") {
          response.data.lastName = "Not Provided";
        }
        if (response.data.email === null || response.data.email === undefined || response.data.email === "") {
          response.data.email = "Not Provided";
        }
        setUser(response.data);
        setDisplayedUserName(response.data.userName); // Update displayed username
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      });
    }
  }, [editDialogOpen, userName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      userName: displayedUserName, // Use displayedUserName, not userName
      firstname: firstName,
      lastName: lastName,
      email: email,
    };

    const axiosConfig = {
      headers: {
        'Authorization': `bearer ${UserCredentials().token}`,
      }
    };

    axios.put(`https://localhost:7240/users/${userName}`, postData, axiosConfig)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });

    setEditDialogOpen(false);
  };

  const handleClickOpen = () => {
    setEditDialogOpen(true);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" style={{ color: "white" }} onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={editDialogOpen} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="username"
            label="Username"
            type="name"
            fullWidth
            variant="standard"
            value={displayedUserName} // Use displayedUserName here
            onChange={(e) => { setDisplayedUserName(e.target.value) }} // Update displayedUserName
          />
          <TextField
            margin="dense"
            id="firstName"
            label="First Name"
            type="name"
            fullWidth
            variant="standard"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value) }}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="name"
            fullWidth
            variant="standard"
            value={lastName}
            onChange={(e) => { setLastName(e.target.value) }}
          />
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => { handleSubmit(e) }}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditButton;
