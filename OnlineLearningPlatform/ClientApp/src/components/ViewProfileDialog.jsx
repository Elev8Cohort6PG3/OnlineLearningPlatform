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

export default function ViewProfileDialog(props) {
    const username = props.username;
    const role = "instructor";
    const name = "Michael";
    const surname = "Jordan";
    const nameSurname = name + " " + surname;
    const email = "Michael.Jordan12@gmail.com";
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
                    <ListItem disableGutters key={name}>
                        <ListItemButton sx={{height: "50px"}}>
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: 'rgb(226, 94, 62)'}}>
                                    <Face2Icon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={nameSurname} secondary="Name"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disableGutters key={email}>
                        <ListItemButton sx={{height: "50px"}}>
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: 'rgb(226, 94, 62)'}}>
                                    <ContactMailIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email} secondary="E-Mail"/>
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