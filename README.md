# Devcontainer Sandbox

A VS Code extension for [Sandbox devcontainers](https://github.com/meitogi/devcontainer-sandbox):
see, update and roll back the two moving parts of the container — the Claude
Code extension patchers and the base image — from an activity-bar view, with
the release notes of every version.

**Status: pre-release.** This version only activates and logs to the
"Devcontainer Sandbox" output channel; the features land in the next releases.

It runs on either side (`extensionKind: ["workspace", "ui"]`): inside the
container it manages patchers and image, on the host it will offer to set up a
devcontainer in a folder that has none.

## Build

```
npm ci
npm test
npm run package
```

`npm test` compiles with `tsc` and runs `test/*.test.ts` with `node --test`.
`npm run package` writes `devcontainer-sandbox-<version>.vsix`.

Releases are cut from annotated tags — see [RELEASING.md](RELEASING.md).

## License

[MIT](LICENSE)
