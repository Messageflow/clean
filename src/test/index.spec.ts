// @ts-check

/** Import project dependencies */
import del from 'del';
import {
  clean,
  IGNORE_PATH,
} from '../';

jest.mock('del');

describe('@messageflow/clean', () => {
  function mockFn() {
    (del as any).mockImplementation(jest.fn((...args) => {
      return [
        'coverage',
        'dist',
        'index.d.ts',
        'index.js',
        'json.d.ts',
        'node_modules',
        'test',
      ];
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

  });
});
