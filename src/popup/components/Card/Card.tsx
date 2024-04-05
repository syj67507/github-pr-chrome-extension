import React from "react";
import Box from "@mui/material/Box";

export default function Card({ children }: React.PropsWithChildren) {
  return (
    <Box
      sx={{
        padding: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "1px 1px 3px black",
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      {children}
    </Box>
  );
}
