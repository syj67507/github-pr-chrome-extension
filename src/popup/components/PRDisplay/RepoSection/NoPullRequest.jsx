/* global chrome */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function NoPullRequest({ repo }) {
    return (
        <Box 
            sx={{
                display: "flex",
                justifyContent: "center",
                padding: 1,
                "&:hover": {
                bgcolor: "whitesmoke",
                cursor: "pointer",
                }
            }}
            onClick={() => {
                chrome.tabs.create({
                url: `${repo.url}/pulls`,
                });
            }}
            >
            <Typography variant="caption">
                No pull requests open
            </Typography>
        </Box>
    );
}