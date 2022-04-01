import styled from "@emotion/styled";
import {
    Box,
    SwipeableDrawer,
    Button,
    Typography,
    Skeleton,
    TextField,
    Slider,
    Select,
    MenuItem,
    InputLabel,
    Checkbox,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormLabel,
    FormControl,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import { Global } from "@emotion/react";
import { Control, Controller, useForm, useWatch } from "react-hook-form";
import { SketchPicker } from "react-color";
import { Theme } from "./Theme";
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

export type Inputs = {
    text: string;
    letterSpacing: number;
    fontWeight: number;
    fontSize: number;
    fontFamily: "laihu" | "genyo" | "1ming" | "song" | "taipei" | "serif";
    textAlign: "left" | "right" | "center";
    vertical: boolean;
    fontColor: string;
    backgroundColor: string;
    lineHeight: number;
    padding: number;
};
const Text = ({ control }: { control: Control<Inputs, any> }) => {
    const text = useWatch({
        control,
        name: "text",
    });
    const align = useWatch({
        control,
        name: "textAlign",
    });
    const fontColor = useWatch({
        control,
        name: "fontColor",
    });
    const backgroundColor = useWatch({
        control,
        name: "backgroundColor",
    });
    const vertical = useWatch({
        control,
        name: "vertical",
    });
    const fontFamily = useWatch({
        control,
        name: "fontFamily",
    });

    const fontSize = useWatch({
        control,
        name: "fontSize",
    });

    const lineHeight = useWatch({
        control,
        name: "lineHeight",
    });

    const padding = useWatch({
        control,
        name: "padding",
    });
    console.log(text);
    return (
        <Box className="flex items-center w-full justify-center ">
            <Box
                className="flex items-center justify-center overflow-hidden "
                style={{
                    width: "90vw",
                    height: "90vw",
                    padding,
                    whiteSpace: "pre-line",
                    backgroundColor,
                    textAlign: align,
                    color: fontColor,
                    writingMode: vertical ? "vertical-rl" : "unset",
                    fontFamily,
                    fontSize,
                    lineHeight,
                }}
            >
                {text}
            </Box>
        </Box>
    );
};

export default function SwipeableEdgeDrawer() {
    const {
        register,
        watch,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            backgroundColor: "#FFFFFF",
            fontColor: "#000000",
            text: `
思い出すのは 夜の残像
想起来的是夜晚的残像
渗む瞳のその引力を 映画みたいな风景のこと
瞳孔渗出的那引力 如同电影一样的风景
嘘みたいだろう?
像是在说谎吧？`,
            fontFamily: "serif",
            fontSize: 20,
            lineHeight: 2,
            padding: 12,
        },
    });

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        console.log(newOpen);
    };

    return (
        <Root>
            <Theme>
                <Global
                    styles={{
                        ".MuiDrawer-root > .MuiPaper-root": {
                            height: `calc(50% - ${drawerBleeding}px)`,
                            overflow: "visible",
                            borderRadius: 16,
                            boxShadow: "2px -5px 20px rgb(102 101 101 / 12%);",
                        },
                    }}
                />
                <Box sx={{ textAlign: "center", pt: 1 }}>
                    <Button onClick={toggleDrawer(true)} sx={{ fontSize: 16 }}>
                        开启编辑
                    </Button>
                </Box>
                <Text {...{ control }}></Text>
                <SwipeableDrawer
                    BackdropProps={{
                        style: {
                            backgroundColor: "transparent",
                        },
                    }}
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <StyledBox
                        // className=" border-0 border-b border-solid  border-gray-500"
                        sx={{
                            // position: "absolute",
                            // top: -drawerBleeding,
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            borderBottomStyle: "solid",
                            // visibility: "visible",
                            // right: 0,
                            // left: 0,
                        }}
                    >
                        <Puller />
                        <Typography sx={{ p: 2, color: "text.secondary" }}>
                            编辑
                        </Typography>
                    </StyledBox>
                    <StyledBox
                        sx={{
                            px: 3,
                            py: 0,
                            height: "100%",
                            overflow: "auto",
                        }}
                    >
                        <Controller
                            name={"text"}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    className="mb-2"
                                    {...field}
                                    fullWidth
                                    variant="standard"
                                    label="文本"
                                    multiline
                                    maxRows={6}
                                />
                            )}
                        />
                        <Box className=" mt-4 flex">
                            <TextField
                                type={"number"}
                                label="边距"
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                }}
                                {...register("padding")}
                            ></TextField>
                        </Box>
                        <Box className=" mt-4 flex">
                            <TextField
                                defaultValue={3}
                                type={"number"}
                                label="字间距"
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                }}
                                {...register("letterSpacing", { min: 0 })}
                            ></TextField>
                        </Box>
                        <Box className=" mt-4 flex">
                            <TextField
                                defaultValue={24}
                                type={"number"}
                                label="行高"
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                }}
                                {...register("lineHeight")}
                            ></TextField>
                        </Box>
                        <Box className=" mt-4 flex">
                            <TextField
                                type={"number"}
                                label="字号"
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                }}
                                {...register("fontSize")}
                            ></TextField>
                        </Box>
                        <Box className=" mt-4 flex items-center">
                            {/* <span className="mr-4">字体:</span> */}
                            <Select
                                {...register("fontFamily")}
                                defaultValue={"serif"}
                            >
                                <MenuItem value={"laihu"}>濑户字体</MenuItem>
                                <MenuItem value={"taipei"}>台北黑体</MenuItem>
                                <MenuItem value={"serif"}>思源宋体</MenuItem>
                                <MenuItem value={"genyo"}>源样明体</MenuItem>
                                <MenuItem value={"gnu"}>GNU像素字体</MenuItem>
                                <MenuItem value={"song"}>全字库正宋</MenuItem>
                                <MenuItem value={"ming"}>一点明体</MenuItem>
                            </Select>
                        </Box>
                        <Box className="flex flex-row">
                            <Box className=" mt-4 flex">
                                <span className="mr-2">字体颜色</span>
                                <input
                                    type={"color"}
                                    {...register("fontColor")}
                                ></input>
                            </Box>
                            <Box className="ml-4 mt-4 flex">
                                <span className="mr-2">背景颜色</span>
                                <input
                                    type={"color"}
                                    {...register("backgroundColor")}
                                ></input>
                            </Box>
                        </Box>

                        <Box className="mt-4">
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    文本对齐
                                </FormLabel>
                                <Controller
                                    defaultValue={"center"}
                                    control={control}
                                    name="textAlign"
                                    render={({ field }) => {
                                        return (
                                            <RadioGroup {...field} row>
                                                <FormControlLabel
                                                    value="left"
                                                    control={<Radio />}
                                                    label="左"
                                                />
                                                <FormControlLabel
                                                    value="center"
                                                    control={<Radio />}
                                                    label="中"
                                                />
                                                <FormControlLabel
                                                    value="right"
                                                    control={<Radio />}
                                                    label="右"
                                                />
                                            </RadioGroup>
                                        );
                                    }}
                                ></Controller>
                            </FormControl>
                        </Box>

                        <Box className="mt-4">
                            <FormControlLabel
                                control={<Checkbox {...register("vertical")} />}
                                label="竖向排版"
                            />
                        </Box>
                    </StyledBox>
                </SwipeableDrawer>
            </Theme>
        </Root>
    );
}
