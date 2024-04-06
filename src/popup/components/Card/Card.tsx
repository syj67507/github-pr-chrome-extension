import React from "react";
import Box from "@mui/material/Box";
import { type SxProps } from "@mui/material";

interface CardProps extends React.PropsWithChildren {
  /** sx properties that can be added or overridden to this card component */
  sx?: SxProps;
}

export default function Card({ children, sx }: CardProps) {
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
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

Card.defaultProps = {
  sx: {},
};
