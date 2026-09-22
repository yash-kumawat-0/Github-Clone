const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".mygit"); // Current Working Directory Path -> .mygit
  const commitsPath = path.join(repoPath, "commits"); // Path -> /.mygit/commits

  try {
    const commitDirs = await fs.readdir(commitsPath); // Files in commits folder
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir); // Particular Each File Path in commits folder

      // In the case of Folder instead of files in commits folder
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);
        const params = {
          Bucket: S3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent,
        };

        await s3.upload(params).promise();
      }
    }

    console.log("All Commits pushed to S3.");
  } catch (err) {
    console.error("Error pushing to S3 ", err);
  }
}

module.exports = { pushRepo };
