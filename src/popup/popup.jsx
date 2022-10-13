import { Box, Button, CssBaseline, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { render } from "react-dom";
import PRDisplay from "./components/PRDisplay";
import Add from "./components/Options/components/Add";
import Saved from "./components/Options/components/Saved";
import Permissions from "./components/Options/components/Permissions";

function Popup() {

    const [page, setPage] = useState("PR");

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
                        background: "linear-gradient(#222, #000)",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        // variant="h6"
                        sx={{
                            color: "whitesmoke",
                            bgcolor: page === "PR" ? "#000" : undefined
                        }}
                        onClick={() => setPage("PR")}
                    >
                        PR
                    </Button>
                    <Button
                        sx={{
                            color: "whitesmoke",
                            bgcolor: page === "Add" ? "#000" : undefined
                        }}
                        onClick={() => setPage("Add")}
                    >
                        Add
                    </Button>
                    <Button
                        sx={{
                            color: "whitesmoke",
                            bgcolor: page === "Saved" ? "#000" : undefined
                        }}
                        onClick={() => setPage("Saved")}
                    >
                        Saved
                    </Button>
                    <Button
                        sx={{
                            color: "whitesmoke",
                            bgcolor: page === "Permissions" ? "#000" : undefined
                        }}
                        onClick={() => setPage("Permissions")}
                    >
                        Permissions
                    </Button>
                </Box>
                {page === "PR" && <PRDisplay />}
                {page === "Add" && <Add />}
                {page === "Saved" && <Saved />}
                {page === "Permissions" && <Permissions />}
            </Stack>
        </>
    );
}


render(<Popup />, document.getElementById("root"));