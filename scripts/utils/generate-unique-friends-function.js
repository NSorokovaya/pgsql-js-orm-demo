module.exports = (users) => {
  let friendPairs = [];

  for (const user of users) {
    const userId = user.id;

    for (let i = 0; i < users.length; i++) {
      const randomFriend = users[i];
      if (
        randomFriend.id !== userId &&
        !friendPairs.some(
          (pair) => pair.includes(randomFriend.id) && pair.includes(userId)
        )
      ) {
        friendPairs.push([userId, randomFriend.id]);
      }
    }
  }

  return friendPairs;
};
