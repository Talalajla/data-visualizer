import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const Error404 = () => {

    const { t } = useTranslation();

    return (
        <Box sx={{
            paddingTop: '100px', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <img src='/imgs/error_404.svg' alt="error 404 img" width='300' />
            <Typography variant='h5' align='center' marginTop={5} marginBottom={5}>{t('errors.404.message')}</Typography>
            <Button variant='contained'>
                <Link to='/main' style={{color: '#fff', textDecoration: 'none'}}>{t('errors.404.button')}</Link>
            </Button>
        </Box>
    );
};

export default Error404;