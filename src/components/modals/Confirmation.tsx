import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton } from '@mui/material';
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { theme } from '../../theme/theme';

interface ConfirmationProps {
    title: string;
    message: string;
    open: boolean;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const Confirmation = (props: ConfirmationProps) => {
    const { open, title, message, confirmText, cancelText, onConfirm, onCancel } = props;

    const handleConfirm = () => {
        onConfirm();
    }

    const handleCancel = () => {
        onCancel();

        // console.log(
        //     `Name: ${name}\n`,
        //     `age: ${age}\n`,
        //     `bornDate: ${bornDate}\n`,
        //     `bio: ${bio}\n`
        // )
    }

    return (
        <Dialog open={open} onClose={handleCancel} sx={{
            '>*': {
                textAlign: 'center'
            }
        }}>
            <DialogContent sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                paddingTop: '40px'
            }}>
                <Icon sx={{ width: 75, height: 75 }}>
                    <ErrorOutline sx={{width: '100%', height: '100%', color: 'buttons.red'}} />
                </Icon>
            </DialogContent>
            <DialogTitle sx={{
                fontWeight: 600,
                fontSize: 26,
                padding: '0 24px',
            }}>{title}</DialogTitle>
            <DialogContent sx={{
                paddingTop: 0,
                paddingBottom: 0,
            }}>
                <DialogContent>{message}</DialogContent>
            </DialogContent>
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
                <Button onClick={handleConfirm} color='error' variant='contained'>{confirmText}</Button>
            </DialogActions>
        </Dialog>
    );
}