import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET =
     process.env.JWT_SECRET || "default_secret_key_for_development_only";

declare global {
     namespace Express {
          interface Request {
               user?: any;
          }
     }
}

export const verifyAuth = async (
     req: Request,
     res: Response,
     next: NextFunction,
): Promise<void> => {
     try {
          const authHeader = req.headers.authorization;

          if (!authHeader || !authHeader.startsWith("Bearer ")) {
               res.status(401).json({
                    error: "Missing or invalid Authorization header",
               });
               return;
          }

          const token = authHeader.split(" ")[1];
          if (!token) {
               res.status(401).json({ error: "Token not found" });
               return;
          }

          jwt.verify(token, JWT_SECRET, (err, decoded) => {
               if (err) {
                    res.status(401).json({ error: "Invalid or expired token" });
                    return;
               }

               req.user = decoded;
               next();
          });
     } catch (error) {
          console.error("Auth middleware error:", error);
          res.status(500).json({
               error: "Internal server error during authentication",
          });
     }
};
