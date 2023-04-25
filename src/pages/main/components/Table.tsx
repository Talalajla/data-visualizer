import { Edit, Delete } from '@mui/icons-material';
import { Box, Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, IconButton } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { Confirmation } from '../../../components/modals/Confirmation';
import { AddRow } from '../../../components/modals/AddRow';
import "./tableStyles/dist/main.css";
import { TableData } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { addData, removeData, setTableDataStore, updateData } from '../../../store/reducers/tableDataReducer';
import { initialTableData } from './initialData';
import { EditRow } from '../../../components/modals/EditRow';
import { useTranslation } from "react-i18next";

const DataTable = () => {
    const [tableData, setTableData] = useState<TableData[]>(initialTableData);
    const [idCounter, setIdCounter] = useState<number>(tableData.length);
    const [currentRows, setCurrentRows] = useState<TableData[] | null>(null)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [emptyRows, setEmptyRows] = useState<number>(0);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [rowToDelete, setRowToDelete] = useState<number | null>(null);
    const [dataToEdit, setDataToEdit] = useState<TableData>({
        id: 0,
        name: '',
        age: 0,
        bornDate: '',
        biography: '',
    });

    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState<boolean>(false);
    const [isConfirmDeleteMultiModalOpen, setIsConfirmDeleteMultiModalOpen] = useState<boolean>(false);
    const [isAddRowModalOpen, setIsAddRowModalOpen] = useState<boolean>(false);
    const [isEditRowModalOpen, setIsEditRowModalOpen] = useState<boolean>(false);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    useEffect(() => {
        // Show rows of data and update them when user changes something.
        const rowsToShow = tableData.slice(
            currentPage * rowsPerPage,
            currentPage * rowsPerPage + rowsPerPage
        );

        // Add empty rows only if all data can't fit in first table page.
        if (!(currentPage === 0 && tableData.length <= rowsPerPage)) {
            const emptyRows = countEmptyRows(rowsPerPage, tableData.length, currentPage + 1);
            setEmptyRows(emptyRows);
        }
        setCurrentRows(rowsToShow);
    }, [tableData, rowsPerPage, currentPage]);

    const handleChangeRowsPerPage = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const updatedRowsPerPage = parseInt(e.target.value, 10);
            setRowsPerPage(updatedRowsPerPage);
            setCurrentPage(0);
            setEmptyRows(0);
            const rowsToShow = tableData.slice(0, updatedRowsPerPage);
            setCurrentRows(rowsToShow);
        }, [tableData]
    );

    const handleChangePage = (e: unknown, newPage: number) => setCurrentPage(newPage);

    const countEmptyRows = (rows: number, tableLength: number, page: number): number => {
        if (rows * page > tableLength) {
            const emptyRowsAmount = rows * page - tableLength;
            return emptyRowsAmount;
        }
        else {
            return 0;
        }
    }

    const updateRowsOnDelete = (updatedData: TableData[]) => {
        const updatedTotalPages = Math.ceil(updatedData.length / rowsPerPage);

        // Return to first possible page instead of running out of scope.
        if (updatedTotalPages <= currentPage && updatedTotalPages !== 0) {
            setCurrentPage(updatedTotalPages - 1);
        } else if (updatedTotalPages === 0) {
            setCurrentPage(0);
        }
    }

    const showConfirmationDeleteModal = (id: number | null) => {
        if (id !== null) {
            setRowToDelete(id);
            setIsConfirmDeleteModalOpen(true);
        }
    }
    const showConfirmationMassDeleteModal = () => setIsConfirmDeleteMultiModalOpen(true);

    const showAddRowModal = () => setIsAddRowModalOpen(true);

    const showEditRowModal = (data: TableData) => {
        setDataToEdit(data);
        setIsEditRowModalOpen(true);
    };

    const handleSingleRowDelete = (id: number | null) => {
        if (id !== null) {
            const newTableData = tableData.filter((row) => row.id !== id);
            
            // Remove the item from the selected array of items to be deleted when the single delete button is used.
            if (selectedRows.includes(id)) {
                const newSelected = selectedRows.filter(selectedID => selectedID !== id);
                setSelectedRows(newSelected);
            }

            dispatch(removeData(id)); // Remove single row from store.

            setIsConfirmDeleteModalOpen(false);
            setRowToDelete(null);
            setTableData(newTableData);
            updateRowsOnDelete(newTableData);
        }
    }

    const handleMassRowDelete = () => {
        if (selectedRows.length === 0) return;
        let newTableData = tableData.filter(row => !selectedRows.includes(row.id));

        dispatch(setTableDataStore(newTableData)); // Remove selected rows from store.

        setIsConfirmDeleteMultiModalOpen(false);
        setSelectedRows([]); // Clean array of items to be deleted.
        setTableData(newTableData);
        updateRowsOnDelete(newTableData);
    }

    const handleCheckboxClick = (e: React.MouseEvent<unknown>, selectedId: number) => {
        // Select clicked row for mass removal.
        let newSelected = [];
        if (selectedRows.includes(selectedId)) {
            newSelected = selectedRows.filter(id => id !== selectedId);
        } else {
            newSelected = [...selectedRows, selectedId];
        }
        setSelectedRows(newSelected);
    }
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Select all available rows for mass removal.
        if (e.target.checked) {
            const selectedArr: number[] = [];
            tableData.forEach(row => selectedArr.push(row.id));
            setSelectedRows(selectedArr);
        }
        else {
            setSelectedRows([]);
        }
    }

    const addNewRow = (data: TableData) => {
        setTableData([...tableData, data]); // Add new row to data state.
        
        dispatch(addData(data)); // Add new row to store.

        setEmptyRows(0);
        setIdCounter(idCounter + 1);
        setIsAddRowModalOpen(false);
    }

    const editRow = (data: TableData) => {
        const updatedData = tableData.map((row) => row.id === data.id ? data : row);
        setTableData(updatedData);

        dispatch(updateData(data)); // Replace edited row in store.
        setIsEditRowModalOpen(false);
    }

    const resetEditRowData = () => {
        setDataToEdit({
            id: 0,
            name: '',
            age: 0,
            bornDate: '',
            biography: '',
        });
        setIsEditRowModalOpen(false);
    }

    return (
        <>
            <Box sx={{ padding: '30px 0' }}>
                <Confirmation
                    open={isConfirmDeleteModalOpen}
                    title={t('table.modal.delete.single.title')}
                    message={t('table.modal.delete.single.message')}
                    confirmText={t('table.modal.delete.single.button.submit')}
                    cancelText={t('table.modal.delete.button.cancel')}
                    onCancel={() => setIsConfirmDeleteModalOpen(false)}
                    onConfirm={() => handleSingleRowDelete(rowToDelete)}
                />
                <Confirmation
                    open={isConfirmDeleteMultiModalOpen}
                    title={t('table.modal.delete.multi.title')}
                    message={t('table.modal.delete.multi.message')}
                    confirmText={t('table.modal.delete.multi.button.submit')}
                    cancelText={t('table.modal.delete.button.cancel')}
                    onCancel={() => setIsConfirmDeleteMultiModalOpen(false)}
                    onConfirm={handleMassRowDelete}
                />
                <AddRow
                    open={isAddRowModalOpen}
                    title={t('table.modal.add.title')}
                    confirmText={t('table.modal.add.button.submit')}
                    cancelText={t('table.modal.add.button.cancel')}
                    icon='add'
                    iconColor='green'
                    onCancel={() => setIsAddRowModalOpen(false)}
                    onConfirm={(data) => addNewRow(data)}
                    newID={idCounter + 1}
                    dataToEdit={dataToEdit}
                />
                <EditRow
                    open={isEditRowModalOpen}
                    title={t('table.modal.edit.title')}
                    confirmText={t('table.modal.edit.button.submit')}
                    cancelText={t('table.modal.edit.button.cancel')}
                    icon='edit'
                    iconColor='blue'
                    onCancel={resetEditRowData}
                    onConfirm={(data) => editRow(data)}
                    newID={idCounter + 1}
                    dataToEdit={dataToEdit}
                />
                <Paper>
                    <TableContainer>
                        <Table className='dv-table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding='checkbox'>
                                        <Tooltip title={t('table.checkbox.tooltip')} arrow>
                                            <Checkbox onChange={handleSelectAll} checked={tableData.length > 0 && selectedRows.length === tableData.length} />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>{t('table.head.name')}</TableCell>
                                    <TableCell>{t('table.head.age')}</TableCell>
                                    <TableCell>{t('table.head.born')}</TableCell>
                                    <TableCell>{t('table.head.biography')}</TableCell>
                                    <TableCell align='right'>{t('table.head.actions')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentRows && currentRows.length > 0
                                    ?
                                    currentRows.map((row, index) => {
                                        const isSelected = selectedRows.includes(row.id);
                                        return (
                                            <TableRow key={index} className='dv-tableRow'>
                                                <TableCell padding='checkbox'>
                                                    <Checkbox onClick={(e) => handleCheckboxClick(e, row.id)} checked={isSelected} />
                                                </TableCell>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.age}</TableCell>
                                                <TableCell>{row.bornDate}</TableCell>
                                                <TableCell>
                                                    {row.biography && row.biography.length > 60
                                                        ?
                                                        <Tooltip title={row.biography} arrow>
                                                            <Box sx={{
                                                                overflow: 'hidden',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: '2',
                                                                lineClamp: '2',
                                                                WebkitBoxOrient: 'vertical'
                                                            }}>{row.biography}</Box>
                                                        </Tooltip>
                                                        : row.biography
                                                    }
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <Box display='flex' gap={1} justifyContent='right'>
                                                        <IconButton
                                                            className='editButton'
                                                            onClick={() => showEditRowModal(row)}
                                                        >
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton
                                                            className='deleteButton'
                                                            onClick={() => showConfirmationDeleteModal(row.id)}
                                                        >
                                                            <Delete />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                    :
                                    <TableRow>
                                        <TableCell padding='checkbox'>
                                            <Checkbox disabled />
                                        </TableCell>
                                        <TableCell sx={{ width: '100px' }} >-</TableCell>
                                        <TableCell sx={{ width: '75px' }}>-</TableCell>
                                        <TableCell sx={{ width: '125px' }}>-</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell sx={{ width: '210px' }}>
                                            <Box display='flex' gap={1} justifyContent='right'>
                                                <IconButton disabled>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton disabled>
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                }
                                {
                                    emptyRows > 0 &&
                                    <TableRow
                                        sx={{
                                            height: Math.round(72.7 * emptyRows)
                                        }}
                                    >

                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={tableData.length}
                        page={currentPage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        onPageChange={handleChangePage}
                        labelRowsPerPage={t('table.pagination.label')}
                    />
                </Paper>
                <Box marginTop={3} sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    '@media(max-width: 500px)': {
                        flexWrap: 'wrap',
                        'button': {
                            width: '100%',
                        }
                    }
                }}>
                    <Button
                        variant='contained'
                        disabled={selectedRows.length > 0 ? false : true}
                        onClick={showConfirmationMassDeleteModal}
                        sx={{
                            backgroundColor: 'buttons.red',
                            '&:hover': {
                                backgroundColor: 'buttons.redHover',
                            }
                        }}
                    >{t('table.button.delete')}</Button>
                    <Button
                        variant='contained'
                        onClick={showAddRowModal}
                        sx={{
                            backgroundColor: 'buttons.green',
                            '&:hover': {
                                backgroundColor: 'buttons.greenHover',
                            }
                        }}
                    >{t('table.button.add')}</Button>
                </Box>
            </Box>
        </>
    );
};

export default DataTable;