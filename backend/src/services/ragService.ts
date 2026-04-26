import { supabase } from "../config/supabase";
import { generateQueryEmbedding } from "./geminiService";

export interface RetrievedChunk {
     id: string;
     document_id: string;
     content: string;
     metadata: any;
     similarity: number;
}

export const retrieveRelevantContext = async (
     query: string,
     userId: string,
     matchCount: number = 5,
): Promise<RetrievedChunk[]> => {
     try {
          // 1. Generate embedding untuk pertanyaan pengguna
          const queryEmbedding = await generateQueryEmbedding(query);

          // 2. Panggil Supabase RPC untuk mencari konteks dokumen
          const { data, error } = await supabase.rpc("match_document_chunks", {
               query_embedding: queryEmbedding,
               match_count: matchCount,
               p_user_id: userId,
          });

          if (error) {
               console.error(
                    "Error saat mengeksekusi RPC match_document_chunks:",
                    error,
               );
               throw new Error(
                    "Gagal melakukan pencarian konteks dari database",
               );
          }

          return data as RetrievedChunk[];
     } catch (error) {
          console.error("Error di retrieveRelevantContext:", error);
          throw error;
     }
};
