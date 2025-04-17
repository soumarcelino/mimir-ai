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
          finalizeContext(context) {
            const formatter = new Intl.DateTimeFormat("pt-BR", {
              timeZone: "America/Sao_Paulo",
              dateStyle: "short",
              timeStyle: "short",
            });

            context.releaseDateBr = formatter.format(new Date(context.date));
            return context;
          },
          mainTemplate: `
          ## {{version}} ({{releaseDateBr}})

          {{#each commits}}
          {{> commit}}
          {{/each}}

          `.trim(),
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
