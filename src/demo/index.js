// @ts-check

import del from 'del';
import glob from 'glob';
import path from 'path';
import { writeFile, mkdir } from 'fs';
import { promisify } from 'util';

import { clean, readGitConfig } from '../../';

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

async function touchTempDir(tempPath) {
  return tryTouchDir(tempPath);
}

async function tryTouchDir(dirPath, mode) {
  try {
    await writeDir(dirPath, mode);

    return dirPath;
  } catch (e) {
    // console.debug('ERRDIR_EXIST', e);

    return dirPath;
  }
}

async function tryTouchFile(filePath, data, options) {
  try {
    await writeTo(filePath, data, options);

    return filePath;
  } catch (e) {
    // console.debug('ERRFILE_EXIST', e);

    return filePath;
  }
}

async function touchDirs(dirPaths, root) {
  return Promise.all(dirPaths.map(async n => tryTouchDir(path.resolve('.', root, n))));
}

async function touchFiles(filePaths, root) {
  return Promise.all(filePaths.map(async n => tryTouchFile(path.resolve('.', root, n), '# To be erased', { encoding: 'utf-8' })));
}

async function touchTempFilesDir(files, dirs, root) {
  await del(root);
  await touchTempDir(root);

  return [
    await touchFiles(files, root),
    await touchDirs(dirs, root),
  ];
}

(async function main() {
  // const gitConfig = path.resolve('src/demo', './.gitignore');
  const gitConfig = path.resolve('.', './.gitignore');

  // const d = await readGitConfig(gitConfig);
  // const e = await touchTempFilesDir(TEMP_FILES, TEMP_DIRS, ROOT);

  console.debug('Ready to delete in 10s...');
  await new Promise(yay => setTimeout(yay, 10e3));

  const f = await clean({
    gitConfig,
    options: {
      dryRun: true,
      // force: true,
    },
  });

  // console.log('1', d);
  // console.log('2', e);
  console.log('3', f);
})();
