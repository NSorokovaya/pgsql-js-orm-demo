import { formatUser } from "../src/formatter";

describe("formatUser", () => {
  it("should return null if no user is provided", () => {
    expect(formatUser(null)).toBeNull();
  });

  it("should format a user object correctly", () => {
    const user = {
      id: 1,
      username: "testuser",
      user_roles: [
        {
          roles: {
            id: 1,
            title: "Admin",
            role_permissions: [
              { permissions: { id: 1, title: "Read" } },
              { permissions: { id: 2, title: "Write" } },
            ],
          },
        },
        {
          roles: {
            id: 2,
            title: "User",
            role_permissions: [{ permissions: { id: 3, title: "Execute" } }],
          },
        },
      ],
    };

    const formattedUser = formatUser(user);

    expect(formattedUser).toEqual({
      id: 1,
      username: "testuser",
      roles: [
        {
          id: 1,
          title: "Admin",
          permissions: [
            { id: 1, title: "Read" },
            { id: 2, title: "Write" },
          ],
        },
        {
          id: 2,
          title: "User",
          permissions: [{ id: 3, title: "Execute" }],
        },
      ],
    });
  });
});
