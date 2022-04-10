import { Stack, Typography } from "@mui/material";
import React from "react";
import SavedRepo from "./SavedRepo";

export default function Saved({ savedRepos, setSavedRepos }) {


    return (
        <Stack padding={2} width="50%">
            {savedRepos.length === 0 ?
                <Typography variant="body1">
                    You do not have any repositories saved. Go to the Add tab to
                    add a repo.
                </Typography>
                :
                <Typography variant="body1">
                    Here is a list of your currently saved repositories. You can
                    remove them here.
                </Typography>
            }
            {savedRepos.length !== 0 &&
                savedRepos.map((repo, index) => (
                    <SavedRepo key={index} repo={repo} setSavedRepos={setSavedRepos} />
                ))
            }
        </Stack>
    );
}