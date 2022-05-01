import styled from "@emotion/styled";
import {
    Box,
    SwipeableDrawer,
    Button,
    Typography,
    TextField,
    Select,
    MenuItem,
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
import {
    Control,
    Controller,
    useForm,
    useWatch,
} from "react-hook-form";
import { Theme } from "./Theme";
import html2canvas from "html2canvas";
import Edit from "./Edit";
import Download from "./Download";
import { themes } from "./constants";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#fff",
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
}));

const drawerBleeding = 56;

export type Inputs = {
    text: string;
    letterSpacing: number;
    fontWeight: number;
    fontSize: number;
    fontFamily:
        | "yozai"
        | "genyo"
        | "gnu"
        | "taipei"
        | "serif";
    textAlign: "left" | "right" | "center";
    vertical: boolean;
    fontColor: string;
    backgroundColor: string;
    lineHeight: number;
    padding: number;
    theme: keyof typeof themes;
};
const Text = ({
    control,
}: {
    control: Control<Inputs, any>;
}) => {
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

    const letterSpacing = useWatch({
        control,
        name: "letterSpacing",
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

    return (
        <Box className=" mt-16 z-40 drop-shadow-xl flex items-center w-full justify-center ">
            <Box
                id="emo"
                className="flex items-center justify-center overflow-hidden "
                style={{
                    width: "90vw",
                    height: "90vw",
                    padding: `${padding}px`,
                    whiteSpace: "pre-line",
                    backgroundColor,
                    textAlign: align,
                    color: fontColor,
                    writingMode: vertical
                        ? "vertical-rl"
                        : "unset",
                    fontFamily,
                    fontSize,
                    lineHeight,
                    letterSpacing: `${letterSpacing}px`,
                    fontWeight: "lighter",
                    // textShadow: `2px 0px 10px #fff` /* outer white */,
                    //   filter: `blur(0.5px)` /* glow range */,
                }}
            >
                {text}
            </Box>
        </Box>
    );
};
const cfg = {
    defaultValues: {
        backgroundColor: "#ffffff",
        fontColor: "#000000",
        text: `
想起来的是夜晚的残像
瞳孔渗出的那引力 
如同电影一样的风景
像是在说谎吧？`,
        fontFamily: "genyo" as Inputs["fontFamily"],
        fontSize: 20,
        lineHeight: 2,
        padding: 12,
        textAlign: "center",
        letterSpacing: 0.5,
        theme: "白纸",
    } as Inputs,
};

export default function SwipeableEdgeDrawer() {
    const { register, control, setValue } =
        useForm<Inputs>(cfg);
    const theme = useWatch({
        control,
        name: "theme",
    });
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        const emo=document.getElementById("emo");
        if(!emo) return;
       
        switch (theme) {
            case "赤齣":
                setValue("backgroundColor", "#c62813");
                setValue("fontColor","#ffffff");
                emo.style.textShadow="2px 0px 10px #ffffffe5, 0px 2px 7px #918b8b3d";
                break;
            case "白纸":
                setValue("backgroundColor", "#ffffff");
                setValue("fontColor","#000000");
                emo.style.textShadow="";
                break;
            case "8-bit":
              setValue("backgroundColor", "#000000");
              setValue("fontColor","#00e21a");
              setValue("fontFamily","gnu");
              emo.style.textShadow="2px 0px 10px #009100e3, 0px 2px 7px #918b8b3d";
              emo.style.fontWeight="500";
              break;
        }
    }, [theme]);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <Root>
            <Theme>
                <Global
                    styles={{
                        ".MuiDrawer-root > .MuiPaper-root":
                            {
                                height: `calc(50% - ${drawerBleeding}px)`,
                                overflow: "visible",
                                borderRadius: 16,
                                boxShadow:
                                    "2px -5px 20px rgb(102 101 101 / 12%);",
                            },
                    }}
                />
                <Box
                    className=" w-full z-50 fixed top-0 flex justify-between my-3"
                    sx={{ textAlign: "center", pt: 1 }}
                >
                    <Box className="flex-1 flex justify-center">
                        <Button
                            onClick={toggleDrawer(true)}
                            sx={{ fontSize: 16 }}
                            startIcon={<Edit></Edit>}
                        >
                            编辑
                        </Button>
                    </Box>
                    <Box className="flex-1 flex justify-center">
                        <Button
                            startIcon={
                                <Download></Download>
                            }
                            sx={{ fontSize: 16 }}
                            onClick={async () => {
                                const node =
                                    document.getElementById(
                                        "emo"
                                    );
                                if (node) {
                                    try {
                                        console.time(
                                            "dom2image"
                                        );
                                        const canvas =
                                            await html2canvas(
                                                node
                                            );
                                        console.timeEnd(
                                            "dom2image"
                                        );
                                        const link =
                                            document.createElement(
                                                "a"
                                            );
                                        link.href =
                                            canvas.toDataURL();
                                        link.download =
                                            "emo.png";
                                        link.click();
                                    } catch (error) {
                                        console.error(
                                            error
                                        );
                                    }
                                }
                            }}
                        >
                            导出
                        </Button>
                    </Box>
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
                        sx={{
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            borderBottomStyle: "solid",
                        }}
                    >
                        <Puller />
                        <Typography
                            sx={{
                                p: 2,
                                color: "text.secondary",
                            }}
                        >
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
                        <Box className=" my-4 flex items-center">
                            <span className="mr-4">
                                主题：
                            </span>
                            <Select
                                {...register("theme")}
                                defaultValue={
                                    cfg.defaultValues.theme
                                }
                            >
                                <MenuItem value={"白纸"}>
                                    白纸
                                </MenuItem>
                                <MenuItem value={"赤齣"}>
                                    赤齣
                                </MenuItem>
                                <MenuItem value={"8-bit"}>
                                    8-bit
                                </MenuItem>
                                <MenuItem value={"春日"}>
                                    春日
                                </MenuItem>
                                <MenuItem value={"樱"}>
                                    樱
                                </MenuItem>
                            </Select>
                        </Box>
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
                                label="字间距(px)"
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                }}
                                {...register(
                                    "letterSpacing",
                                    { min: 0 }
                                )}
                            ></TextField>
                        </Box>
                        <Box className=" mt-4 flex">
                            <TextField
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
                                defaultValue={
                                    cfg.defaultValues
                                        .fontFamily
                                }
                            >
                                <MenuItem value={"yozai"}>
                                    悠哉字体
                                </MenuItem>
                                <MenuItem value={"taipei"}>
                                    台北黑体
                                </MenuItem>
                                <MenuItem value={"serif"}>
                                    思源宋体
                                </MenuItem>
                                <MenuItem value={"genyo"}>
                                    源样明体
                                </MenuItem>
                                <MenuItem value={"gnu"}>
                                    GNU像素字体
                                </MenuItem>
                            </Select>
                        </Box>
                        <Box className="flex flex-row">
                            <Box className=" mt-4 flex">
                                <span className="mr-2">
                                    字体颜色
                                </span>
                                <input
                                    className="shadow-md"
                                    type={"color"}
                                    {...register(
                                        "fontColor"
                                    )}
                                ></input>
                            </Box>
                            <Box className="ml-4 mt-4 flex">
                                <span className="mr-2">
                                    背景颜色
                                </span>
                                <input
                                    className="shadow-md"
                                    type={"color"}
                                    {...register(
                                        "backgroundColor"
                                    )}
                                ></input>
                            </Box>
                        </Box>

                        <Box className="mt-4">
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    文本对齐
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="textAlign"
                                    render={({ field }) => {
                                        return (
                                            <RadioGroup
                                                {...field}
                                                defaultValue={
                                                    cfg
                                                        .defaultValues
                                                        .textAlign
                                                }
                                                row
                                            >
                                                <FormControlLabel
                                                    value="left"
                                                    control={
                                                        <Radio />
                                                    }
                                                    label="左"
                                                />
                                                <FormControlLabel
                                                    value="center"
                                                    control={
                                                        <Radio />
                                                    }
                                                    label="中"
                                                />
                                                <FormControlLabel
                                                    value="right"
                                                    control={
                                                        <Radio />
                                                    }
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
                                control={
                                    <Checkbox
                                        {...register(
                                            "vertical"
                                        )}
                                    />
                                }
                                label="竖向排版"
                            />
                        </Box>
                    </StyledBox>
                </SwipeableDrawer>
            </Theme>
        </Root>
    );
}
