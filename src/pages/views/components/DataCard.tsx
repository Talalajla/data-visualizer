import { Paper } from "@mui/material";
import '../styles/dist/main.css';
import { TableData } from "../../../types/types";

const DataCard = (props: TableData) => {
    const { id, biography, bornDate, name, age } = props;

    return (
        <Paper sx={{ height: '100%', backgroundColor: '#00000011', borderRadius: '15px' }}>
            <div className="idContainer">#{id}</div>
            <div className="nameContainer">{name} {age}</div>
            <div className="bornDateContainer">{bornDate}</div>
            <div className="bioContainer">
                {biography}
            </div>
        </Paper>
    );
}

export default DataCard;