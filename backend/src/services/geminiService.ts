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

export const generateChatResponse = async (
     query: string,
     contextText: string,
): Promise<string> => {
     try {
          const prompt = `Anda adalah asisten cerdas untuk sistem manajemen pengetahuan.
Jawab pertanyaan pengguna secara akurat dan informatif berdasarkan KONTEKS yang diberikan berikut ini.
Jika informasi tidak tersedia atau tidak relevan dari konteks, katakan dengan sopan bahwa Anda tidak mengetahui jawabannya berdasarkan dokumen yang ada. JANGAN mengarang jawaban (halusinasi).

KONTEKS:
${contextText}

PERTANYAAN PENGGUNA:
${query}

JAWABAN:`;

          const result = await genAI.models.generateContent({
               model: "gemini-2.5-flash",
               contents: prompt,
          });

          return (
               result.text ||
               "Mohon maaf, tidak ada respons yang dihasilkan dari model AI."
          );
     } catch (error) {
          console.error("Error generating chat response via Gemini:", error);
          throw new Error("Gagal mendapatkan respons teks dari AI Gemini");
     }
};
