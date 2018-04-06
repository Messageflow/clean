// @ts-check

import path from 'path';
import { writeFile, mkdir } from 'fs';
import { promisify } from 'util';

import { del, readGitConfig } from '../../';

const writeTo = promisify(writeFile);
const writeDir = promisify(mkdir);
const ROOT = 'src/demo/.temp';
const TEMP_DIRS = [
  'demo',
  'dist',
  'node_modules',
  'test',
  'tests',
];
const TEMP_FILES = [
  'gulpfiles.js',
  'index.d.ts',
  'index.js',
  'json.d.ts',
  ...(
    Array.prototype.concat.apply(
      [],
      Array.from(
        Array(19),
        () => {
          const randName = Math.random().toString(16).slice(-7);

          return [
            `${randName}.js`,
            `${randName}.d.ts`,
          ];
        }
      )
    )
  ),
];

async function touchFiles(filePaths, root) {
  const writingFiles = TEMP_FILES.map(n => writeTo(`${path.resolve('.', root, n)}`, '# To be erased', { encoding: 'utf-8' }));
  // const writingFiles = filePaths.map(n => path.resolve('.', root, n));

  return writingFiles;
}

async function touchTempFilesDir(files, dirs, root) {
  return Promise.all([
    touchFiles(files, root),
  ]);
}

(async function main() {
  const gitConfig = './.gitignore';

  const d = await readGitConfig(gitConfig);
  const e = await del();
  const f = await touchTempFilesDir(TEMP_FILES, TEMP_DIRS, ROOT);

  console.log('#', d, e, f);
})();
