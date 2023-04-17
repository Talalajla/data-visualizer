import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import View from './pages/view/View';
import Error404 from './pages/errors/error404';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import EnhancedTable from './pages/test';

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



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Navbar />
                <MainSection>
                    <Routes>
                        <Route path="/" element={<Navigate to='/main' replace />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/view" element={<View />} />
                        <Route path="/test" element={<EnhancedTable />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </MainSection>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;