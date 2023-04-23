import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, TextField, Typography } from '@mui/material';
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CreateIcon from '@mui/icons-material/Create';
import { theme } from '../../theme/theme';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled';
import { FormValues, AddEditRowProps } from '../../types/types';
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
    name: yup
        .string()
        .required('To pole jest wymagane!')
        .min(2, 'Imię powinno zawierać co najmniej 2 znaki'),
    age: yup
        .number()
        .typeError('Wiek zawiera niedozwolone znaki!')
        .required('To pole jest wymagane!')
        .integer('To pole musi być liczbą całkowitą!')
        .min(1, 'Wiek musi być większy od 0!')
        .max(150, 'Wiek nie moze być większy niż 150!'),
    bornDate: yup.string().required('To pole jest wymagane!'),
    biography: yup.string().max(250, 'Biografia nie może być dłuższa niż 250 znaków!')
});

const StyledTextField = styled(TextField)({
    'label': {
        transform: 'translate(14px, -9px) scale(.75)',
        maxWidth: 'calc(133% - 32px)',
    },
    'legend': {
        maxWidth: '100%',
    }
})

export const AddEditTemplate = (props: AddEditRowProps) => {
    const { open, title, confirmText, cancelText, onConfirm, onCancel, newID, icon, iconColor, dataToEdit } = props;
    const [formValues, setFormValues] = useState<FormValues>({
        id: 0,
        name: '',
        age: 0,
        bornDate: '',
        biography: '',
    });

    const { t } = useTranslation();

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        setFormValues(dataToEdit);
        setValue('name', dataToEdit.name);
        setValue('age', dataToEdit.age);
        setValue('bornDate', dataToEdit.bornDate);
        setValue('biography', dataToEdit.biography);
    }, [dataToEdit, setValue]);


    const onSubmit = (data: FormValues) => {
        if (icon === 'add') data.id = newID;
        else if (icon === 'edit') data.id = dataToEdit.id;
        onConfirm(data);
        reset(); // Reset form
        clearData(); // Reset formValues
    }

    const handleCancel = () => {
        onCancel();
        reset(); // Reset form
        clearData(); // Reset formValues
    }

    const clearData = () => {
        setFormValues({
            id: 0,
            name: '',
            age: 0,
            bornDate: '',
            biography: ''
        });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value === 'age' ? parseInt(value) : value,
        })
    }

    return (
        <Dialog open={open} onClose={handleCancel} sx={{
            '>*': {
                textAlign: 'center'
            }
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '40px'
                }}>
                    <Icon sx={{ width: 75, height: 75 }}>
                        {icon === 'add' && <AddCircleOutline sx={{ width: '100%', height: '100%', color: `buttons.${iconColor}` }} />}
                        {icon === 'edit' && <CreateIcon sx={{ width: '100%', height: '100%', color: `buttons.${iconColor}` }} />}
                    </Icon>
                </Box>
                <DialogTitle sx={{
                    fontWeight: 600,
                    fontSize: 26,
                    padding: '0 24px',
                }}>{title}</DialogTitle>
                <Box sx={{
                    paddingTop: 0,
                    paddingBottom: 0,
                }}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label={t('table.modal.name')}
                                    {...register('name')}
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                />
                                {errors.name && (
                                    <Typography color='error' variant='body2'>
                                        {errors.name?.message}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label={t('table.modal.age')}
                                    {...register('age')}
                                    value={formValues.age}
                                    onChange={handleInputChange}
                                />
                                {errors.age && (
                                    <Typography color='error' variant='body2'>
                                        {errors.age?.message}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTextField
                                    fullWidth
                                    type='date'
                                    label={t('table.modal.born')}
                                    {...register('bornDate')}
                                    value={formValues.bornDate}
                                    onChange={handleInputChange}
                                    className='dv-bornDateLabelFix'
                                />
                                {errors.bornDate && (
                                    <Typography color='error' variant='body2'>
                                        {errors.bornDate?.message}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    inputProps={{ maxLength: 250 }}
                                    label={t('table.modal.biography')}
                                    value={formValues.biography}
                                    {...register('biography')}
                                    onChange={handleInputChange}
                                />
                                {errors.biography && (
                                    <Typography color='error' variant='body2'>
                                        {errors.biography?.message}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Box>
                <DialogActions sx={{ justifyContent: 'center', paddingBottom: '40px' }}>
                    <Box onClick={handleCancel} sx={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        ':hover': {
                            color: theme.palette.text.primary
                        }
                    }}>
                        {cancelText}
                    </Box>
                    <Button
                        type='submit'
                        color='success'
                        sx={{
                            backgroundColor: `buttons.${iconColor}`,
                            ':hover': {
                                backgroundColor: `buttons.${iconColor}Hover`
                            }
                        }}
                        variant='contained'
                    >{confirmText}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}