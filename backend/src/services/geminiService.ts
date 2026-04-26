import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

if (!apiKey) {
     console.warn(
          "⚠️ Peringatan: Variabel GEMINI_API_KEY tidak ditemukan di .env. Embedding tidak akan berfungsi!",
     );
}

const genAI = new GoogleGenAI({ apiKey });

export const generateEmbeddings = async (
     texts: string[],
): Promise<number[][]> => {
     try {
          const embeddings: number[][] = [];

          for (const text of texts) {
               const result = await genAI.models.embedContent({
                    model: "gemini-embedding-2",
                    contents: text,
                    config: { outputDimensionality: 768 },
               });

               if (!result.embeddings || result.embeddings.length === 0) {
                    throw new Error(
                         `Embedding kosong untuk teks: "${text.substring(0, 50)}..."`,
                    );
               }

               const embeddingValues = result.embeddings[0]?.values;

               if (!embeddingValues) {
                    throw new Error(
                         "Nilai embedding (values) tidak ditemukan dalam response API",
                    );
               }

               embeddings.push(embeddingValues);

               await new Promise((resolve) => setTimeout(resolve, 2000));
          }

          return embeddings;
     } catch (error) {
          console.error(
               "Error saat men-generate embeddings via Gemini API:",
               error,
          );
          throw new Error("Gagal mengolah vector embeddings teks dengan AI");
     }
};

export const generateQueryEmbedding = async (
     text: string,
): Promise<number[]> => {
     try {
          const result = await genAI.models.embedContent({
               model: "gemini-embedding-2",
               contents: text,
               config: { outputDimensionality: 768 },
          });

          if (!result.embeddings || result.embeddings.length === 0) {
               throw new Error("Embedding kosong untuk pertanyaan");
          }

          const embeddingValues = result.embeddings[0]?.values;

          if (!embeddingValues) {
               throw new Error(
                    "Nilai embedding (values) tidak ditemukan dalam response API",
               );
          }

          return embeddingValues;
     } catch (error) {
          console.error(
               "Error saat men-generate embedding untuk query:",
               error,
          );
          throw new Error("Gagal memproses pertanyaan dengan AI");
     }
};
