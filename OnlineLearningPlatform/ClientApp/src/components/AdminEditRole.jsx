import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';

import UserCredentials from "../authentication/UserCredentials";

const EditRolesButton = (props) => {
  const { userName } = props;
  const [editRolesDialogOpen, setEditRolesDialogOpen] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const hardcodedRoles = ['Admin', 'Member', 'Lecturer']; //hardcoded roles

  useEffect(() => {
    if (editRolesDialogOpen) {
      setSelectedRoles(userRoles.map((role) => role.role) || []);
    }
  }, [editRolesDialogOpen, userName, userRoles]);

  const handleRoleToggle = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
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
          {hardcodedRoles.map((role) => (
            <FormControlLabel
              key={role}
              control={
                <Checkbox
                  checked={selectedRoles.includes(role)}
                  onChange={() => handleRoleToggle(role)}
                  name={role}
                  color="primary"
                />
              }
              label={role}
            />
          ))}
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
