import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import "dotenv/config";
import AutoLoad from "@fastify/autoload";
import fastifyCors from "@fastify/cors";

import { fastify } from "./lib/fastify.js";
import { logger } from "./lib/logger.js";
import { prisma } from "./lib/prisma.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fastify.register(AutoLoad, {
  dir: path.join(__dirname, "routes"),
});

fastify.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

fastify
  .listen({ port: Number(process.env.PORT), host: "localhost" })
  .then(async () => {
    prisma
      .$connect()
      .then(() => {
        logger.info("database connection successful");
        prisma.$disconnect();
      })
      .catch((err) => logger.error(`failed to connect to database: ${err}`));
    logger.info(
      `server is listening on http://localhost:${process.env.PORT}...`,
    );
  })
  .catch((err: Error) => {
    logger.error(`failed to start fastify server: ${err}`);
  });
