# Re-reselect FlatWeakMapCache Object

Custom cache object to be used with Re-reselect. It utilizes a Weak Map so that both the cache key object and `selectorFn` can be garbage collected.

## Usage

```javascript
import createCachedSelector from 're-reselect';
import { FlatWeakMapCache } from 're-reselect-flat-weak-map-cache';

createCachedSelector()({
  // ...
  keySelector,
  cacheObject: new FlatWeakMapCache()
});
```

See [example](examples/example.js) for full usage.

## Motivation

By default, only allows `string` or `number` cache keys. It does provide a few custom cache objects that will allow any type as a cache key. These objects, like `FlatMapCache`, utilize a `Map`.

The downside with using a `Map` is that any object you use as a key and its associated `selectorFn` will not be garbage collected. Even if the object used as a key is no longer referenced in the application.

While this likely won't be an issue for most applications, the associated memory leaks could be a problem for memory intensive applications.

I've provided an [example](examples/example.js) to illustrate a use case you've probably seen in Redux applications.

To follow best practices, objects are treated as immutable: any change to an object should yield a new object, not mutate the original. If that object is used as a cache key, each iteration of the object will not be able to be garbage collected. And each `selectorFn` associated with that key will not be garbage collected.

Conversely, a weak map holds a weak reference to the key object. So if there are no other references to the object, it and its value will be garbage collected.

## TODO

- Publish to NPM
- Add another cache object that will handle a key that can be a primitive type as well ([weak maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) don't allow primitive types)
- This is my first NPM package, and I may not have followed best practices, so I plan to follow [this tutorial](http://dev.topheman.com/package-a-module-for-npm-in-commonjs-es2015-umd-with-babel-and-rollup/) to improve this package structure
- More descriptive errors when attempting to use a primitive type as a key

## References

- [Re-reselect](https://github.com/toomuchdesign/re-reselect/)
- [Re-reselect: Write Your Custom Cache Object](https://github.com/toomuchdesign/re-reselect/tree/master/src/cache#write-your-custom-cache-object)
