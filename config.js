{
  "branchesToCreate": [
    "feature/new-ui",
    "feature/api-integration",
    "bugfix/fix-login"
  ],
  "mergeRules": [
    {
      "from": "feature/new-ui",
      "to": "main"
    },
    {
      "from": "feature/api-integration",
      "to": "main"
    },
    {
      "from": "bugfix/fix-login",
      "to": "main"
    }
  ],
  "deleteMergedBranches": true
}
