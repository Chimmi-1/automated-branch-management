const { execSync } = require("child_process");
const fs = require("fs");

// Load the config.json file
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

// Function to run Git commands
function runGitCommand(command) {
  try {
    console.log(`Executing: ${command}`);
    const output = execSync(command, { stdio: "pipe" }).toString();
    console.log(output);
    return output;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;  // Re-throw error to handle it properly
  }
}

// 1. Create branches
function createBranches() {
  console.log("\nCreating branches...");
  config.branchesToCreate.forEach(branch => {
    runGitCommand(`git branch ${branch}`);
  });
}

// 2. Merge branches
function mergeBranches() {
  console.log("\nMerging branches...");
  config.mergeRules.forEach(({ from, to }) => {
    try {
      runGitCommand(`git checkout ${to}`);
      runGitCommand(`git merge ${from}`);
    } catch (error) {
      console.error(`Failed to merge ${from} into ${to}: ${error.message}`);
    }
  });
}

// 3. Delete merged branches
function deleteBranches() {
  if (config.deleteMergedBranches) {
    console.log("\nDeleting merged branches...");
    const mergedBranches = runGitCommand("git branch --merged").split("\n");

    mergedBranches.forEach(branch => {
      const branchName = branch.trim();
      if (branchName && branchName !== "main" && !branchName.startsWith("*")) {
        console.log(`Deleting branch: ${branchName}`);
        runGitCommand(`git branch -d ${branchName}`);
      }
    });
  }
}

// Main function to automate the process
function main() {
  console.log("Automated Branch Management Started");

  // Checkout the main branch to start operations
  runGitCommand("git checkout main");

  // Perform tasks
  createBranches();
  mergeBranches();
  deleteBranches();
}

main();
