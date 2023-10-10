import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InfoSnackbar from "./InfoSnackbar";
import UserCredentials from "../authentication/UserCredentials";
import {useEffect, useState} from "react";


const ITEM_HEIGHT = 48;

export default function AccountDropdownMenu() {
    const [options, setOptions] = useState([
        'Profile',
        'Logout',
    ]);

    let role = UserCredentials().role;

    useEffect(() => {
        if (role === "Member") {
        } else if (role === "Lecturer") {
            setOptions([
                    'Dashboard',
                    'Publish',
                    'Logout',
                ]
            );
        }
    }, []);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [logoutPopupOpen, setLogoutPopupOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = (event) => {
        setAnchorEl(null);
        console.log(event.currentTarget.innerText);
        if (event.currentTarget.innerText === "Logout") {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("role");
            localStorage.removeItem("username");
            setLogoutPopupOpen(true);
            setTimeout(
                () => window.location.assign("/"),
                1000
            );
        } else if (event.currentTarget.innerText === "Profile") {
            window.location.assign("/profile")
        } else if (event.currentTarget.innerText === "Dashboard") {
            window.location.assign("/instructor-dashboard")
        } else if (event.currentTarget.innerText === "Publish") {
            window.location.assign("/add-course")
        }
    };

    return (
        <div>
            {logoutPopupOpen && <InfoSnackbar message="Logout Successfull!"/>}
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <ManageAccountsIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}