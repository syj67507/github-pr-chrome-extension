import { Box, Button, CssBaseline, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { render } from "react-dom";
import PRDisplay from "./components/PRDisplay";
import Header from "./components/Header";
import Options from "./components/Options";

function Popup() {

    const [page, setPage] = useState("PRs");

    return (
        <>
            <Stack
                spacing={0}
                padding={0}
                width="100%"
                alignItems="flex-start"
                bgcolor="white"
            >
                <CssBaseline />
                <Box
                    sx={{
                        width: "100%",
                        padding: 1.5,
                        background: "linear-gradient(#333, #000)",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    >
                    <Button
                        // variant="h6"
                        sx={{
                            color: "white",
                        }}
                        onClick={() => setPage("PRs")}
                    >
                        PRs
                    </Button>
                    <Button
                        sx={{
                            color: "white",
                        }}
                        onClick={() => setPage("Options")}
                    >
                        Options
                    </Button>
                </Box>
                {page === "PRs" && <PRDisplay />}
                {page === "Options" && <Options />}
            </Stack>
        </>
    );
}


render(<Popup />, document.getElementById("root"));