import app from "./app";
import { connectDB } from "./shared/database/mongodb";
import { env } from "./config/env";

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server running on ${env.PORT}`);
  });
};

startServer();