<!---
Copyright 2020 Banco Bilbao Vizcaya Argentaria, S.A.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

[![test](https://github.com/BBVA/bump-go/workflows/test/badge.svg?branch=main)](https://github.com/BBVA/bump-go/actions)

# Bump Go

This action bumps the [Go](https://go.dev) version used by your project.

- The Go project [only supports the last two major releases
  ](https://golang.org/doc/devel/release.html#policy) (which we'll refer to as
  *current* and *previous*).  This action will select the most recent *current*
  Go version, while politely ignoring the *previous* one.
- The Go version used by your project must be stored in a file by itself, e.g:
  `.github/versions/go`.
- You can
  [combine](#Automatic-pull-request-leveraging-peter-evanscreate-pull-request)
  this action with
  [peter-evans/create-pull-request](https://github.com/peter-evans/create-pull-request)
  to automatically create a pull request with the updated Go version.
- This action is implemented as a [composite run steps
  action](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/about-actions#composite-run-steps-actions).

# Usage

## Interface

See [action.yml](action.yml) for the gory details.

### Inputs

| Name                | Description                                                              | Default             |
|---------------------|--------------------------------------------------------------------------|---------------------|
| go-version-filepath | Path to the file that contains the Go version used to build your project | .github/versions/go |

### Outputs

| Name       | Description                                                  |
|------------|--------------------------------------------------------------|
| go-version | Go version after the bump (Most recent *current* Go version) |

## Reading the Go version from a file

This action assumes that the Go version used to build and/or test your project
is specified in a file (pointed to by `go-version-filepath`).

You can easily accomplish this:

``` yaml
steps:
 - uses: actions/checkout@v2

 - name: Read Go version from file
   id: go-version
   run: |
      $go_version_filepath=.github/versions/go
      echo ::set-output name=go-version::$(< $go_version_filepath)

 - uses: actions/setup-go@v2
   with:
     go-version: ${{ steps.go-version.outputs.go-version }}
# ...
# <steps to build your project>
# ...
```

## Automatic pull request leveraging [peter-evans/create-pull-request](https://github.com/peter-evans/create-pull-request)
``` yaml
name: Ensure Go is up-to-date
on:
  schedule:
    - cron: 42 5 * * *
  push:
    branches:
      - main
jobs:
  bump-go:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Ensure Go is up-to-date
        id: bump-go
        uses: BBVA/bump-go@main
        with:
          go-version-path: .github/versions/go

      - name: Create pull request
        uses: peter-evans/create-pull-request@v3
        with:
          author: GitHub <noreply@github.com>
          title: Bump Go version
          commit-message: "chore: bump Go version to ${{ steps.bump-go.outputs.go-version }}"
          branch: bump-go/patch
          delete-branch: true
```

# License

The scripts and documentation in this project are released under the [Apache
License 2.0](LICENSE).
