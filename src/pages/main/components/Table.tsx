import { Edit, Delete } from '@mui/icons-material';
import { Box, Button, Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, IconButton } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { Confirmation } from '../../../components/modals/Confirmation';
import { AddRow } from '../../../components/modals/AddRow';

interface Data {
    id: number;
    name: string;
    age: number;
    bornDate: string;
    biography: string;
}

function createData(
    id: number,
    name: string,
    age: number,
    bornDate: string,
    biography: string
): Data {
    return { id, name, age, bornDate, biography }
}

const tableRows = [
    createData(1, 'Anna', 24, '15.06.1999', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    createData(2, 'Bartek', 32, '27.03.1991', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.'),
    createData(3, 'Kasia', 18, '02.11.2005', 'Nulla eget eleifend libero.'),
    createData(4, 'Michał', 45, '23.07.1978', 'Fusce accumsan, justo et pulvinar tincidunt, lorem nisl.'),
    createData(5, 'Natalia', 29, '31.12.1994', 'Integer fringilla dui nec magna dignissim, a luctus velit dapibus. Integer fringilla dui nec magna dignissim, a luctus velit dapibus. Integer fringilla dui nec magna dignissim, a luctus velit dapibus. Integer fringilla dui nec magna dignissim, a luc.'),
    createData(6, 'Piotr', 27, '18.09.1996', 'Vestibulum eu lacus ac mi facilisis tristique.'),
    createData(7, 'Monika', 22, '07.05.1999', 'Donec vel eros malesuada, pulvinar velit vel, maximus justo.'),
    createData(8, 'Krzysztof', 37, '11.11.1986', 'Cras eu turpis vel enim fermentum bibendum.'),
    createData(9, 'Magda', 31, '25.02.1992', 'Morbi vitae diam in massa mattis aliquam.'),
    createData(10, 'Tomasz', 28, '09.12.1995', 'In hac habitasse platea dictumst.'),
    createData(11, 'Karolina', 26, '01.01.1997', 'Curabitur vel enim a dolor suscipit faucibus.'),
    createData(12, 'Kamil', 33, '16.08.1988', 'Quisque quis leo lobortis, pulvinar nisi vitae, convallis metus.'),
    createData(13, 'Ewa', 41, '30.04.1982', 'Vestibulum euismod, nibh sit amet fermentum dictum, quam nisi.'),
    createData(14, 'Mariusz', 49, '05.09.1974', 'Integer fringilla dui nec magna dignissim, a luctus velit dapibus.'),
    createData(15, 'Sylwia', 23, '14.02.1998', 'Vivamus blandit mauris sed velit dignissim, non mattis felis ultrices.'),
    createData(16, 'Jan', 36, '28.07.1985', 'Nam vulputate quam ac diam ullamcorper bibendum.')
];

const DataTable = () => {
    const [tableData, setTableData] = useState<Data[]>(tableRows);
    const [currentRows, setCurrentRows] = useState<Data[] | null>(null)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5); // potem zmień na 10
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [rowToDelete, setRowToDelete] = useState<number | null>(null);
    
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState<boolean>(false);
    const [isConfirmDeleteMultiModalOpen, setIsConfirmDeleteMultiModalOpen] = useState<boolean>(false);
    const [isAddRowModalOpen, setIsAddRowModalOpen] = useState<boolean>(false);


    useEffect(() => {
        const rowsToShow = tableRows.slice(0, 5);
        setCurrentRows(rowsToShow);
    }, []);

    const handleChangeRowsPerPage = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const updatedRowsPerPage = parseInt(e.target.value, 10);
            setRowsPerPage(updatedRowsPerPage);
            setCurrentPage(0);

            const rowsToShow = tableData.slice(0, updatedRowsPerPage);
            setCurrentRows(rowsToShow);
        }, [tableData]
    );

    const handleChangePage = useCallback(
        (e: unknown, newPage: number) => {
            setCurrentPage(newPage);
            const updatedTableRows = tableData.slice(
                newPage * rowsPerPage,
                newPage * rowsPerPage + rowsPerPage
            );
            setCurrentRows(updatedTableRows);
        },
        [rowsPerPage, tableData]
    );

    const updateRowsOnDelete = (updatedData: Data[]) => {
        const updatedTotalPages = Math.ceil(updatedData.length / rowsPerPage);

        let updatedTableRows;

        updatedTableRows = updatedData.slice(
            currentPage * rowsPerPage,
            currentPage * rowsPerPage + rowsPerPage
        );

        // Return to first possible page instead of running out of scope
        if (updatedTotalPages <= currentPage && updatedTotalPages !== 0) {
            setCurrentPage(updatedTotalPages - 1);
            updatedTableRows = updatedData.slice(
                (updatedTotalPages - 1) * rowsPerPage,
                (updatedTotalPages - 1) * rowsPerPage + rowsPerPage
            );
        } else if (updatedTotalPages === 0) {
            setCurrentPage(0);
        }

        setCurrentRows(updatedTableRows);
    }

    const showConfirmationDeleteModal = (id: number | null) =>  {
        if (id !== null) {
            setRowToDelete(id);
            setIsConfirmDeleteModalOpen(true);
        }
    }
    const showConfirmationMassDeleteModal = () => {
        setIsConfirmDeleteMultiModalOpen(true);
    }
    const showAddRowModal = () => {
        setIsAddRowModalOpen(true);
    }

    const handleSingleRowDelete = (id: number | null) => {
        if (id !== null) {
            const newTableData = tableData.filter((row) => row.id !== id);
            if (selectedRows.includes(id)) {
                const newSelected = selectedRows.filter(selectedID => selectedID !== id);
                setSelectedRows(newSelected);
            }
    
            setIsConfirmDeleteModalOpen(false);
            setRowToDelete(null);
            setTableData(newTableData);
            updateRowsOnDelete(newTableData);
        }
    }

    const handleMassRowDelete = () => {
        if (selectedRows.length === 0) return;
        let newTableData = tableData.filter(row => !selectedRows.includes(row.id));

        setIsConfirmDeleteMultiModalOpen(false);
        setSelectedRows([]);
        setTableData(newTableData);
        updateRowsOnDelete(newTableData);
    }

    const handleCheckboxClick = (e: React.MouseEvent<unknown>, selectedId: number) => {
        let newSelected = [];
        if (selectedRows.includes(selectedId)) {
            newSelected = selectedRows.filter(id => id !== selectedId);
        } else {
            newSelected = [...selectedRows, selectedId];
        }
        setSelectedRows(newSelected);
    }

    const handleAddRow = () => {
        console.log('here youre adding redux dispatch');
    }

    return (
        <>
            <Box>
                <Confirmation
                    open={isConfirmDeleteModalOpen}
                    title="Delete Item"
                    message="Are you sure you want to delete this item?"
                    confirmText='Yes, delete it!'
                    cancelText='No, cancel!'
                    onCancel={() => setIsConfirmDeleteModalOpen(false)}
                    onConfirm={() => handleSingleRowDelete(rowToDelete)}
                />
                <Confirmation 
                    open={isConfirmDeleteMultiModalOpen}
                    title='Delete selected rows?'
                    message='Are you sure you want to delete all selected rows?'
                    confirmText='Yes, delete them!'
                    cancelText='No, cancel!'
                    onCancel={() => setIsConfirmDeleteMultiModalOpen(false)}
                    onConfirm={handleMassRowDelete}
                />
                <AddRow
                    open={isAddRowModalOpen}
                    title='Add new row'
                    confirmText='Add row'
                    cancelText='Cancel'
                    onCancel={() => setIsAddRowModalOpen(false)}
                    onConfirm={handleAddRow}
                />
                <Paper>
                    <TableContainer>
                        <Table sx={{ maxWidth: '1200px' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding='checkbox'>
                                        <Tooltip title='Select all rows.' arrow>
                                            <Checkbox />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Born date</TableCell>
                                    <TableCell>Biography</TableCell>
                                    <TableCell align='right'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentRows && currentRows.length > 0
                                    ?
                                    currentRows.map((row, index) => {
                                        const isSelected = selectedRows.includes(row.id);
                                        return (
                                            <TableRow key={index}>
                                                <TableCell padding='checkbox'>
                                                    <Checkbox onClick={(e) => handleCheckboxClick(e, row.id)} checked={isSelected} />
                                                </TableCell>
                                                <TableCell sx={{ width: '100px' }} >{row.name}</TableCell>
                                                <TableCell sx={{ width: '75px' }}>{row.age}</TableCell>
                                                <TableCell sx={{ width: '125px' }}>{row.bornDate}</TableCell>
                                                <TableCell>

                                                    {row.biography.length > 100
                                                        ?
                                                        <Tooltip title={row.biography} arrow>
                                                            <div style={{
                                                                overflow: 'hidden',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: '2',
                                                                lineClamp: '2',
                                                                WebkitBoxOrient: 'vertical'
                                                            }}>{row.biography}</div>
                                                        </Tooltip>
                                                        : row.biography
                                                    }
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: '210px' }} align='right'>
                                                    <Box display='flex' gap={1} justifyContent='right'>
                                                        <IconButton sx={{
                                                            backgroundColor: 'buttons.blue',
                                                            color: '#fff',
                                                            borderRadius: '3px',
                                                            '&:hover': {
                                                                backgroundColor: 'buttons.blueHover',
                                                            }
                                                        }}>
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton onClick={() => showConfirmationDeleteModal(row.id)} sx={{
                                                            backgroundColor: 'buttons.red',
                                                            color: '#fff',
                                                            borderRadius: '3px',
                                                            '&:hover': {
                                                                backgroundColor: 'buttons.redHover',
                                                            }
                                                        }}>
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
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={tableData.length}
                        page={currentPage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        onPageChange={handleChangePage}
                    />
                </Paper>
                <Box marginTop={3} sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px'
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
                    >Delete selected</Button>
                    <Button 
                        variant='contained'
                        onClick={showAddRowModal} 
                        sx={{
                            backgroundColor: 'buttons.green',
                            '&:hover': {
                                backgroundColor: 'buttons.greenHover',
                            }
                        }}
                    >Add new</Button>
                </Box>
            </Box>
        </>
    );
};

export default DataTable;