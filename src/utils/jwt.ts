// middleware to validate token
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authentication");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  jwt.verify(token, JWT_SECRET, function (err, verified) {
    if (err) return res.status(500).json({ error: "Authentication error" });

    next();
  });
};

export default verifyToken;
