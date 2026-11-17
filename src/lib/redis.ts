import { createClient } from "redis";
import config from "../config";

export const redisClient = createClient({
  username: config.redis_user || undefined,
  password: config.redis_password || undefined,
  socket: {
    host: config.redis_host || "localhost",
    port: Number(config.redis_port) || 6379,
    connectTimeout: 2000,
    reconnectStrategy: false,
  },
});

redisClient.on("error", (err) => {
  // Silent fallback when Redis is not reachable
});

export const connectRedis = async () => {
  if (
    !redisClient.isOpen &&
    config.redis_host &&
    config.redis_host !== "localhost" &&
    config.redis_host.trim() !== ""
  ) {
    try {
      await redisClient.connect();
      console.log("Redis Connected Successfully");
    } catch (error) {
      console.warn("Redis connection skipped:", error);
    }
  }
};
