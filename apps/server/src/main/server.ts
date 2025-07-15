import "dotenv/config";
import fastifyCors from "@fastify/cors";
import Fastify from "fastify";

import { auth } from "./lib/auth.js";
import { logger } from "./lib/logger.js";
import prisma from "./lib/prisma.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

fastify.get("/health", async (_, reply) => {
  reply.status(200).send({ status: "UP", timestamp: new Date().toISOString() });
});

fastify.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);

      const headers = new Headers();
      for (const [key, value] of Object.entries(request.headers)) {
        if (value) headers.append(key, value.toString());
      }

      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
      });

      const response = await auth.handler(req);

      reply.status(response.status);
      response.headers.forEach((value, key) => reply.header(key, value));
      reply.send(response.body ? await response.text() : null);
    } catch (error) {
      fastify.log.error("Authentication Error:", error);
      reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE",
      });
    }
  },
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
