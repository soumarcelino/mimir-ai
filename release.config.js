// .releaserc.js
const emojiMap = {
  feat: "✨", // :sparkles:
  fix: "🐛", // :bug:
  docs: "📝", // :memo:
  style: "💅", // :nail_care:
  refactor: "♻️", // :recycle:
  perf: "⚡", // :zap:
  test: "✅", // :white_check_mark:
  chore: "🔧", // :wrench:
};
module.exports = {
  branches: ["main"],

  plugins: [
    // 1. Classifica os commits
    "@semantic-release/commit-analyzer",

    // 2. Gera as notas de release com nosso writerOpts
    [
      "@semantic-release/release-notes-generator",
      {
        writerOpts: {
          /**
           *  • Adiciona o emoji antes do subject
           *  • Mantém o body/descriptions completo se existir
           */
          transform(commit /*, context*/) {
            const emoji = emojiMap[commit.type] || "🏷️";
            commit.subject = `${emoji} ${commit.subject}`;
            return commit;
          },
          /**
           *  • Tira os títulos “### Bug Fixes”, “### Features”…
           *    Queremos só a lista limpa.
           */
          headerPartial: "", // remove o cabeçalho duplicado
          commitPartial: "- {{subject}}", // bullet simples
          /**
           *  • Junta todos os commits num único grupo,
           *    já que não vamos mostrar seções por tipo.
           */
          finalizeContext(context) {
            context.commitGroups = [
              {
                commits: context.commitGroups.flatMap((g) => g.commits),
              },
            ];
            return context;
          },
        },
      },
    ],
    // 4. Comita arquivos alterados
    [
      "@semantic-release/git",
      {
        assets: ["package.json"],
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ],

    // 5. Publica tag e release no GitHub
    "@semantic-release/github",
  ],
};
