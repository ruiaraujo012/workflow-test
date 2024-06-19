/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  repositoryUrl: "https://github.com/ruiaraujo012/workflow-test",
  tagFormat: "v${version}",
  branches: [
    "main",
    "next",
    {
      name: "dev",
      prerelease: true,
    },
    {
      name: "alpha",
      prerelease: true,
    },
    {
      name: "beta",
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
      "@semantic-release/exec",
      {
        verifyReleaseCmd:
          'echo "NEXT_RELEASE_VERSION=${nextRelease.version}" >> $GITHUB_ENV',
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
    [
      "@semantic-release/exec",
      {
        prepareCmd: "docker build -t fe:${nextRelease.gitTag} .",
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "docker save fe:${nextRelease.gitTag} | gzip > docker-image.tar.gz",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "pnpm-lock.yaml", "CHANGELOG.md"],
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: [
          { path: "dist.zip", label: "dist-${nextRelease.gitTag}" },
          {
            path: "docker-image.tar.gz",
            label: "docker-image-${nextRelease.gitTag}",
          },
        ],
      },
    ],
  ],
  publishConfig: {
    access: "restricted",
  },
};
