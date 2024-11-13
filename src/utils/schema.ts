import { Request,Response,NextFunction } from 'express';
import { AnyZodObject, z } from 'zod';

// validation schemas

export const UserSchema = z.object({
    firstName: z.string().max(100),
    lastName: z.string().max(100),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    type:z.string()
});

export const jobSchema = z.object({
    title: z.string().max(100),
    description: z.string().max(500),
    status: z.string()
});


// validate function

export const validate = (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          ...req.body,
        });
        return next();
      } catch (error) {
        return res.status(400).json(error);
      }
  };