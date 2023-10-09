import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Face2Icon from '@mui/icons-material/Face2';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PublishIcon from '@mui/icons-material/Publish';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import {useEffect, useState} from "react";
import axios from "axios";

export default function ViewProfileDialog(props) {
    const [user, setUser] = useState(null);

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
        }
        )
    }, [props.userName]);

    const role = "instructor";
    const courseCount = 10;
    const enrollmentCount = 5;

    const open = props.open;
    const onClose = props.onClose;

    return (
        <div>
            <Dialog onClose={() => {
                onClose()
            }} open={open}>
                <DialogTitle>About User</DialogTitle>
                <List sx={{pt: 0}}>
                    <ListItem disableGutters>
                        <ListItemButton sx={{height: "50px"}}>
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: 'rgb(226, 94, 62)'}}>
                                    <Face2Icon/>
                                </Avatar>
                            </ListItemAvatar>
                            {user && <ListItemText primary={user.firstName} secondary="Name"/>}
                        </ListItemButton>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemButton sx={{height: "50px"}}>
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: 'rgb(226, 94, 62)'}}>
                                    <ContactMailIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            {user && <ListItemText primary={user.email} secondary="E-Mail"/>}
                        </ListItemButton>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemButton sx={{height: "50px"}}>
                            {(role === "instructor") && (
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: 'rgb(226, 94, 62)'}}>
                                        <PublishIcon/>
                                    </Avatar>
                                </ListItemAvatar>)}
                            {(role === "instructor") && (
                                <ListItemText primary={courseCount} secondary="Courses Published"/>)}

                            {(role === "student") && (
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: 'rgb(226, 94, 62)'}}>
                                        <SubscriptionsIcon/>
                                    </Avatar>
                                </ListItemAvatar>)}
                            {(role === "student") && (
                                <ListItemText primary={enrollmentCount} secondary="Courses Enrolled"/>)}
                        </ListItemButton>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}