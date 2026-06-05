import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import {
     uploadDocument,
     getDocuments,
     deleteDocument,
} from "../controllers/documentController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = Router();

router.get("/", getDocuments);

router.delete("/:id", deleteDocument);

router.post(
     "/upload",
     (req: Request, res: Response, next: NextFunction) => {
          upload.single("document")(req, res, (err) => {
               if (err) {
                    res.status(400).json({ error: err.message });
                    return;
               }
               next();
          });
     },
     uploadDocument,
);

export default router;
