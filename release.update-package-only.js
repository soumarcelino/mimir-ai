module.exports = {
  branches: ['master', 'feat/add-semantic-release'],
  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/exec',
      {
        updatePackageOnly:
          'yarn version --new-version ${nextRelease.version} --no-git-tag-version',
      },
    ],
  ],
  dryRun: true,
};
