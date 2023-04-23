export interface FormValues {
    id: number;
    name: string;
    age: number;
    bornDate: string;
    biography?: string;
}

export interface TableData extends FormValues {
    id: number;
}

export interface AddEditRowProps {
    title: string;
    open: boolean;
    icon: string;
    iconColor: string,
    confirmText: string;
    cancelText: string;
    onConfirm: (data: FormValues) => void;
    onCancel: () => void;
    newID: number;
    dataToEdit: FormValues;
}

export interface ConfirmationProps {
    title: string;
    message: string;
    open: boolean;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
}