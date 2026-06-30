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
          console.log("=== HASIL RPC ===");
          console.log(data);
          console.log("=================");

          return data as RetrievedChunk[];
     } catch (error) {
          console.error("Error di retrieveRelevantContext:", error);
          throw error;
     }
};

export interface DocumentChunk {
     content: string;
     metadata: {
          chunk_index: number;
          origin: string;
     };
}

export const retrieveDocumentChunks = async (
     documentId: string,
     userId: string,
): Promise<DocumentChunk[]> => {
     try {
          const { data: document, error: documentError } = await supabase
               .from("documents")
               .select("id")
               .eq("id", documentId)
               .eq("user_id", userId)
               .single();

          if (documentError || !document) {
               throw new Error("Document tidak ditemukan atau bukan milik user.");
          }

          const { data, error } = await supabase
               .from("document_chunks")
               .select("content, metadata")
               .eq("document_id", documentId);

          if (error) {
               throw error;
          }

          const sortedChunks = (data ?? []).sort(
               (a, b) =>
                    (a.metadata?.chunk_index ?? 0) -
                    (b.metadata?.chunk_index ?? 0),
          );

          return sortedChunks;
     } catch (error) {
          console.error("Error retrieveDocumentChunks:", error);
          throw error;
     }
};