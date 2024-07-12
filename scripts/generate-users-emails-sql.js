const path = require("node:path");
const fs = require("node:fs/promises");

const { faker } = require("@faker-js/faker");

const { client } = require("./client");

(async () => {
  try {
    await client.connect();

    const users = await client.query(`select * from users`);
    const result = users.rows
      .map(
        (user) =>
          `insert into users_emails (user_id, email) values('${
            user.id
          }', '${faker.internet.email()}');\n`
      )
      .join("");

    await fs.writeFile(
      path.join(__dirname, "./sql/generate-users-emails.sql"),
      result
    );
  } finally {
    await client.end();
  }
})();
