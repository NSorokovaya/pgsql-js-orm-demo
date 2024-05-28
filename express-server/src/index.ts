import express from "express";

// controllers
import { postsRouter } from "./controllers/posts";
import { usersRouter } from "./controllers/users";
import { commentsRouter } from "./controllers/comments";

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);

app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000, () => {
  console.log("Server is listening...");
});
