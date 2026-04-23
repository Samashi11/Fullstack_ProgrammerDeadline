import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";

const JWT_SECRET =
     process.env.JWT_SECRET || "default_secret_key_for_development_only";

export const register = async (req: Request, res: Response): Promise<void> => {
     try {
          const { email, password } = req.body;

          if (!email || !password) {
               res.status(400).json({
                    error: "Email and password are required",
               });
               return;
          }

          const saltRounds = 10;
          const passwordHash = await bcrypt.hash(password, saltRounds);

          const { data, error } = await supabase
               .from("users")
               .insert([{ email, password_hash: passwordHash }])
               .select("id, email, created_at")
               .single();

          if (error) {
               if (error.code === "23505") {
                    res.status(400).json({
                         error: "Email is already registered",
                    });
               } else {
                    res.status(400).json({ error: error.message });
               }
               return;
          }

          res.status(201).json({
               message: "User registered successfully",
               user: data,
          });
     } catch (error) {
          console.error("Registration error:", error);
          res.status(500).json({
               error: "Internal server error during registration",
          });
     }
};

export const login = async (req: Request, res: Response): Promise<void> => {
     try {
          const { email, password } = req.body;

          if (!email || !password) {
               res.status(400).json({
                    error: "Email and password are required",
               });
               return;
          }

          const { data: user, error } = await supabase
               .from("users")
               .select("id, email, password_hash")
               .eq("email", email)
               .single();

          if (error || !user) {
               res.status(401).json({ error: "Invalid login credentials" });
               return;
          }

          const isPasswordValid = await bcrypt.compare(
               password,
               user.password_hash,
          );
          if (!isPasswordValid) {
               res.status(401).json({ error: "Invalid login credentials" });
               return;
          }

          const payload = {
               id: user.id,
               email: user.email,
          };

          const access_token = jwt.sign(payload, JWT_SECRET, {
               expiresIn: "24h",
          });

          res.status(200).json({
               message: "Login successful",
               user: {
                    id: user.id,
                    email: user.email,
               },
               tokens: {
                    access_token,
               },
          });
     } catch (error) {
          console.error("Login error:", error);
          res.status(500).json({ error: "Internal server error during login" });
     }
};

export const me = async (req: Request, res: Response): Promise<void> => {
     try {
          const user = req.user;

          if (!user) {
               res.status(404).json({ error: "User profile not found" });
               return;
          }

          res.status(200).json({
               id: user.id,
               email: user.email,
          });
     } catch (error) {
          console.error("Me endpoint error:", error);
          res.status(500).json({
               error: "Internal server error while fetching profile",
          });
     }
};
