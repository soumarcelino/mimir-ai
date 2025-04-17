const emojiMap = {
  feat: ":sparkles:", // ✨
  fix: ":bug:", // 🐛
  docs: ":memo:", // 📝
  style: ":nail_care:", // 💅
  refactor: ":recycle:", // ♻️
  perf: ":zap:", // ⚡
  test: ":white_check_mark:", // ✅
  chore: ":wrench:", // 🔧
};

const defaultEmoji = ":label:"; // 🏷️

module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/npm",
    [
      "@semantic-release/release-notes-generator",
      {
        parserOpts: {
          transform: (commit) => {
            const emoji = emojiMap[commit.type] || defaultEmoji;
            commit.type = `${emoji} ${commit.type}`;
            return commit;
          },
        },
        writerOpts: {
          groupBy: "type",
          commitsSort: ["scope", "subject"],
          commitGroupsSort: "title",
          headerPartial: "",
          commitPartial:
            "{{type}} {{#if scope}}(`{{scope}}`): {{/if}}{{subject}}",
          mainTemplate: `
            ## {{version}} ({{date}})

            {{#each commitGroups}}
            ### {{title}}

            {{#each commits}}
            - {{> commit}}
            {{/each}}

            {{/each}}`,
          commitGroupsTemplate:
            "{{#each commitGroups}}\n### {{title}}\n{{/each}}",
        },
      },
    ],
    [
      "@semantic-release/exec",
      {
        verifyReleaseCmd:
          'echo "NEXT_RELEASE_VERSION=${nextRelease.version}" >> $GITHUB_ENV',
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
