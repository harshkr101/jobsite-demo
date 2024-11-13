import { login, signup } from "../controllers/auth";
import express from "express";
import { loginSchema, UserSchema, validate } from "../utils/schema";

const router = express.Router();

router.post(
  "/auth/signup",
  validate(UserSchema) as express.RequestHandler,
  signup as express.RequestHandler
);

router.post(
  "/auth/login",
  validate(loginSchema) as express.RequestHandler,
  login as express.RequestHandler
);

export default router;
