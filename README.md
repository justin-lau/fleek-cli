# ⚡️Fleek-Platform CLI

Fleek CLI provides a unified command line interface to Fleek Services.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

* [🤖 Install](#install)
* [👷‍♀️Development](#development)
* [🌴 Environments 🆕](#environments)
* [📖 Docs](#-documentation)
* [⏱️ Changelog](./CHANGELOG.md)

## Requirements

- Nodejs as runtime
- NPM, Yarn to install the CLI as a client, or PNPM for development
- Familiarity with text-based user interfaces, command-line interface (CLI)

Learn how to install Nodejs in your operating system by following the instructions [here](https://nodejs.org/en/download/package-manager/) and PNPM [here](https://pnpm.io/installation).

## Install

To install and use the CLI as a client or end-user, open your terminal and follow these simple steps. First, ensure you have Node.js installed on your system. If not, download and install it [here](https://nodejs.org/en/download). Next, run the following command to globally install our CLI tool:

```sh
# Install globally (recommended)
npm i -g @fleek-platform/cli
```

For a quick start, learn the [basic commands](#basic-commands), or alternatively visit our [documentation](https://fleek.xyz/docs)

## Development

For developers looking to contribute to the CLI tool itself, [clone](https://github.com/fleekxyz/cli) the repository and follow the [contribution guide](#contributing).

Once cloned, you'll have to set up the local development environment, e.g. to have access to the source-code, iterate, run tests and much more.

For runtime we utilize [Nodejs](https://nodejs.org/en/download) and [PNPM](https://pnpm.io/installation) as the package manager.

Next, install the project dependencies:

```sh
pnpm i
```

Next, prepare your local changes and execute the commands to compute it.

In order to succeed, you're required to have the ability to execute commands in the binary, so we'll link the local package globally in your local system, as follows:

```sh
pnpm link -g
```

Everytime you prepare and save a change, you have to rebuild the binary:

```sh
pnpm build
```

You can call the global binary named `fleek`.

```sh
fleek
```

Learn the Fleek-platform CLI basic commands [here](#basic-commands). For extended documentation visit our [documentation site](https://fleek.xyz/docs).

## Basic commands

The Fleek CLI command has the following structure:

```bash
fleek <service> <command> [options and parameters]
```

To view all available services and commands use:

```bash
fleek help
```

To see all available commands for a service, use the help documentation as any one of the followings:

```bash
fleek <service> help
fleek <service> <command> help
```

To get the version of the Fleek CLI:

```bash
fleek --version
```

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
