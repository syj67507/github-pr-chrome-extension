import React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { type ConfiguredRepo } from "../../../../../../data/extension";
import Card from "../../../../Card/Card";

export interface SavedRepoProps {
  /** The repo of the saved repo */
  repo: ConfiguredRepo;
  /** Handler for when the remove button is clicked */
  onRemove: (repo: ConfiguredRepo) => Promise<void>;
}

export default function SavedRepo({ repo, onRemove }: SavedRepoProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        bgcolor: "whitesmoke",
        color: "black",
      }}
    >
      {/* Saved information */}
      <Stack
        direction="column"
        alignItems="flex-start"
        width="100%"
        paddingLeft={1}
      >
        <Typography variant="caption">{repo.url}</Typography>
        {repo.jiraTags != null && (
          <Typography variant="caption">{repo.jiraTags.join(",")}</Typography>
        )}
        {repo.jiraDomain != null && (
          <Typography variant="caption">{repo.jiraDomain}</Typography>
        )}
      </Stack>

      {/* Delete icon button */}
      <IconButton
        aria-label="delete"
        onClick={() => {
          onRemove(repo).catch((e) => {
            console.error("failed to remove repo", repo, e);
          });
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
}
