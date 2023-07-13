import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        padding: 1.5,
        background: "linear-gradient(#333, #000)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "white",
        }}
      >
        GitHub PRs
      </Typography>
    </Box>
  );
}
