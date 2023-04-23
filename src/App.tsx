import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Views from './pages/views/Views';
import Error404 from './pages/errors/error404';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { useDispatch } from 'react-redux';
import { setTableDataStore } from './store/reducers/tableDataReducer';
import { initialTableData } from './pages/main/components/initialData';

interface MainSectionProps {
    children: React.ReactNode;
}

const MainSection = ({ children }: MainSectionProps) => (
    <Container sx={{ paddingTop: '80px' }}>
        <div style={{ padding: '0 24px' }}>
            {children}
        </div>
    </Container>
);

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTableDataStore(initialTableData));
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Navbar />
                <MainSection>
                    <Routes>
                        <Route path="/" element={<Navigate to='/main' replace />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/views" element={<Views />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </MainSection>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;