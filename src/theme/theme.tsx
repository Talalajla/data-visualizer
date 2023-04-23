import { createTheme } from "@mui/material";

const lightPalette = {
    primary: {
        main: '#2196f3',
    },
    secondary: {
        main: '#f50057',
    },
    background: {
        default: '#fff',
    },
    text: {
        primary: '#010',
    },
    buttons: {
        red: '#ef123e',
        redHover: '#b6233e',
        blue: '#1096f6',
        blueHover: '#1070f6',
        green: '#1ddd8c',
        greenHover: '#23b679',
    }
};

const darkPalette = {
    ...lightPalette,
    primary: {
        main: '#90caf9',
    },
    secondary: {
        main: '#f48fb1',
    },
    background: {
        default: '#121212',
        paper: '#1f1f1f',
    },
    text: {
        primary: '#fff',
    },
};

const theme = createTheme({
    palette: lightPalette,
    typography: {
        fontFamily: 'Montserrat, Roboto, sans-serif',
    },
});

const darkTheme = createTheme({
    palette: darkPalette,
    typography: {
        fontFamily: 'Montserrat, Roboto, sans-serif',
    },
});

export { theme, darkTheme };