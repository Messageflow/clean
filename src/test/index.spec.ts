// @ts-check

/** Import project dependencies */
import del from 'del';
import util from 'util';
import {
  clean,
  IGNORE_PATH,
} from '../';

jest.mock('del');
jest.mock('util');

describe('@messageflow/clean', () => {
  function mockFn() {
    (del as any).mockImplementation(jest.fn((...args) => {
      switch (Array.isArray(args[0]) ? args[0].join('\n') : args[0]) {
        case '**/src/demo/.temp/index.js\n**/src/demo/.temp/index.d.ts':
        case '**/src/demo/.temp/*.js\n**/src/demo/.temp/*.d.ts': {
          return [
            './src/demo/.temp/index.js',
            './src/demo/.temp/index.d.ts',
          ];
        }
        case '**/src/demo/.temp/*.js': {
          return [
            './src/demo/.temp/index.js',
          ];
        }
        default: {
          return [
            'coverage',
            'dist',
            'index.d.ts',
            'index.js',
            'json.d.ts',
            'node_modules',
            'test',
          ];
        }
      }
    }));

    (util as any).promisify = () => jest.fn((...args) => {
      switch (args[0]) {
        case './src/demo/.temp/.gitignore' : {
          return '# files\n**/src/demo/.temp/index.js\n**/src/demo/.temp/index.d.ts';
        }
        case './src/demo/.gitignore' : {
          return '# files\n**/src/demo/.temp/*.js\n**/src/demo/.temp/*.d.ts';
        }
        default: {
          return [...IGNORE_PATH].join('\n');
        }
      }
    });
  }

  describe('ok', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      mockFn();
    });

    test('[function clean] works', async () => {
      const d = await clean();

      expect(del).toHaveBeenCalledTimes(1);
      expect(del).toHaveBeenCalledWith([...IGNORE_PATH], {});
      expect(d).toEqual([
        'coverage',
        'dist',
        'index.d.ts',
        'index.js',
        'json.d.ts',
        'node_modules',
        'test',
      ]);
    });

    test('[function clean] works with defined opts[options]', async () => {
      const d = await clean({
        options: {
          dryRun: true,
          force: true,
        },
      });

      expect(del).toHaveBeenCalledTimes(1);
      expect(del).toHaveBeenCalledWith([...IGNORE_PATH], {
        dryRun: true,
        force: true,
      });
      expect(d).toEqual([
        'coverage',
        'dist',
        'index.d.ts',
        'index.js',
        'json.d.ts',
        'node_modules',
        'test',
      ]);
    });

    test('[function clean] works with defined opts[gitConfig]', async () => {
      const d = await clean({
        gitConfig: './src/demo/.temp/.gitignore',
      });

      expect(del).toHaveBeenCalledTimes(1);
      expect(del).toHaveBeenCalledWith([
        '**/src/demo/.temp/index.js',
        '**/src/demo/.temp/index.d.ts',
      ], {});
      expect(d).toEqual([
        './src/demo/.temp/index.js',
        './src/demo/.temp/index.d.ts',
      ]);
    });

    test('[function clean] works with defined opts[path] in string', async () => {
      const d = await clean({
        path: '**/src/demo/.temp/*.js',
      });

      expect(del).toHaveBeenCalledTimes(1);
      expect(del).toHaveBeenCalledWith('**/src/demo/.temp/*.js', {});
      expect(d).toEqual([
        './src/demo/.temp/index.js',
      ]);
    });

    test('[function clean] works with defined opts[path] in string array', async () => {
      const d = await clean({
        path: [
          '**/src/demo/.temp/*.js',
          '**/src/demo/.temp/*.d.ts',
        ],
      });

      expect(del).toHaveBeenCalledTimes(1);
      expect(del).toHaveBeenCalledWith([
        '**/src/demo/.temp/*.js',
        '**/src/demo/.temp/*.d.ts',
      ], {});
      expect(d).toEqual([
        './src/demo/.temp/index.js',
        './src/demo/.temp/index.d.ts',
      ]);
    });

    test(
      // tslint:disable-next-line:max-line-length
      '[function clean] works with defined opts[path] and opts[gitConfig] but opts[path] always wins over',
      async () => {
        const d = await clean({
          gitConfig: './src/demo/.gitignore',
          path: '**/src/demo/.temp/*.js',
        });

        expect(del).toHaveBeenCalledTimes(1);
        expect(del).toHaveBeenCalledWith('**/src/demo/.temp/*.js', {});
        expect(d).toEqual([
          './src/demo/.temp/index.js',
        ]);
      }
    );

  });
});
