import { Button, type ButtonProps } from "@mui/material";
import React from "react";

export default function ClearButton(props: ButtonProps) {
  return (
    <Button
      variant="outlined"
      disableRipple
      color="error"
      sx={{
        borderRadius: 2,
        textTransform: "none",
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      Clear
    </Button>
  );
}
