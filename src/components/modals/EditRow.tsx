import { AddEditRowProps } from '../../types/types';
import { AddEditTemplate } from './AddEditTemplate';


export const EditRow = (props: AddEditRowProps) => {

    return (
        <AddEditTemplate {...props} />
    );
}