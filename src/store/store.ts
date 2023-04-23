import { configureStore } from "@reduxjs/toolkit";
import tableDataReducer from "./reducers/tableDataReducer";

const store = configureStore({
    reducer: tableDataReducer
});

export default store;