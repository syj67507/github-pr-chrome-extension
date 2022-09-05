import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getStorage, setStorage } from "../../../data/chromeStorage";
import SavedRepo from "./SavedRepo";

export default function Saved() {
    const [repos, setRepos] = useState([]);

    // Fetch repos on page load
    useEffect(() => {
        async function getRepos() {
            const storage = await getStorage();
            setRepos(storage.repos || []);
        }
        getRepos()
    }, []);

    return (
        <Stack padding={2} width="50%" spacing={1}>
            {repos.length === 0 ?
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
            {repos.length !== 0 &&
                repos.map((repo, index) => (
                    <SavedRepo
                        key={index}
                        repo={repo}
                        bgcolor={index % 2 === 0 ? "whitesmoke" : "white"}
                        onRemove={async () => {
                            const storage = await getStorage();
                            const savedRepos = storage.repos;
                            const filtered = savedRepos.filter((savedRepo) => {
                                return savedRepo.url !== repo.url ;
                            });
                            storage.repos = filtered;
                            await setStorage(storage);
                            setRepos(filtered);
                        }}
                    />
                ))
            }
        </Stack>
    );
}