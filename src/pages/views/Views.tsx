import { Typography } from '@mui/material';
import React from 'react';
import DataGrid from './components/DataGrid';
import { useTranslation } from 'react-i18next';

const Views = () => {

    const { t } = useTranslation();

    return (
        <>
            <Typography variant='h4' marginTop={2}>{t('views.people')}</Typography>
            <DataGrid />
        </>
    );
};

export default Views;