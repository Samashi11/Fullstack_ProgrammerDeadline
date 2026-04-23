import type { Request, Response } from "express";

export const uploadDocument = async (
     req: Request,
     res: Response,
): Promise<void> => {
     try {
          if (!req.file) {
               res.status(400).json({ error: "No PDF file provided" });
               return;
          }

          // Just validate the upload in this phase
          const fileBuffer = req.file.buffer;
          const fileName = req.file.originalname;
          const userId = req.user?.id; // from auth middleware

          res.status(200).json({
               message: "File uploaded successfully",
               document: {
                    fileName,
                    size: req.file.size,
                    userId,
               },
          });
     } catch (error) {
          console.error("Error processing document upload:", error);
          res.status(500).json({
               error: "Internal server error during upload",
          });
     }
};
