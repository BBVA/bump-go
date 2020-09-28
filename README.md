*CAVEAT EMPTOR*: This implementation has been abandoned in favor of the
["composite run
steps"](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-composite-run-steps-action)
one, on the `main` branch.

# Bump Go - TypeScript edition

See the [typescript-action](https://github.com/actions/typescript-action) template repo for context.

# Setup

## Install deps

``` bash
npm install
```

## Build, test & package

``` bash
npm run all
```

## Manual test

1. Ensure that the `go-version-path` exists:
``` bash
echo 1.0 > go-version
```
2. Run the action
``` console
env INPUT_GO-VERSION-FILEPATH=./go-version node dist/index.js
::debug::Bump Go version at 'go-version'
::debug::Fetching latest current Go version
::debug::currentGoVersion: 1.15.2
::set-output name=go-version::1.15.2
::set-output name=pr-title::Bump to latest current Go version 1.15.2
::set-output name=branch-name::bump-go/patch-1.15.2
```

# License

The scripts and documentation in this project are released under the [Apache
License 2.0](LICENSE).
