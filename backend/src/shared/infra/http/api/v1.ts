import express from "express";
import { userRouter } from "../../../../modules/users/infra/http/routes";
import { jwtVerifier } from "../utils/jwtVerifier";

const v1Router = express.Router();

v1Router.get("/", jwtVerifier, (req, res) => {
  res.send({ message: "I am alive man" });
});

v1Router.use("/users", userRouter);

export { v1Router };
