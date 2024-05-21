# ⚡️Fleek-Platform CLI

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

Fleek CLI provides a unified command line interface to Fleek Services.

## Details

### Stack

- [NodeJS](https://nodejs.org) as runtime environment.
- [Commander.js](https://github.com/tj/commander.js) as CLI creation tool.
- [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting.
- [Esbuild](https://esbuild.github.io/) for files bundling.

## Basic commands

The Fleek CLI command has the following structure:

```bash
$ fleek <service> <command> [options and parameters]
```

To view all available services and commands use:

```bash
$ fleek help
```

To see all available commands for a service, use the help documentation as any one of the followings:

```bash
$ fleek <service> help
$ fleek <service> <command> help
```

To get the version of the Fleek CLI:

```bash
$ fleek --version
```

## Development

1. Install NodeJS from [the official website](https://nodejs.org) or using [nvm](https://github.com/creationix/nvm).
2. Install [pnpm](https://pnpm.io/installation) dependency manager.
3. Install dependencies usign `pnpm i` from root path.
4. Prepare your changes.
5. `pnpm link -g`, `pnpm build`, `fleek -v` and happy testing!

## Contributing

This section guides you through the process of contributing to our open-source project. From creating a feature branch to submitting a pull request, get started by:

1. Fork the project [here](https://github.com/fleekxyz/cli)
2. Create your feature branch using our [branching strategy](#branching-strategy): `git checkout -b feat/my-new-feature`
3. Run the tests: `pnpm test`
4. Commit your changes: `git commit -m 'chore: 🤖 my contribution description'`
5. Push to the branch: `git push origin feat/my-new-feature`
6. Create new Pull Request following the corresponding template guidelines

## Branching strategy

The develop branch serves as the main integration branch for features, enhancements, and fixes. It is always in a deployable state and represents the latest development version of the application.

Feature branches are created from the develop branch and are used to develop new features or enhancements. They should be named according to the type of work being done and the scope of the feature and in accordance with conventional commits [here](https://www.conventionalcommits.org/en/v1.0.0/).

Here's an example:

```txt
test: 💍 Adding missing tests
feat: 🎸 A new feature
fix: 🐛 A bug fix
chore: 🤖 Build process or auxiliary tool changes
docs: ✏️ Documentation only changes
refactor: 💡 A code change that neither fixes a bug or adds a feature
style: 💄 Markup, white-space, formatting, missing semi-colons...
```
