import { createTheme } from '@mui/material/styles';

    const customTheme = createTheme({
      palette: {
        primary: {
          main: '#ec691a',
        },
        secondary: {
          main: '#f5f5f5',
        },
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
      },
    });

    export default customTheme;