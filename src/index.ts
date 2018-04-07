// @ts-check

export declare interface DelParams {
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
export const REGEX_FILES_NOT_IGNORE = /(\.git|\.env)/i;

export async function readFrom(path: string, encoding: string) {
  return promisify(readFile)(path, encoding);
}

export async function readGitConfig(gitConfig: string) {
  const configContent = await readFrom(gitConfig, 'utf-8');
  const globsFromContent = configContent.split(/\r?\n/i).reduce((p, n) => {
    if (/^(#.+|$)/i.test(n)) {
      return p;
    }

    return p.concat(n);
  }, []);

  return globsFromContent;
}

export async function clean({
  gitConfig,
  path,
  options = {},
} = {} as DelParams) {
  const config = {
    gitConfig: gitConfig == null ? './.gitignore' : gitConfig,
    path: path == null ? IGNORE_PATH : (Array.isArray(path) ? path : [path]),
  };

  /** NOTE: Path will override whatever specifies in a given .gitignore */
  return del(
    path == null ? await readGitConfig(config.gitConfig) : path,
    { ...options }
  );
}

export default clean;
