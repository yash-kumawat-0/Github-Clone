const yargs = require("yargs")
const { hideBin } = require("yargs/helpers")
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

yargs(hideBin(process.argv))
    .command("init", "Initialize a new Repository", {}, initRepo)
    .command("add <file>", "Add a file to the Repository", (yargs)=>{
        yargs.positional("file", {
            describe:"File to added to the staging area",
            type: "string"
        })
    }, addRepo)
    .command("commit <message>", "Commit the staged file", (yargs)=>{
        yargs.positional("message",{
            describe: "Commit Message",
            type: "string"
        })
    }, commitRepo)
    .command("push", "Push commits to S3", {}, pushRepo)
    .command("pull", "Pull commits to S3", {}, pullRepo)
    .command("revert <commitID>", "Revert to the specific commit",(yargs)=>{
        yargs.positional("commitID", {
            describe: "commit ID to revert to",
            type: "string"
        })
    }, revertRepo)
    .demandCommand(1, "You need at least one command").help().argv;