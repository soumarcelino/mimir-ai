module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    [
      "@semantic-release/exec",
      {
        verifyReleaseCmd:
          "yarn version --new-version ${nextRelease.version} --no-git-tag-version",
      },
    ],
  ],
  dryRun: true,
};
