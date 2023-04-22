import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Icon, InputLabel, OutlinedInput, TextField } from '@mui/material';
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { theme } from '../../theme/theme';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


interface AddRowProps {
    open: boolean;
    title: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
}

interface FormValues {
    name: string;
    age: number;
    bornDate: string;
    biography?: string;
}

const schema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required().integer().min(0).max(150),
    bornDate: yup.string().required(),
    biography: yup.string().max(250)
});

export const AddRow = (props: AddRowProps) => {
    const { open, title, confirmText, cancelText, onConfirm, onCancel } = props;
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number | undefined>(undefined);
    const [bornDate, setBornDate] = useState<string | undefined>(undefined);
    const [bio, setBio] = useState<string | undefined>(undefined);
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        age: 0,
        bornDate: '',
        biography: '',
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const handleConfirm = () => {
        onConfirm();
    }

    const handleCancel = () => {
        onCancel();
        // Reset data to default values
        setName('');
        setAge(undefined);
        setBornDate(undefined);
        setBio(undefined);
    } 
    
    const handleNameChange = (e: React.FormEvent<HTMLDivElement>) => {
        setName((e.target as HTMLInputElement).value);
    }
    const handleAgeChange = (e: React.ChangeEvent<HTMLDivElement>) => {
        const ageAsNumber = parseInt((e.target as HTMLInputElement).value);
        if (isNaN(ageAsNumber)) return;
        setAge(ageAsNumber);
    }
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBornDate(e.target.value);
    }
    const handleBioChange = (e: React.FormEvent<HTMLDivElement>) => {
        setBio((e.target as HTMLInputElement).value);
    }

    return (
        <Dialog open={open} onClose={handleCancel} sx={{
            '>*': {
                textAlign: 'center'
            }
        }}>
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                paddingTop: '40px'
            }}>
                <Icon sx={{ width: 75, height: 75 }}>
                    <AddCircleOutline sx={{width: '100%', height: '100%', color: 'buttons.green'}} />
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
                            <FormControl fullWidth>
                                <InputLabel htmlFor='input-name'>Name</InputLabel>
                                <OutlinedInput 
                                    id='input-name' 
                                    label='Name'
                                    value={name}
                                    onInput={handleNameChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='input-age'>Age</InputLabel>
                                <OutlinedInput 
                                    id='input-age'
                                    label='Age'
                                    value={age ?? ''}
                                    onInput={handleAgeChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField 
                                    type='date'
                                    value={bornDate ?? ''}
                                    onChange={handleDateChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField 
                                    multiline 
                                    rows={3} 
                                    inputProps={{ maxLength: 250 }}
                                    variant='outlined' 
                                    id='input-biography' 
                                    label='Biography (optional)'
                                    value={bio ?? ''}
                                    onInput={handleBioChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Box>
            <DialogActions sx={{justifyContent: 'center', paddingBottom: '40px'}}>
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
                    onClick={handleConfirm} 
                    color='success'
                    sx={{
                        backgroundColor: 'buttons.green',
                        ':hover': {
                            backgroundColor: 'buttons.greenHover'
                        }
                    }} 
                    variant='contained'
                >{confirmText}</Button>
            </DialogActions>
        </Dialog>
    );
}