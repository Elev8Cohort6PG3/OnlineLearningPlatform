import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {useEffect, useState} from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: "rgb(255, 155, 80)",
    },
}));

export default function LinearProgressBar(props) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(props.value);
    }, []);
    return (
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
            <BorderLinearProgress variant="determinate" value={value} />
        </Box>
    );
}