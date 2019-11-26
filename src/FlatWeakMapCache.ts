import { ICacheObject } from 're-reselect';

export default class FlatWeakMapCache implements ICacheObject {
  private _cache: WeakMap<object, any>;

  constructor() {
    this._cache = new WeakMap();
  }
  set(key: object, selectorFn) {
    this._cache.set(key, selectorFn);
  }
  get(key: object) {
    return this._cache.get(key);
  }
  remove(key: object) {
    this._cache.delete(key);
  }
  clear() {
    this._cache = new WeakMap();
  }
}
