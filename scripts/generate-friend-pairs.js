const path = require("node:path");
const fs = require("node:fs/promises");
const { client } = require("./client");
const generateUniqueFriendsFunction = require("./utils/generate-unique-friends-function");
const users = require("./utils/mock-users");

(async () => {
  try {
    await client.connect();

    const friendPairs = generateUniqueFriendsFunction(users);

    console.log(friendPairs.length);

    const result = friendPairs
      .map(
        (pair) =>
          `INSERT INTO friends (requester_id, receiver_id) VALUES('${pair[0]}', '${pair[1]}');\n`
      )
      .join("");

    await fs.writeFile(
      path.join(__dirname, "./sql/generate-friend-pairs.sql"),
      result
    );
  } finally {
    await client.end();
  }
  // 1. select all users
  // 2. generate random friends pairs betweens users
  // 2.1. each user should have min 5 friends
  // 2.2. user can't friends with himself
  // 2.3. friend pairs should be unique

  console.log("hello");
})();
