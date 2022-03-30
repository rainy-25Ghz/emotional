import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: grey[800],
    // backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[300],
    // backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));
