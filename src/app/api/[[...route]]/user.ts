import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
const app = new Hono()
  .get("/", (c) => {
    return c.json({
      user: "GET",
    });
  })
  .get("/:name", (c) => {
    const params = c.req.param();

    return c.json(
      {
        userName: params.name,
      },
      200
    );
  });

export default app;
