import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../db/db";
import { JWT_SECRET } from "../config";

// user signup
export const signup = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // check if user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userExists) {
      res.status(400).json({
        error: "User already exists",
      });
    }

    // create a new user if user doesn't exists

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
    });

    if (!user) {
      res.status(500).json({
        error: "Unable to create user",
      });
    }
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unexpected error" });
  }
};

// user login

export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // get user data
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
    } else {
      // validate user password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({ error: "Wrong Password" });
      }

      // create a jwt token
      const token = jwt.sign(
        // payload
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        // jwt secret key
        JWT_SECRET,
        // token expires in 24 hrs
        { expiresIn: 86400 }
      );

      res.status(200).json({
        token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unexpected error" });
  }
};
