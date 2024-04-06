import { Button, type ButtonProps } from "@mui/material";
import React from "react";

export default function SaveButton(props: ButtonProps) {
  return (
    <Button
      variant="outlined"
      disableRipple
      sx={{
        borderRadius: 2,
        textTransform: "none",
        color: "white",
        bgcolor: "#1f883d",
        "&:hover": {
          bgcolor: "#1c823b",
        },
        "&.Mui-disabled": {
          bgcolor: "white",
        },
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      Save
    </Button>
  );
}
