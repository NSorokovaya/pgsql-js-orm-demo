import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.DATABASE_URL_MONGO || "mongodb://localhost:27017";

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to " + mongoUri);
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed due to application termination");
  process.exit(0);
});

export default mongoose;
