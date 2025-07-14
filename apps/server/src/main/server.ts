import "dotenv/config";
import Fastify from "fastify";

import { logger } from "./lib/logger.js";
import prisma from "./lib/prisma.js";

const fastify = Fastify({
  logger: true,
});

fastify.get("/health", async (_, reply) => {
  reply.status(200).send({ status: "UP", timestamp: new Date().toISOString() });
});

fastify
  .listen({ port: Number(process.env.PORT), host: "0.0.0.0" })
  .then(async () => {
    prisma
      .$connect()
      .then(() => {
        logger.info("database connection successful");
        prisma.$disconnect();
      })
      .catch((err) => logger.error(`failed to connect to database: ${err}`));
    logger.info(`server is listening on http://0.0.0.0:${process.env.PORT}...`);
  })
  .catch((err: Error) => {
    logger.error(`failed to start fastify server: ${err}`);
  });
