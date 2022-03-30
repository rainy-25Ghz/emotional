import { Box, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

type Props = {
    label?: string;
};

const PaddingInput = (props: Props) => {
    const [error, setError] = useState(false);
    const [value, setValue] = useState(3);
    return (
        <Box className=" mt-4 flex">
            {/* <span className=" basis-16">边距</span> */}
            <TextField
                error={error}
                onChange={(e) => {
                    setValue(e.target.value as any as number);
                }}
                value={value}
                type={"number"}
                label="边距"
                inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                }}
            ></TextField>
        </Box>
    );
};
export default PaddingInput;
