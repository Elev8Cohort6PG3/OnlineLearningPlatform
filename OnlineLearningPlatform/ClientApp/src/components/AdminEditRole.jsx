import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';

import UserCredentials from "../authentication/UserCredentials";

const EditRolesButton = (props) => {
  const { userName } = props;
  const [editRolesDialogOpen, setEditRolesDialogOpen] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const hardcodedRoles = ['Admin', 'Member', 'Lecturer']; // Define your hardcoded roles here

  useEffect(() => {
    if (editRolesDialogOpen) {
      // You can fetch user roles for the current user here if needed
      // ...
      // For this example, we're not fetching user roles as you requested hardcoded roles.
    }
  }, [editRolesDialogOpen, userName]);

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setSelectedRoles([value]);
  };

  const handleSubmit = () => {
    // Submit the updated roles to the backend
    const rolesString = selectedRoles.join(',');
    const url = `https://localhost:7240/admin/edit-roles/${userName}?roles=${rolesString}`;

    const axiosConfig = {
      headers: {
        'Authorization': `bearer ${UserCredentials().token}`,
      }
    };

    axios.put(url, null, axiosConfig)
      .then((res) => {
        console.log("Roles Updated: ", res);
      })
      .catch((err) => {
        console.error("Error updating roles: ", err);
      });

    setEditRolesDialogOpen(false);
  };

  const handleClickOpen = () => {
    setEditRolesDialogOpen(true);
  };

  const handleClose = () => {
    setEditRolesDialogOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" style={{ color: "white" }} onClick={handleClickOpen}>
        Edit Roles
      </Button>
      <Dialog open={editRolesDialogOpen} onClose={handleClose}>
        <DialogTitle>Edit Roles for {userName}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="roles"
            label="Roles"
            select
            fullWidth
            variant="standard"
            value={selectedRoles}
            onChange={handleRoleChange}
          >
            {hardcodedRoles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditRolesButton;
