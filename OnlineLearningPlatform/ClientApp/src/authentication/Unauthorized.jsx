import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Unauthorized(props) {
    let requiredRole = props.requiredRole;
    return (
        <div style={{
            background: 'linear-gradient(90deg, rgb(226, 94, 62) 0%, rgb(255, 155, 80) 53%, rgb(255, 187, 92) 100%)',
            backgroundBlendMode: 'multiply'
        }}>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                        backgroundColor: 'rgba(0,0,0,0)'
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Unauthorized!
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            You don't have the permission to visit this page!
                            You need to be a <p>{requiredRole}</p>
                        </Typography>
                    </Container>
                </Box>
            </main>
        </div>
    );
}