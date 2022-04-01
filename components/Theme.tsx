import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: grey[800],
        },
        secondary: {
            // This is green.A700 as hex.
            main: "#11cb5f",
        },
    },
});
export const Theme = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
