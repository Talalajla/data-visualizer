import React, { FC } from "react";
import { useSelector } from 'react-redux';
import { Grid } from "@mui/material";
import DataCard from "./DataCard";

interface RootState {
    data: any[];
}



const DataGrid: FC = () => {
    const tableData = useSelector((state: RootState) => state.data);
    console.log(tableData);
    return (
        <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, md: 8, lg: 12 }} sx={{ padding: '30px 0' }}>
            {tableData.map(item => {
                return (
                    <Grid item xs={4} md={4} lg={3}>
                        <DataCard key={item.id} {...item} />
                    </Grid>
                )
            })}
        </Grid>
    );
}

export default DataGrid;