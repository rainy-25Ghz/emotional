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
  fontFamily: string;
  textAlign: "left" | "right" | "center";
  vertical: boolean;
  fontColor: string;
  backgroundColor: string;
  lineHeight: number;
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

  return (
    <Box className="flex items-center w-full justify-center ">
      <Box
        className="flex items-center justify-center"
        style={{
          width: "90vw",
          height: "90vw",
          backgroundColor,
          whiteSpace: "pre-line",
          textAlign: align,
          color: fontColor,
          writingMode: vertical ? "vertical-rl" : "unset",
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
      text: "",
    },
  });

  const [open, setOpen] = React.useState(false);

  // const values = watch();
  // console.log(values, errors.letterSpacing);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    console.log(newOpen);
  };

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
            borderRadius: 8,
            boxShadow: "0px -5px 10px rgb(0 0 0 / 12%);",
          },
        }}
      />
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
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
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomStyle: "solid",
            // visibility: "visible",
            // right: 0,
            // left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>编辑</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 3,
            py: 0,
            height: "100%",
            overflow: "auto",
          }}
        >
          <TextField
            className="mb-2"
            fullWidth
            variant="standard"
            label="文本"
            multiline
            maxRows={6}
            {...register("text", {})}
          />
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
              defaultValue={3}
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
            <Select defaultValue={"濑户字体"} {...register("fontFamily")}>
              <MenuItem value={"濑户字体"}>濑户字体</MenuItem>
              <MenuItem value={"台北黑体"}>台北黑体</MenuItem>
              <MenuItem value={"思源宋体"}>思源宋体</MenuItem>
              <MenuItem value={"源样明体"}>源样明体</MenuItem>
              <MenuItem value={"GNU"}>GNU</MenuItem>
            </Select>
          </Box>
          <Box className="flex flex-row">
            <Box className=" mt-4 flex">
              <span className="mr-2">字体颜色</span>
              <input type={"color"} {...register("fontColor")}></input>
            </Box>
            <Box className="ml-4 mt-4 flex">
              <span className="mr-2">背景颜色</span>
              <input type={"color"} {...register("backgroundColor")}></input>
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
    </Root>
  );
}
