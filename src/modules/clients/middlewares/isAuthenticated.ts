import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ error: 'Token not provided' }).end();

  const [, token] = authorization.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    req.client_id = sub;
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
