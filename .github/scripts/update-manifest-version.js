const fs = require("fs");

// Get the version string from command line
const version = process.argv[2].replace("v", "");

const manifestFiles = fs
    .readdirSync("./public")
    .filter(file => new RegExp("^manifest\..+\.json$", "g").test(file));

for (const manifestFile of manifestFiles) {
    const manifestFileContents = fs.readFileSync(`./public/${manifestFile}`).toString();
    const updatedManifestFile = manifestFileContents.replace('"version": "0.0.3",', `"version": "${version}",`);

    fs.writeFileSync(`./public/${manifestFile}`, updatedManifestFile);
    console.log(`Updated ${manifestFile} version field to`, version);
}