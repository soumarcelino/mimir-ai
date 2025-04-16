module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/npm",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/exec",
      {
        verifyReleaseCmd:
          'echo "NEXT_RELEASE_VERSION=${nextRelease.version}" >> $GITHUB_ENV',
        generateNotesCmd:
          'echo "RELEASE_NOTES<<EOF" >> $GITHUB_ENV && echo "${nextRelease.notes}" >> $GITHUB_ENV && echo "EOF" >> $GITHUB_ENV',
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "yarn.lock", "CHANGELOG.md"],
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ],
    "@semantic-release/github",
  ],
};
