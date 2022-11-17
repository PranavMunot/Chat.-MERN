import { createTheme } from "@mui/material/styles";

export const TypographyTheme = createTheme({
    typography: {
        fontFamily: [
            'Nunito',
            'Arial',
            'Roboto'
        ].join(',')
    },

})

// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

// export const themeOptions: ThemeOptions = {
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#0a0908',
//     },
//     secondary: {
//       main: '#e0f2f1',
//     },
//   },
//   typography: {
//     fontFamily: 'Nunito',
//   },
// shape: {
//     borderRadius: 15,
// },
// };