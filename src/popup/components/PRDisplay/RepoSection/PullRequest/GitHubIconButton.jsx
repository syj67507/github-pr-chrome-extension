import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function GitHubIconButton({ pr }) {
    return (
        <Tooltip
            title={`#${pr.number}`}
            placement="top"
        >
            <IconButton
                sx={{
                    color: "white",
                    bgcolor: "black",
                    "&:hover": {
                        bgcolor: "#333"
                    },
                    border: "2px solid #000",
                }}
                onClick={() => {
                    chrome.tabs.create({
                        url: pr.url,
                    });
                }}
            >
                <GitHubIcon />
            </IconButton>
        </Tooltip>
    )
}