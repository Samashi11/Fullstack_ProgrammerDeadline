// @ts-ignore
import pdfParse from "pdf-parse/lib/pdf-parse.js";

/**
 * @param buffer
 * @returns
 */
export const extractTextFromBuffer = async (
     buffer: Buffer,
): Promise<string> => {
     try {
          const data = await pdfParse(buffer);
          return data.text.replace(/\s+/g, " ").trim();
     } catch (error) {
          console.error("Error extracting text from PDF:", error);
          throw new Error("Failed to extract text from PDF");
     }
};

/**
 * @param text
 * @param chunkSize
 * @param overlap
 * @returns
 */
export const chunkText = (
     text: string,
     chunkSize: number = 1000,
     overlap: number = 200,
): string[] => {
     if (!text || text.trim().length === 0) return [];

     const chunks: string[] = [];
     let i = 0;

     while (i < text.length) {
          let endIndex = i + chunkSize;

          if (endIndex < text.length) {
               const lastSpaceIndex = text.lastIndexOf(" ", endIndex);

               if (lastSpaceIndex > i + chunkSize / 2) {
                    endIndex = lastSpaceIndex;
               }
          }

          const chunk = text.substring(i, endIndex).trim();
          if (chunk) {
               chunks.push(chunk);
          }

          i = endIndex - overlap;

          if (i < 0 || endIndex - overlap <= i - (endIndex - i)) {
               i = endIndex;
          }
     }

     return chunks;
};
