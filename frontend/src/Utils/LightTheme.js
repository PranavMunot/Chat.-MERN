import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#0a0908',
        },
        secondary: {
            main: '#e0f2f1',
        },
    },
    typography: {
        fontFamily: 'Nunito',
    },
    shape: {
        borderRadius: '15px',
    },
})

export default lightTheme