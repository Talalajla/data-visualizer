import { AddEditRowProps } from '../../types/types';
import { AddEditTemplate } from './AddEditTemplate';


export const AddRow = (props: AddEditRowProps) => {

    return (
        <AddEditTemplate {...props} />
    );
}