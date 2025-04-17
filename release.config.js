const emojiMap = {
  feat: "✨",
  fix: "🐛",
  docs: "📝",
  style: "💅",
  refactor: "♻️",
  perf: "⚡",
  test: "✅",
  chore: "🔧",
};

module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    [
      "@semantic-release/release-notes-generator",
      {
        groupBy: false,
        writerOpts: {
          transform(commit) {
            const emoji = emojiMap[commit.type] || "🏷️";
            return {
              ...commit,
              subject: `${emoji} ${commit.subject}`,
            };
          },
          headerPartial: "",
          commitPartial: "- {{subject}}\n",
        },
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json"],
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ],
    "@semantic-release/github",
  ],
};
