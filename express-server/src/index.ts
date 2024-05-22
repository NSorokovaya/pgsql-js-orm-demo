import express from "express";

// controllers
import { postsRouter } from "./controllers/posts";
import { usersRouter } from "./controllers/users";

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000, () => {
  console.log("Server is listening...");
});
