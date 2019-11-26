const createCachedSelector = require('re-reselect').default;
const FlatWeakMapCache = require('../lib/FlatWeakMapCache').default;

const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((acc, id) => {
  acc[id] = { id };
  return acc;
}, {});
const state = { users };

const getUsers = state => state.users;

const getOrderedUsers = createCachedSelector(
  getUsers,
  (_state_, order) => order,
  (users, order) => order.map(uId => users[uId])
)({
  keySelector: (_state_, order) => order,
  cacheObject: new FlatWeakMapCache()
});

// Call cache selector with different instances of the array,
// allowing each to be garbage collected
let order = [1, 2];
const orderedUsers1 = getOrderedUsers(state, order);
order = [...order, 3, 4];
const orderedUsers2 = getOrderedUsers(state, order);
order = [...order, 5, 6];
const orderedUsers3 = getOrderedUsers(state, order);
order = [...order, 7, 8];
const orderedUsers4 = getOrderedUsers(state, order);
order = [...order, 9, 10];
const orderedUsers5 = getOrderedUsers(state, order);

// After 5th invocation of the selector, there are
// 5 entries in the cache (1 for each array instance)

// Dereference `order` by setting it to null.
// Garbage collect arrays no longer referenced.
order = null;
global.gc();

// 0 entries in cache after garbage collection

const orderedUsersAgain = getOrderedUsers(state, [1, 2]);

// 1 entry in cache after another invocation
