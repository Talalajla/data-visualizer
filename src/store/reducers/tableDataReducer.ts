import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TableData } from "../../types/types";

interface TableDataState {
    data: TableData[];
}

const initialState: TableDataState = {
    data: []
};

const tableDataSlice = createSlice({
    name: 'tableData',
    initialState,
    reducers: {
        addData(state, action: PayloadAction<TableData>) {
            state.data.push(action.payload);
        },
        removeData(state, action: PayloadAction<number>) {
            state.data = state.data.filter((data) => data.id !== action.payload);
        },
        updateData(state, action: PayloadAction<TableData>) {
            const index = state.data.findIndex(data => data.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        setTableDataStore(state, action: PayloadAction<TableData[]>) {
            state.data = action.payload;
        }
    }
});

export const { addData, removeData, setTableDataStore, updateData } = tableDataSlice.actions;
export default tableDataSlice.reducer;