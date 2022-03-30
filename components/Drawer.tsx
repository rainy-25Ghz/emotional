import styled from "@emotion/styled";
import {
    Box,
    SwipeableDrawer,
    Button,
    Typography,
    Skeleton,
    TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import { Global } from "@emotion/react";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#fff",
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

const Root = styled("div")(({ theme }) => ({
    height: "100%",
    backgroundColor: grey[0],
    //theme.palette.mode === "light" ? grey[0] : theme.palette.background.default
}));

const drawerBleeding = 56;

export default function SwipeableEdgeDrawer() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState("");

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
    };

    return (
        <Root>
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(100% - ${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                }}
            />
            <Box sx={{ textAlign: "center", pt: 1 }}>
                <Button onClick={toggleDrawer(true)}>Open</Button>
            </Box>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: "absolute",
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: "visible",
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                    <Typography sx={{ p: 2, color: "text.secondary" }}>
                        编辑
                    </Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        py: 1,
                        height: "100%",
                        overflow: "auto",
                    }}
                >
                    <TextField
                        fullWidth
                        variant="standard"
                        label="文本"
                        multiline
                        maxRows={4}
                        value={value}
                        onChange={handleChange}
                    />
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}
