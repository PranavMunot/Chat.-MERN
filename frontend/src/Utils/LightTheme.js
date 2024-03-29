import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#103783',
        },
        secondary: {
            main: '#e0f2f1',
        },
        text: {
            primary: '#103783'
        },
        action: {
            disabledBackground: '#eeeeee',
            disabled: '#999999'
        }
    },
    typography: {
        fontFamily: 'Nunito'
    },

    shape: {
        borderRadius: 7,
    },
})

export default lightTheme