/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: [
    "main",
    "next",
    {
      name: "dev",
      prerelease: true,
    },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"],
        },
        preset: "angular",
        releaseRules: [
          {
            release: false,
            scope: "wip",
          },
          {
            release: false,
            scope: "WIP",
          },
          {
            release: false,
            scope: "no-release",
          },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"],
        },
        preset: "angular",
        writerOpts: {
          commitsSort: ["subject", "scope"],
        },
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "docs/CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    // [
    //   "@semantic-release/exec",
    //   {
    //     prepareCmd: "sh ./scripts/update-version.sh ${nextRelease.version}",
    //   },
    // ],
    [
      "@semantic-release/git",
      {
        // assets: ["package.json", "pnpm-lock.yaml", "CHANGELOG.md", "dist"],
        assets: ["package.json", "pnpm-lock.yaml", "CHANGELOG.md"],
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: [
          { path: "dist.zip", label: "dist-${nextRelease.gitTag}" },
          { path: "CHANGELOG.md", label: "Changelog" },
        ],
      },
    ],
  ],
  publishConfig: {
    access: "restricted",
  },
};
