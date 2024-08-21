import Redis from "ioredis";
import { authConfig, isProduction } from "../../../../config";

const port = authConfig.redisServerPort;
const host = authConfig.redisServerURL;
const redisConnection = isProduction
  ? new Redis(authConfig.redisConnectionString)
  : new Redis({
      port: port, // Redis port
      host: host, // Redis host
      username: "default", // needs Redis >= 6
      password: "my-top-secret",
      db: 0, // Defaults to 0
    });

redisConnection.on("connect", () => {
  console.log(`[Redis]: Connected to redis server at ${host}:${port}`);
});

export { redisConnection };
