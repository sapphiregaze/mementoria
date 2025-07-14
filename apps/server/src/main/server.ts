import "dotenv/config";
import Fastify from "fastify";

import { logger } from "./lib/logger.js";

const fastify = Fastify({
  logger: true,
});

fastify.get("/health", async (_, reply) => {
  reply.status(200).send({ status: "UP", timestamp: new Date().toISOString() });
});

fastify
  .listen({ port: Number(process.env.PORT), host: "0.0.0.0" })
  .then(async () => {
    logger.info(`server is listening on port ${process.env.PORT}...`);
  });
