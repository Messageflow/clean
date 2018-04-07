// @ts-check

export declare interface CleanOptions {
  gitConfig?: string;
  path?: string | string[];
  options?: DelOptions;
}

/** Import typings */
import { Options as DelOptions } from 'del';

/** Import project dependencies */
import del from 'del';
import { readFile } from 'fs';
import { promisify } from 'util';

export const IGNORE_PATH = [
  '.build/',
  '.DS_Store',
  '.esm-cache',
  '.nyc_output',
  '.tmp/',
  '.vscode',
  'npm-debug.log*',
  'yarn-error.log*',
  'coverage*/',
  'dist*/',
  'node_modules/',
  'test*/',
  '**/*.d.ts*',
  '**/*.js',
  '**/*.jsx',
  '!/gulpfile*.js',
  '!src/demo/*.*',
  '!src/json.d.ts',
  '!src/test*/',
];
/** NOTE: There are always files/ folders should not be deleted regardless. */
export const REGEX_FILES_NOT_IGNORE = /(\.git|\.env)/i;

async function readFrom(filePath: string, encoding: string) {
  return promisify(readFile)(filePath, encoding);
}

async function globsReducer(allPaths: string[], omitFilesRegExp: RegExp) {
  return allPaths.reduce((p, n) => {
    if (/^(#.+|$)/i.test(n) || omitFilesRegExp.test(n)) {
      return p;
    }

    return p.concat(n);
  }, []);
}

async function readGitConfig(gitConfig: string) {
  const configContent = await readFrom(gitConfig, 'utf-8');
  const globsFromContent = await globsReducer(
    configContent.split(/\r?\n/i),
    REGEX_FILES_NOT_IGNORE
  );

  return globsFromContent;
}

export async function clean({
  gitConfig,
  path,
  options = {},
} = {} as CleanOptions) {
  const config = {
    gitConfig: gitConfig == null ? './.gitignore' : gitConfig,
    path: path == null
      ? IGNORE_PATH
      : await globsReducer(
        (Array.isArray(path) ? path : [path]),
        REGEX_FILES_NOT_IGNORE
      ),
  };

  /** NOTE: opts[path] will override whatever specifies in opts[gitConfig] */
  return del(
    path == null
      ? await readGitConfig(config.gitConfig)
      : config.path,
    { ...options }
  );
}

export default clean;
