// @ts-check

/** Import project dependencies */
import { readFile } from 'fs';
import { promisify } from 'util';

/** Setting up */
const readFrom = promisify(readFile);

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
