import type { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", async (_, reply) => {
    reply
      .status(200)
      .send({ status: "UP", timestamp: new Date().toISOString() });
  });
}
