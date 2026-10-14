# Releasing

A release is one annotated `v<version>` tag. Pushing it runs the
[release workflow](.github/workflows/release.yml), which checks the tag, runs
the tests, packages the extension and publishes a GitHub Release whose notes
are the tag's annotation and whose single asset is the `.vsix`.

## Steps

1. Bump `version` in `package.json` and commit.
2. Write the release notes to a file (shape below, [Release
   notes](#release-notes)), then tag `v<version>` with that file and push:

   ```
   git tag -a v<version> --cleanup=verbatim -F <notes-file>
   git push origin v<version>
   ```

The workflow's `build` job **fails on purpose**, before `npm ci`, if the pushed
tag is not `v<package.json version>`, is lightweight, lacks either heading, or
has nothing under `## What's new`. Bumping the manifest, writing the notes and
tagging are one gesture, not three. There is no manual trigger: a release
without a tag has nothing to publish its notes from.

## The asset

Every release carries exactly one asset, named by `vsce`'s default:

```
devcontainer-sandbox-<version>.vsix
https://github.com/meitogi/vscode-devcontainer-sandbox/releases/download/v<version>/devcontainer-sandbox-<version>.vsix
```

The [Sandbox image](https://github.com/meitogi/devcontainer-sandbox) installs
the extension from that URL at a pinned version, so the name is a contract:
renaming the package (`name` in `package.json`) breaks the image build.

The `.vsix` is packaged in the `build` job, which holds a read-only token, and
handed to the `release` job as a workflow artifact. Only `release` can write,
and it runs no npm code.

## Release notes

Same format as the image repository's
[RELEASING.md, "Release notes"](https://github.com/meitogi/devcontainer-sandbox/blob/main/RELEASING.md#release-notes).
The notes live in **one place: the annotated tag**. The workflow publishes them
with `gh release create --notes-from-tag`, and the extension itself reads that
release to show its two-tab notes panel. This repository is public: everything
is in English.

The shape is fixed — three parts, in this order:

1. **One subject line**: `v<version> — <headline>`. It becomes the release
   title (the workflow passes `%(contents:subject)` to `--title`).
2. **`## What's new`** — what someone using the extension sees or can do that
   they could not before. Relaxed tone, short bullets, no file names. **Never
   empty**: a release with nothing user-visible writes the one fixed line
   "Nothing user-visible — maintenance."
3. **`## Technical`** — what moved and why, the paths, the measurements.

Both headings are exact — `## What's new` and `## Technical`, alone on their
line.

`--cleanup=verbatim` is not optional. git's default cleanup (`strip`) treats
every line starting with `#` as a comment and drops it silently, so a plain
`git tag -a -F` keeps the bullets, loses both headings, and fails the check.

From a graphical client (Fork, or any GUI that runs `git tag -a -m`), set once
per clone `git config core.commentChar ';'` — git then no longer treats `#`
lines as comments and the headings survive. Paste the notes file as the tag
message, push the tag, and CI does the rest.

Example:

```
v0.2.0 — the activity bar shows which patchers you run

## What's new

- A Sandbox icon in the activity bar lists the patcher version applied in
  this container, with a badge when a newer one exists.

## Technical

New view `devcontainerSandbox.patches`, fed by `ext-patches-sync --status`;
no network call at activation.
```
