import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    return (
        <AppBar>
            <Container>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant='h6'>
                        data-visualizer
                    </Typography>
                    <Box>
                        <Button component={NavLink} to='/main' color='inherit'>Main</Button>
                        <Button component={NavLink} to='/view' color='inherit'>View</Button>
                        <Button component={NavLink} to='/test' color='inherit'>test</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;