import { FlatWeakMapCache } from '..';

if (!(global && global.gc)) {
  throw new Error(
    'Test unable to execute. Ensure the `--expose-gc` flag is included when running jest.'
  );
}

/**
 * Re-reselect cache basic behavior tests
 * @see https://github.com/toomuchdesign/re-reselect/blob/master/src/cache/__util__/testBasicBehavior.js
 */
describe('Cache basic behavior', () => {
  it('returns cached value', () => {
    const cache = new FlatWeakMapCache();
    const key = {};
    const selectorFn = () => {};

    cache.set(key, selectorFn);
    const result = cache.get(key);

    expect(result).toBe(selectorFn);
  });

  it('removes a single item', () => {
    const cache = new FlatWeakMapCache();
    const entries = [{}, {}, {}, {}, {}];
    entries.forEach(entry => cache.set(entry, entry));

    cache.remove(entries[2]);

    expect(cache.get(entries[2])).toBe(undefined);
    entries
      .filter((_, i) => i !== 2)
      .forEach(entry => {
        expect(cache.get(entry)).toBe(entry);
      });
  });

  it('clears the cache', () => {
    const cache = new FlatWeakMapCache();
    const entries = [{}, {}, {}, {}, {}];
    entries.forEach(entry => cache.set(entry, entry));

    cache.clear();

    entries.forEach(entry => {
      expect(cache.get(entry)).toBe(undefined);
    });
  });
});

/**
 * Re-reselect cache key tests
 * @see https://github.com/toomuchdesign/re-reselect/blob/master/src/cache/__util__/testMapCacheKeyBehavior.js
 */
describe('Cache key', () => {
  const testCacheKey = key => {
    const cache = new FlatWeakMapCache();
    const selectorFn = () => {};
    cache.set(key, selectorFn);
    expect(cache.get(key)).toBe(selectorFn);
  };

  const testInvalidCacheKey = key => {
    const cache = new FlatWeakMapCache();
    const selectorFn = () => {};
    expect(() => cache.set(key, selectorFn)).toThrow();
  };

  it('objects work as cache key', () => {
    const key = {};
    testCacheKey(key);
  });

  it('functions work as cache key', () => {
    const key = () => {};
    testCacheKey(key);
  });

  it('null does not work as cache key', () => {
    const key = null;
    testInvalidCacheKey(key);
  });

  it('undefined works as cache key', () => {
    const key = undefined;
    testInvalidCacheKey(key);
  });

  it('string works as cache key', () => {
    const key = 'key';
    testInvalidCacheKey(key);
  });

  it('number works as cache key', () => {
    const key = 42;
    testInvalidCacheKey(key);
  });

  it('boolean works as cache key', () => {
    const key = true;
    testInvalidCacheKey(key);
  });

  it('symbol works as cache key', () => {
    const key = Symbol();
    testInvalidCacheKey(key);
  });
});
