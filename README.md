<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">@messageflow/clean</h1>

  <p>Quick clean with del</p>
</div>

<hr />

[![NPM][nodei-badge]][nodei-url]

[![Version][version-badge]][version-url]
[![Downloads][downloads-badge]][downloads-url]
[![MIT License][mit-license-badge]][mit-license-url]
[![Code of Conduct][coc-badge]][coc-url]

[![Build Status][travis-badge]][travis-url]
[![Dependency Status][daviddm-badge]][daviddm-url]
[![NSP Status][nsp-badge]][nsp-url]
[![codecov][codecov-badge]][codecov-url]
[![Coverage Status][coveralls-badge]][coveralls-url]

[![codebeat-badge]][codebeat-url]
[![codacy-badge]][codacy-url]

> Yet another opinionated cleaning tool to reset a working directory by deleting files/ folders that are ignored by default via `.gitignore`.

## Table of contents

- [Pre-requisites](#pre-requisites)
- [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
    - [Node.js](#nodejs)
    - [Native ES modules or TypeScript](#native-es-modules-or-typescript)
- [API Reference](#api-reference)
  - [IGNORE_PATH](#ignorepath)
  - [clean([options])](#cleanoptions)
- [License](#license)

## Pre-requisites

- [Node.js][nodejs-url] >= 8.9.0
- [NPM][npm-url] >= 5.5.1 ([NPM][npm-url] comes with [Node.js][nodejs-url] so there is no need to install separately.)

## Setup

### Install

```sh
# Install via NPM
$ npm install --save @messageflow/clean
```

### Usage

#### Node.js

```js
const {
  clean,
  // IGNORE_PATH,
} = require('@messageflow/clean');

void async function main() {
  const d = await clean();

  console.log(d);
  // The output might vary as it depends on the files/ folders that have been actually deleted from your system.
  // [
  //   'coverage',
  //   'dist',
  //   'index.d.ts',
  //   'index.js',
  //   'json.d.ts',
  //   'node_modules',
  //   'test',
  // ]
}();
```

#### Native ES modules or TypeScript

```ts
// @ts-check

import {
  clean,
  // IGNORE_PATH,
} from '@messageflow/clean';

void async function main() {
  const d = await clean();

  console.log(d);
  // The output might vary as it depends on the files/ folders that have been actually deleted from your system.
  // [
  //   'coverage',
  //   'dist',
  //   'index.d.ts',
  //   'index.js',
  //   'json.d.ts',
  //   'node_modules',
  //   'test',
  // ]
}();
```

## API Reference

### IGNORE_PATH

```sh
.build/,
.DS_Store,
.esm-cache,
.nyc_output,
.tmp/,
.vscode,
npm-debug.log*,
yarn-error.log*,
coverage*/,
dist*/,
node_modules/,
test*/,
**/*.d.ts*,
**/*.js,
**/*.jsx,
!/gulpfile*.js,
!src/demo/*.*,
!src/json.d.ts,
!src/test*/,
```

___

### clean([options])

- `options` <[Object][object-mdn-url]> Optional configuration to delete files/ folders.
  - `gitConfig` <[string][string-mdn-url]> Optional path to `.gitignore`. Defaults to `./.gitignore`.
  - `path` <[string][string-mdn-url]|[string][string-mdn-url][]> Optional glob pattern(s) to delete files/ folders. Defaults to [IGNORE_PATH][ignore-path-url].
  - `options` <[Object][object-mdn-url]> Optional configuration from the [NPM][npm-url] package [del][del-url]. See [del options][del-options-url].
- returns: <[Promise][promise-mdn-url]&lt;[string][string-mdn-url][]&gt;> Promise which resolves with a list of deleted files/ folders.

## License

[MIT License](https://Messageflow.mit-license.org/) © Rong Sen Ng

<!-- References -->
[typescript-url]: https://github.com/Microsoft/TypeScript
[nodejs-url]: https://nodejs.org
[npm-url]: https://www.npmjs.com
[node-releases-url]: https://nodejs.org/en/download/releases

[ignore-path-url]: #ignore_path
[del-url]: https://github.com/sindresorhus/del
[del-options-url]: https://github.com/sindresorhus/del#options

[array-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[boolean-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[function-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[map-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[regexp-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[set-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

<!-- Badges -->
[nodei-badge]: https://nodei.co/npm/@messageflow/clean.png?downloads=true&downloadRank=true&stars=true

[version-badge]: https://img.shields.io/npm/v/@messageflow/clean.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/@messageflow/clean.svg?style=flat-square
[mit-license-badge]: https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square

[travis-badge]: https://img.shields.io/travis/Messageflow/clean.svg?style=flat-square
[daviddm-badge]: https://img.shields.io/david/Messageflow/clean.svg?style=flat-square
[nsp-badge]: https://nodesecurity.io/orgs/messageflow/projects/37832a5a-3b51-442f-b23d-fb6a59046db3/badge?style=flat-square
[codecov-badge]: https://codecov.io/gh/Messageflow/clean/branch/master/graph/badge.svg?style=flat-square
[coveralls-badge]: https://coveralls.io/repos/github/Messageflow/clean/badge.svg?branch=master&style=flat-square

[codebeat-badge]: https://codebeat.co/badges/b4443a81-61e2-479d-92a1-f0a3e2ed97d5?style=flat-square
[codacy-badge]: https://api.codacy.com/project/badge/Grade/a2f6cfcd9bc140488174a2b82c6873f6?style=flat-square

<!-- Links -->
[nodei-url]: https://nodei.co/npm/@messageflow/clean

[version-url]: https://www.npmjs.com/package/@messageflow/clean
[downloads-url]: http://www.npmtrends.com/@messageflow/clean
[mit-license-url]: https://github.com/Messageflow/clean/blob/master/LICENSE
[coc-url]: https://github.com/Messageflow/clean/blob/master/CODE_OF_CONDUCT.md

[travis-url]: https://travis-ci.org/Messageflow/clean
[daviddm-url]: https://david-dm.org/Messageflow/clean
[nsp-url]: https://nodesecurity.io/orgs/messageflow/projects/37832a5a-3b51-442f-b23d-fb6a59046db3
[codecov-url]: https://codecov.io/gh/Messageflow/clean
[coveralls-url]: https://coveralls.io/github/Messageflow/clean?branch=master

[codebeat-url]: https://codebeat.co/projects/github-com-messageflow-clean-master
[codacy-url]: https://www.codacy.com/app/motss/clean?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Messageflow/clean&amp;utm_campaign=Badge_Grade
