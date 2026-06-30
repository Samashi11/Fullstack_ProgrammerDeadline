import type { Request, Response } from "express";
import { extractTextFromBuffer, chunkText } from "../services/pdfService.js";
import { generateEmbeddings } from "../services/geminiService.js";
import { supabase } from "../config/supabase.js";

export const uploadDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No PDF file provided" });
      return;
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }

    const rawText = await extractTextFromBuffer(fileBuffer);
    const chunks = chunkText(rawText, 1000, 200);

    if (chunks.length === 0) {
  res.status(400).json({
    error:
      "Tidak ada teks yang dapat dibaca pada PDF. Kemungkinan PDF berupa hasil scan atau hanya berisi gambar. Gunakan PDF yang dapat dipilih (selectable text) atau tambahkan OCR terlebih dahulu.",
  });
  return;
}

    console.log("==== DEBUG UPLOAD ====");
    console.log("REQ.USER:", req.user);
    console.log("USER ID:", userId);
    console.log("FILE NAME:", fileName);

    // 1. Simpan judul metadata ke tabel Supabase "documents" terlebih dahulu untuk dapatkan ID-nya
    const { data: documentData, error: documentError } = await supabase
      .from("documents")
      .insert([{ user_id: userId, title: fileName, file_name: fileName }])
      .select("id")
      .single();

    if (documentError || !documentData) {
      console.error("Supabase insert error for document:", documentError);
      res.status(500).json({
        error: "Failed to save document metadata in Supabase",
      });
      return;
    }

    const documentId = documentData.id;

    // 2. Olah Array Teks Chunks ke Server Google Gemini untuk mendapatkan Array Embedding Vektor
    const embeddings = await generateEmbeddings(chunks);

    // 3. Gabungkan Chunk Teks dengan Vektor-nya, hubungkan dengan ID Document dan metadata pendukung
    const chunksToInsert = chunks.map((chunk, index) => ({
      document_id: documentId,
      content: chunk,
      embedding: embeddings[index],
      metadata: { chunk_index: index, origin: fileName },
    }));

    // 4. Lakukan Insert Jamak (Bulk Insert) seluruh row yang dihasilkan ke tabel Supabase "document_chunks"
    const { error: chunkError } = await supabase
      .from("document_chunks")
      .insert(chunksToInsert);

    if (chunkError) {
      console.error("Supabase bulk insert error chunks:", chunkError);
      res.status(500).json({
        error: "Failed to store text embeddings into vector storage",
      });
      return;
    }

    // Update status menjadi ready setelah indexing selesai
    await supabase
      .from("documents")
      .update({ status: "ready" })
      .eq("id", documentId);

    res.status(200).json({
      message: "File processing and AI knowledge indexing complete!",
      documentId,
      totalChunksIndexed: chunks.length,
    });
  } catch (error) {
    console.error("Error processing document upload:", error);
    res.status(500).json({
      error: "Internal server error during upload/processing",
    });
  }
};

export const getDocuments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }

    const { data, error } = await supabase
      .from("documents")
      .select("id, title, file_name, created_at, status")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json({ documents: data });
  } catch (error) {
    console.error("Error getting user documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }

    const { error } = await supabase
      .from("documents")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
