import createCachedSelector from 're-reselect';
import { FlatWeakMapCache } from '..';

it('FlatWeakMapCache integration with Re-reselect', () => {
  const users = {
    1: { id: 1 },
    2: { id: 2 },
    3: { id: 3 }
  };
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

  const order = [1, 2];
  // Cached selector behave like normal selectors:
  // 2 reselect selectors are created, called and cached
  const orderedUsers = getOrderedUsers(state, order);
  const otherOrderedUsers = getOrderedUsers(state, [1, 2, 3]);

  // This 3rd call hits the cache
  const orderedUsersAgain = getOrderedUsers(state, order);

  expect(orderedUsers).toBe(orderedUsersAgain);
  expect(orderedUsers).not.toEqual(otherOrderedUsers);
  expect(getOrderedUsers.recomputations()).toBe(2);
});
