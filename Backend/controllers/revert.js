const fs = require("fs");
const path = require("path");
const {promisify} = require("util");

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID){
    const repoPath = path.resolve(process.cwd(), ".mygit");
    const commitPath = path.join(repoPath, "commits");

    try{
        const commitDir = path.join(commitPath, commitID);
        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");

        for(const file of files){
            await copyFile(path.join(commitDir, file), path.join(parentDir, file))
        }

        console.log(`Commit: ${commitID} reverted Successfully`);
    }catch(err){
        console.error("Unable to Revert: ",err)
    }
}

module.exports = {revertRepo}