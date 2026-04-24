import multer from "multer";

// Configure multer to use in-memory storage.
// We process the PDF buffer directly without saving it to disk permanently.
const storage = multer.memoryStorage();

export const upload = multer({
     storage,
     fileFilter: (req, file, cb) => {
          if (file.mimetype === "application/pdf") {
               cb(null, true);
          } else {
               cb(new Error("Only PDF files are allowed"));
          }
     },
     limits: {
          fileSize: 10 * 1024 * 1024, // 10MB limit
     },
});
