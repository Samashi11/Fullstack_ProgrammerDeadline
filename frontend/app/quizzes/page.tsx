"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/* ───────────────────────── Types ───────────────────────── */

type QuizType = "mc" | "tf" | "short" | "mix";
type Difficulty = "easy" | "medium" | "hard";
type Lang = "id" | "en";
type ScreenId = "upload" | "gen" | "quiz" | "result";

interface Question {
  q: string;
  opts: string[];
  ans: number;
  exp: string;
}

/* ───────────────────────── Demo data ───────────────────────── */

const DEMO_QUESTIONS: Question[] = [
  {
    q: "Apa tujuan utama dari sistem manajemen basis pengetahuan?",
    opts: [
      "Menyimpan data mentah tanpa konteks",
      "Mengorganisasi, menyimpan, dan memudahkan akses informasi secara efisien",
      "Menggantikan seluruh sistem database tradisional",
      "Hanya digunakan untuk keperluan arsip dokumen fisik",
    ],
    ans: 1,
    exp: "Sistem manajemen basis pengetahuan bertujuan untuk mengorganisasi, menyimpan, dan memudahkan akses informasi sehingga dapat digunakan secara efisien oleh pengguna maupun sistem AI.",
  },
  {
    q: "Teknologi mana yang paling umum digunakan untuk pencarian semantik dalam knowledge base modern?",
    opts: [
      "SQL full-text search",
      "Vector embeddings & cosine similarity",
      "Regex pattern matching",
      "B-tree indexing",
    ],
    ans: 1,
    exp: "Vector embeddings memungkinkan pencarian berdasarkan makna (semantik), bukan hanya kata kunci yang sama persis, sehingga lebih relevan dan akurat.",
  },
  {
    q: "Apa yang dimaksud dengan 'hallucination' pada model bahasa besar (LLM)?",
    opts: [
      "Kemampuan model menghasilkan kreativitas tinggi",
      "Model menghasilkan informasi yang tampak meyakinkan namun faktanya salah",
      "Model lambat merespons karena overload",
      "Fitur visualisasi data pada LLM",
    ],
    ans: 1,
    exp: "Hallucination terjadi saat LLM menghasilkan output yang terdengar logis tapi faktanya tidak akurat atau bahkan sepenuhnya dibuat-buat.",
  },
  {
    q: "Metode RAG (Retrieval-Augmented Generation) berfungsi untuk…",
    opts: [
      "Melatih ulang model dari nol dengan data baru",
      "Menggabungkan pencarian dokumen relevan dengan kemampuan generasi teks LLM",
      "Mengompres ukuran model agar lebih ringan",
      "Mentranslasi dokumen antar bahasa secara otomatis",
    ],
    ans: 1,
    exp: "RAG mengambil dokumen relevan dari knowledge base terlebih dahulu, lalu menyertakannya sebagai konteks bagi LLM saat menghasilkan jawaban—mengurangi hallucination secara signifikan.",
  },
  {
    q: "Dalam konteks keamanan data pada knowledge base, enkripsi end-to-end melindungi…",
    opts: [
      "Hanya file yang disimpan di server",
      "Data saat transit antara pengirim dan penerima sehingga pihak ketiga tidak bisa membaca",
      "Performa query pada database",
      "Ukuran file agar lebih kecil",
    ],
    ans: 1,
    exp: "Enkripsi end-to-end memastikan data terenkripsi dari sumber hingga tujuan, sehingga bahkan penyedia layanan pun tidak dapat membaca isinya.",
  },
  {
    q: "Apa perbedaan utama antara 'structured' dan 'unstructured' data?",
    opts: [
      "Structured data lebih besar ukurannya",
      "Structured data terorganisir dalam format tertentu (tabel/skema), unstructured tidak memiliki format baku",
      "Unstructured data hanya berupa gambar",
      "Keduanya sama, hanya berbeda nama",
    ],
    ans: 1,
    exp: "Structured data (seperti database SQL) mengikuti skema yang ketat, sedangkan unstructured data (seperti email, artikel, video) tidak memiliki format standar.",
  },
  {
    q: "Token dalam konteks LLM merujuk pada…",
    opts: [
      "Mata uang digital untuk membayar API",
      "Unit terkecil teks yang diproses model, bisa berupa kata, sub-kata, atau karakter",
      "Jumlah pengguna aktif pada suatu waktu",
      "Kecepatan respons model dalam milidetik",
    ],
    ans: 1,
    exp: "Token adalah unit dasar pemrosesan teks oleh LLM. Satu kata bisa terdiri dari 1–3 token tergantung panjang dan kompleksitasnya.",
  },
  {
    q: "Manfaat utama menggunakan knowledge base berbasis cloud dibanding on-premise adalah…",
    opts: [
      "Selalu lebih murah tanpa pengecualian",
      "Lebih mudah diskalakan, diakses dari mana saja, dan pemeliharaan infrastruktur ditangani provider",
      "Tidak memerlukan koneksi internet sama sekali",
      "Data dijamin 100% tidak pernah bisa diakses pihak lain",
    ],
    ans: 1,
    exp: "Cloud knowledge base menawarkan skalabilitas elastis, aksesibilitas global, dan mengurangi beban pengelolaan infrastruktur pada tim internal.",
  },
  {
    q: "Apa fungsi dari 'chunking' dalam pipeline pemrosesan dokumen untuk AI?",
    opts: [
      "Mengompres gambar dalam dokumen",
      "Membagi dokumen panjang menjadi potongan-potongan kecil agar dapat diproses dan diindeks secara efisien",
      "Menghapus duplikat data",
      "Mengenkripsi setiap halaman dokumen",
    ],
    ans: 1,
    exp: "Chunking memecah dokumen besar menjadi segmen-segmen kecil yang dapat diembedded dan dicari secara individual, meningkatkan akurasi retrieval.",
  },
  {
    q: "Metrik 'recall' dalam evaluasi sistem pencarian informasi mengukur…",
    opts: [
      "Kecepatan respons sistem",
      "Proporsi dokumen relevan yang berhasil ditemukan dari total dokumen relevan yang ada",
      "Jumlah query yang diproses per detik",
      "Tingkat kepuasan pengguna secara subjektif",
    ],
    ans: 1,
    exp: "Recall = jumlah dokumen relevan yang ditemukan / total dokumen relevan. Recall tinggi berarti sistem jarang melewatkan dokumen penting.",
  },
];

/* ───────────────────────── Static config ───────────────────────── */

const QUESTION_TYPES: { type: QuizType; icon: string; label: string; desc: string }[] = [
  { type: "mc", icon: "🔵", label: "Pilihan Ganda", desc: "4 pilihan per soal" },
  { type: "tf", icon: "⚖️", label: "Benar / Salah", desc: "True or False" },
  { type: "short", icon: "✏️", label: "Isian Singkat", desc: "Jawaban teks pendek" },
  { type: "mix", icon: "🎲", label: "Campuran", desc: "Mix semua tipe" },
];

const TYPE_LABEL: Record<QuizType, string> = {
  mc: "Pilihan Ganda",
  tf: "Benar/Salah",
  short: "Isian Singkat",
  mix: "Campuran",
};

const DIFF_LABEL: Record<Difficulty, string> = {
  easy: "Mudah",
  medium: "Menengah",
  hard: "Sulit",
};

const GEN_STEPS = [
  { icon: "📖", label: "Membaca & memahami dokumen" },
  { icon: "🧠", label: "Mengekstrak topik penting" },
  { icon: "✍️", label: "Membuat pertanyaan & jawaban" },
  { icon: "✅", label: "Memvalidasi kualitas soal" },
];

const GEN_SUBS = [
  "Membaca & memahami dokumen…",
  "Mengekstrak topik penting…",
  "Membuat pertanyaan & jawaban…",
  "Memvalidasi kualitas soal…",
];

const OPT_LETTERS = ["A", "B", "C", "D"];

/* ───────────────────────── Helpers ───────────────────────── */

function iconForFile(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = { pdf: "📕", docx: "📘", txt: "📝", pptx: "📊" };
  return map[ext] || "📄";
}

function formatTime(totalSeconds: number): string {
  const m = String(Math.max(0, Math.floor(totalSeconds / 60))).padStart(2, "0");
  const s = String(Math.max(0, totalSeconds % 60)).padStart(2, "0");
  return `${m}:${s}`;
}

/* ───────────────────────── Component ───────────────────────── */

export default function Page() {
  /* Screen */
  const [screen, setScreen] = useState<ScreenId>("upload");

  /* Upload + config state */
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [quizType, setQuizType] = useState<QuizType>("mc");
  const [qCount, setQCount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [lang, setLang] = useState<Lang>("id");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* Generating state */
  const [genStepIndex, setGenStepIndex] = useState(-1); // -1 = none done yet
  const [genSub, setGenSub] = useState("Menganalisis dokumen");
  const genIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Quiz state */
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ───────────────────────── File handling ───────────────────────── */

  const handleFile = (f: File) => {
    setFile(f);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ───────────────────────── Generate animation ───────────────────────── */

  const startGenerate = () => {
    if (!file) {
      alert("Pilih dokumen terlebih dahulu!");
      return;
    }
    setScreen("gen");
    setGenStepIndex(-1);
    setGenSub("Menganalisis dokumen");

    let i = 0;
    if (genIntervalRef.current) clearInterval(genIntervalRef.current);
    genIntervalRef.current = setInterval(() => {
      if (i < GEN_STEPS.length) {
        setGenStepIndex(i);
        setGenSub(GEN_SUBS[i] || "Selesai!");
        i++;
      } else {
        if (genIntervalRef.current) clearInterval(genIntervalRef.current);
        setTimeout(() => initQuiz(), 600);
      }
    }, 900);
  };

  useEffect(() => {
    return () => {
      if (genIntervalRef.current) clearInterval(genIntervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  /* ───────────────────────── Quiz lifecycle ───────────────────────── */

  const initQuiz = () => {
    const n = Math.min(qCount, DEMO_QUESTIONS.length);
    const qs = DEMO_QUESTIONS.slice(0, n);
    setQuestions(qs);
    setAnswers({});
    setRevealed({});
    setCurrentQ(0);
    setScreen("quiz");
    startTimer(qs.length);
  };

  const startTimer = (questionCount: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(60 * questionCount);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // When timer hits 0, show results
  useEffect(() => {
    if (screen === "quiz" && timeLeft === 0 && questions.length > 0) {
      showResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const selectOpt = (i: number) => {
    if (revealed[currentQ]) return;
    setAnswers((prev) => ({ ...prev, [currentQ]: i }));
  };

  const submitAnswer = () => {
    setRevealed((prev) => ({ ...prev, [currentQ]: true }));
  };

  const navigate = (dir: 1 | -1) => {
    const next = currentQ + dir;
    if (next < 0 || next >= questions.length) return;
    setCurrentQ(next);
  };

  const goTo = (i: number) => setCurrentQ(i);

  const confirmFinish = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < questions.length) {
      const ok = window.confirm(
        `Kamu baru menjawab ${answeredCount} dari ${questions.length} soal. Yakin ingin selesai?`
      );
      if (!ok) return;
    }
    showResults();
  };

  const showResults = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setScreen("result");
  }, []);

  const retakeQuiz = () => {
    setAnswers({});
    setRevealed({});
    setCurrentQ(0);
    setScreen("quiz");
    startTimer(questions.length);
  };

  const backToUpload = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setScreen("upload");
    clearFile();
    setGenStepIndex(-1);
  };

  /* ───────────────────────── Derived results ───────────────────────── */

  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;
  questions.forEach((q, i) => {
    if (answers[i] === undefined) skippedCount++;
    else if (answers[i] === q.ans) correctCount++;
    else wrongCount++;
  });
  const pct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  const [resultTitle, resultDesc] =
    pct >= 80
      ? ["Luar Biasa! 🎉", "Kamu menguasai materi ini dengan sangat baik."]
      : pct >= 60
      ? ["Bagus! 👍", "Masih ada beberapa area yang bisa kamu perkuat."]
      : ["Tetap Semangat! 💪", "Pelajari kembali materi dan coba lagi."];

  const circumference = 2 * Math.PI * 55;
  const [ringOffset, setRingOffset] = useState(circumference);

  useEffect(() => {
    if (screen === "result") {
      setRingOffset(circumference);
      const t = setTimeout(() => {
        setRingOffset(circumference - (circumference * pct) / 100);
      }, 100);
      return () => clearTimeout(t);
    }
  }, [screen, pct, circumference]);

  /* ───────────────────────── Render helpers ───────────────────────── */

  const currentQuestion = questions[currentQ];
  const isLast = currentQ === questions.length - 1;
  const timerClass =
    timeLeft < 60 ? "timer-badge danger" : timeLeft < 120 ? "timer-badge warn" : "timer-badge";

  return (
    <div className="kb-app">
      <style>{CSS}</style>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">KnowledgeBase.ai</div>
        <button className="new-btn">+ New Analysis</button>
        <nav>
          <div className="nav-item">
            <span className="nav-icon">⊞</span> Dashboard
          </div>
          <div className="nav-item">
            <span className="nav-icon">📄</span> Documents
          </div>
          <div className="nav-item">
            <span className="nav-icon">💬</span> Chat
          </div>
          <div className="nav-item active">
            <span className="nav-icon">🎯</span> Quizzes
          </div>
          <div className="nav-item">
            <span className="nav-icon">⚙️</span> Settings
          </div>
        </nav>
        <div className="sidebar-bottom">
          <div className="user-row">
            <div className="avatar">N</div>
            <div className="user-info">
              <p>AI Researcher</p>
              <span>Pro Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        <header className="topbar">
          <div>
            <h1>Quizzes</h1>
            <p>Generate kuis otomatis dari dokumenmu menggunakan AI</p>
          </div>
          <div className="badge">
            <span className="dot" /> AI Ready
          </div>
        </header>

        <div className="content">
          {/* ── SCREEN 1: Upload & Config ── */}
          {screen === "upload" && (
            <div className="screen active">
              <div
                className={`upload-zone${dragOver ? " drag" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
              >
                <div className="upload-icon">📂</div>
                <h2>Upload Dokumen</h2>
                <p>
                  Seret dokumenmu ke sini, atau klik untuk memilih file.
                  <br />
                  Mendukung PDF, DOCX, TXT, PPTX
                </p>
                <label className="btn-primary" htmlFor="fileInput" onClick={(e) => e.stopPropagation()}>
                  Pilih File
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="fileInput"
                  accept=".pdf,.docx,.txt,.pptx"
                  onChange={onFileInputChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {file && (
                <div className="file-preview show">
                  <div className="file-icon-box">{iconForFile(file.name)}</div>
                  <div className="file-meta">
                    <strong>{file.name}</strong>
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                  <button
                    className="btn-outline"
                    onClick={clearFile}
                    style={{ padding: "7px 14px", fontSize: 13 }}
                  >
                    ✕
                  </button>
                </div>
              )}

              {file && (
                <div className="quiz-config">
                  <p className="config-title">Jenis Pertanyaan</p>
                  <div className="config-grid">
                    {QUESTION_TYPES.map((t) => (
                      <div
                        key={t.type}
                        className={`config-card${quizType === t.type ? " sel" : ""}`}
                        onClick={() => setQuizType(t.type)}
                      >
                        <div className="cc-icon">{t.icon}</div>
                        <div className="cc-label">{t.label}</div>
                        <div className="cc-desc">{t.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="row-config">
                    <div className="form-group">
                      <label>Jumlah Soal</label>
                      <div className="range-val">{qCount}</div>
                      <input
                        type="range"
                        min={5}
                        max={30}
                        step={5}
                        value={qCount}
                        onChange={(e) => setQCount(parseInt(e.target.value, 10))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Tingkat Kesulitan</label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                      >
                        <option value="easy">Mudah</option>
                        <option value="medium">Menengah</option>
                        <option value="hard">Sulit</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Bahasa Soal</label>
                      <select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
                        <option value="id">Indonesia</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      className="btn-primary"
                      onClick={startGenerate}
                      style={{ flex: 1, padding: 13 }}
                    >
                      🤖 Generate Quiz dengan AI
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── SCREEN 2: Generating ── */}
          {screen === "gen" && (
            <div className="screen active">
              <div className="generating-wrap">
                <div className="spinner-ring" />
                <div style={{ textAlign: "center" }}>
                  <div className="gen-title">AI sedang membuat quiz…</div>
                  <div className="gen-sub">{genSub}</div>
                </div>
                <div className="progress-bar-wrap">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${((genStepIndex + 1) / GEN_STEPS.length) * 100}%` }}
                  />
                </div>
                <div className="gen-steps">
                  {GEN_STEPS.map((s, i) => (
                    <div className={`gen-step${i <= genStepIndex ? " done" : ""}`} key={s.label}>
                      <span className="step-icon">{s.icon}</span> {s.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SCREEN 3: Quiz ── */}
          {screen === "quiz" && currentQuestion && (
            <div className="screen active">
              <div className="quiz-header">
                <div className="quiz-meta">
                  <h2>Quiz: {file ? file.name.replace(/\.[^.]+$/, "") : "Dokumen Saya"}</h2>
                  <p>
                    {questions.length} soal · {TYPE_LABEL[quizType]} · {DIFF_LABEL[difficulty]}
                  </p>
                </div>
                <div className="quiz-controls">
                  <div className={timerClass}>⏱ {formatTime(timeLeft)}</div>
                  <button
                    className="btn-outline"
                    onClick={confirmFinish}
                    style={{ padding: "8px 16px", fontSize: 13 }}
                  >
                    Selesaikan
                  </button>
                </div>
              </div>

              <div className="progress-nav">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`q-dot${answers[i] !== undefined ? " answered" : ""}${
                      i === currentQ ? " current" : ""
                    }`}
                    onClick={() => goTo(i)}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="question-card">
                <div className="q-num">
                  Soal {currentQ + 1} dari {questions.length}
                </div>
                <div className="q-text">{currentQuestion.q}</div>
                <div className="options">
                  {currentQuestion.opts.map((o, i) => {
                    const isSelected = answers[currentQ] === i;
                    const isRevealed = !!revealed[currentQ];
                    const isCorrectOpt = i === currentQuestion.ans;
                    let cls = "option";
                    if (isSelected) cls += " selected";
                    if (isRevealed) {
                      if (isCorrectOpt) cls += " correct";
                      else if (isSelected) cls += " wrong";
                    }
                    return (
                      <div key={i} className={cls} onClick={() => selectOpt(i)}>
                        <div className="opt-letter">{OPT_LETTERS[i]}</div>
                        <span>{o}</span>
                      </div>
                    );
                  })}
                </div>
                <div className={`explanation${revealed[currentQ] ? " show" : ""}`}>
                  {revealed[currentQ] && (
                    <>
                      <strong>💡 Penjelasan:</strong> {currentQuestion.exp}
                    </>
                  )}
                </div>
              </div>

              <div className="quiz-footer">
                <button
                  className="btn-outline"
                  onClick={() => navigate(-1)}
                  disabled={currentQ === 0}
                  style={{ opacity: currentQ === 0 ? 0.4 : 1 }}
                >
                  ← Sebelumnya
                </button>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn-submit" onClick={submitAnswer}>
                    Kunci Jawaban
                  </button>
                  {!isLast && (
                    <button className="btn-primary" onClick={() => navigate(1)}>
                      Selanjutnya →
                    </button>
                  )}
                  {isLast && (
                    <button className="btn-finish" style={{ display: "inline-flex" }} onClick={showResults}>
                      Lihat Hasil 🎉
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── SCREEN 4: Results ── */}
          {screen === "result" && (
            <div className="screen active">
              <div className="results-header">
                <div className="score-ring-wrap">
                  <div className="score-ring">
                    <svg viewBox="0 0 120 120" width={140} height={140}>
                      <circle className="ring-bg" cx={60} cy={60} r={55} />
                      <circle
                        className="ring-fill"
                        cx={60}
                        cy={60}
                        r={55}
                        style={{ strokeDashoffset: ringOffset }}
                      />
                    </svg>
                    <div className="score-center">
                      <div className="score-pct">{pct}%</div>
                      <div className="score-lbl">SKOR</div>
                    </div>
                  </div>
                </div>
                <h2>{resultTitle}</h2>
                <p>{resultDesc}</p>
              </div>

              <div className="stats-row">
                <div className="stat-card correct">
                  <div className="s-val">{correctCount}</div>
                  <div className="s-lbl">✅ Benar</div>
                </div>
                <div className="stat-card wrong">
                  <div className="s-val">{wrongCount}</div>
                  <div className="s-lbl">❌ Salah</div>
                </div>
                <div className="stat-card skipped">
                  <div className="s-val">{skippedCount}</div>
                  <div className="s-lbl">⏭ Dilewati</div>
                </div>
              </div>

              <div className="review-title">Review Jawaban</div>
              <div className="review-list">
                {questions.map((q, i) => {
                  const userAns = answers[i];
                  const isCorrect = userAns === q.ans;
                  return (
                    <div className="review-item" key={i}>
                      <div className={`review-badge ${isCorrect ? "c" : "w"}`}>
                        {isCorrect ? "✓" : "✗"}
                      </div>
                      <div>
                        <div className="ri-q">{q.q}</div>
                        <div className="ri-a">
                          Jawabanmu: <span>{userAns !== undefined ? q.opts[userAns] : "Dilewati"}</span>
                          {!isCorrect && (
                            <>
                              {" "}
                              · Benar: <span style={{ color: "var(--accent)" }}>{q.opts[q.ans]}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="results-actions">
                <button className="btn-outline" onClick={retakeQuiz}>
                  🔄 Ulangi Quiz
                </button>
                <button className="btn-outline" onClick={backToUpload}>
                  📂 Buat Quiz Baru
                </button>
                <button className="btn-primary" onClick={() => alert("Export PDF segera hadir!")}>
                  📥 Export Hasil
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ───────────────────────── CSS (ported 1:1 from the original) ───────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.kb-app, .kb-app *, .kb-app *::before, .kb-app *::after { box-sizing: border-box; margin: 0; padding: 0; }

.kb-app {
  --bg-base:     #0d1117;
  --bg-sidebar:  #0f1520;
  --bg-card:     #161d2b;
  --bg-card2:    #1c2538;
  --border:      #232e42;
  --accent:      #22d97a;
  --accent-dim:  rgba(34,217,122,.15);
  --accent2:     #3b82f6;
  --accent2-dim: rgba(59,130,246,.15);
  --yellow:      #f59e0b;
  --red:         #ef4444;
  --text-1:      #e8edf5;
  --text-2:      #8b96a9;
  --text-3:      #5a6478;
  --radius:      10px;
  --sidebar-w:   240px;

  font-family: 'Inter', sans-serif;
  background: var(--bg-base);
  color: var(--text-1);
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* SIDEBAR */
.kb-app .sidebar {
  width: var(--sidebar-w);
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  flex-shrink: 0;
}
.kb-app .logo {
  font-size: 16px;
  font-weight: 700;
  color: var(--accent);
  padding: 0 20px 20px;
  letter-spacing: -.3px;
}
.kb-app .new-btn {
  margin: 0 14px 24px;
  background: var(--accent);
  color: #0d1117;
  border: none;
  border-radius: var(--radius);
  padding: 10px 14px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  transition: opacity .15s;
}
.kb-app .new-btn:hover { opacity: .88; }
.kb-app .nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 20px;
  font-size: 13.5px;
  color: var(--text-2);
  cursor: pointer;
  transition: background .12s, color .12s;
  border-left: 2px solid transparent;
}
.kb-app .nav-item:hover { background: rgba(255,255,255,.04); color: var(--text-1); }
.kb-app .nav-item.active {
  background: var(--accent-dim);
  color: var(--accent);
  border-left-color: var(--accent);
  font-weight: 600;
}
.kb-app .nav-icon { font-size: 15px; width: 18px; text-align: center; }
.kb-app .sidebar-bottom {
  margin-top: auto;
  padding: 16px 16px 0;
  border-top: 1px solid var(--border);
}
.kb-app .user-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 4px;
}
.kb-app .avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: #2a3a52;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; color: var(--text-1);
  flex-shrink: 0;
}
.kb-app .user-info p { font-size: 13px; font-weight: 600; }
.kb-app .user-info span { font-size: 11px; color: var(--accent); }

/* MAIN */
.kb-app .main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.kb-app .topbar {
  padding: 16px 28px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-sidebar);
}
.kb-app .topbar h1 { font-size: 17px; font-weight: 700; }
.kb-app .topbar p  { font-size: 12px; color: var(--text-2); margin-top: 2px; }
.kb-app .badge {
  display: flex; align-items: center; gap: 6px;
  background: var(--bg-card2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
}
.kb-app .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }

.kb-app .content {
  flex: 1;
  overflow-y: auto;
  padding: 28px;
}
.kb-app .content::-webkit-scrollbar { width: 5px; }
.kb-app .content::-webkit-scrollbar-track { background: transparent; }
.kb-app .content::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

.kb-app .screen { display: none; }
.kb-app .screen.active { display: block; }

/* SCREEN 1: Upload */
.kb-app .upload-zone {
  border: 2px dashed var(--border);
  border-radius: 16px;
  padding: 60px 40px;
  text-align: center;
  background: var(--bg-card);
  cursor: pointer;
  transition: border-color .2s, background .2s;
  max-width: 640px;
  margin: 0 auto 32px;
}
.kb-app .upload-zone:hover, .kb-app .upload-zone.drag { border-color: var(--accent); background: var(--accent-dim); }
.kb-app .upload-icon { font-size: 48px; margin-bottom: 16px; }
.kb-app .upload-zone h2 { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
.kb-app .upload-zone p  { font-size: 13.5px; color: var(--text-2); margin-bottom: 24px; }
.kb-app .upload-zone input[type=file] { display: none; }
.kb-app .btn-primary {
  background: var(--accent);
  color: #0d1117;
  border: none;
  border-radius: 8px;
  padding: 10px 22px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: opacity .15s;
  display: inline-block;
}
.kb-app .btn-primary:hover { opacity: .88; }
.kb-app .btn-outline {
  background: transparent;
  color: var(--text-1);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 22px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background .15s, border-color .15s;
}
.kb-app .btn-outline:hover { background: rgba(255,255,255,.05); border-color: var(--text-2); }
.kb-app .btn-outline:disabled { cursor: not-allowed; }

.kb-app .file-preview {
  max-width: 640px;
  margin: 0 auto 28px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: none;
  align-items: center;
  gap: 14px;
}
.kb-app .file-preview.show { display: flex; }
.kb-app .file-icon-box {
  width: 44px; height: 44px;
  border-radius: 8px;
  background: var(--accent-dim);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
}
.kb-app .file-meta { flex: 1; }
.kb-app .file-meta strong { font-size: 14px; font-weight: 600; display: block; }
.kb-app .file-meta span   { font-size: 12px; color: var(--text-2); }

.kb-app .quiz-config {
  max-width: 640px;
  margin: 0 auto;
}
.kb-app .config-title { font-size: 15px; font-weight: 700; margin-bottom: 16px; }
.kb-app .config-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 24px;
}
.kb-app .config-card {
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 16px;
  cursor: pointer;
  transition: border-color .15s, background .15s;
  text-align: center;
}
.kb-app .config-card.sel { border-color: var(--accent); background: var(--accent-dim); }
.kb-app .config-card .cc-icon { font-size: 26px; margin-bottom: 6px; }
.kb-app .config-card .cc-label { font-size: 13px; font-weight: 600; }
.kb-app .config-card .cc-desc  { font-size: 11.5px; color: var(--text-2); margin-top: 2px; }

.kb-app .row-config {
  display: flex; gap: 14px; margin-bottom: 28px; align-items: flex-end;
}
.kb-app .form-group { flex: 1; }
.kb-app .form-group label { font-size: 12px; color: var(--text-2); font-weight: 500; display: block; margin-bottom: 6px; }
.kb-app .form-group select, .kb-app .form-group input[type=range] {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 7px;
  color: var(--text-1);
  font-size: 13.5px;
  padding: 9px 12px;
  outline: none;
  appearance: none;
}
.kb-app .form-group select { cursor: pointer; }
.kb-app .range-val { font-size: 22px; font-weight: 700; color: var(--accent); text-align: center; }

/* SCREEN 2: Generating */
.kb-app .generating-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 24px;
}
.kb-app .spinner-ring {
  width: 72px; height: 72px;
  border-radius: 50%;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  animation: kb-spin 1s linear infinite;
}
@keyframes kb-spin { to { transform: rotate(360deg); } }
.kb-app .gen-title { font-size: 20px; font-weight: 700; }
.kb-app .gen-sub   { font-size: 13.5px; color: var(--text-2); }
.kb-app .progress-bar-wrap {
  width: 320px; height: 6px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
}
.kb-app .progress-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 99px;
  width: 0%;
  transition: width .4s ease;
}
.kb-app .gen-steps { display: flex; flex-direction: column; gap: 10px; width: 320px; }
.kb-app .gen-step {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: var(--text-3);
  transition: color .3s;
}
.kb-app .gen-step.done { color: var(--text-1); }
.kb-app .gen-step .step-icon { font-size: 16px; }

/* SCREEN 3: Quiz */
.kb-app .quiz-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 24px;
}
.kb-app .quiz-meta h2 { font-size: 18px; font-weight: 700; }
.kb-app .quiz-meta p  { font-size: 12.5px; color: var(--text-2); margin-top: 3px; }
.kb-app .quiz-controls { display: flex; align-items: center; gap: 12px; }
.kb-app .timer-badge {
  background: var(--bg-card2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 14px;
  font-weight: 700;
  font-family: monospace;
  letter-spacing: 1px;
}
.kb-app .timer-badge.warn { color: var(--yellow); border-color: var(--yellow); }
.kb-app .timer-badge.danger { color: var(--red); border-color: var(--red); }

.kb-app .progress-nav {
  display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 28px;
}
.kb-app .q-dot {
  width: 28px; height: 28px;
  border-radius: 6px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  font-size: 11px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background .15s, border-color .15s, color .15s;
  color: var(--text-2);
}
.kb-app .q-dot.answered { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }
.kb-app .q-dot.current  { background: var(--accent); border-color: var(--accent); color: #0d1117; }

.kb-app .question-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 28px 32px;
  margin-bottom: 20px;
}
.kb-app .q-num { font-size: 11.5px; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
.kb-app .q-text { font-size: 17px; font-weight: 600; line-height: 1.5; margin-bottom: 28px; }
.kb-app .options { display: flex; flex-direction: column; gap: 10px; }
.kb-app .option {
  display: flex; align-items: center; gap: 14px;
  background: var(--bg-card2);
  border: 2px solid var(--border);
  border-radius: 10px;
  padding: 14px 18px;
  cursor: pointer;
  transition: border-color .15s, background .15s;
  font-size: 14px;
  font-weight: 500;
}
.kb-app .option:hover { border-color: var(--accent2); background: var(--accent2-dim); }
.kb-app .option.selected { border-color: var(--accent); background: var(--accent-dim); }
.kb-app .option.correct  { border-color: var(--accent); background: var(--accent-dim); }
.kb-app .option.wrong    { border-color: var(--red);    background: rgba(239,68,68,.12); }
.kb-app .opt-letter {
  width: 32px; height: 32px;
  border-radius: 7px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
  flex-shrink: 0;
  transition: background .15s, color .15s, border-color .15s;
}
.kb-app .option.selected .opt-letter { background: var(--accent); color: #0d1117; border-color: var(--accent); }
.kb-app .option.correct  .opt-letter { background: var(--accent); color: #0d1117; border-color: var(--accent); }
.kb-app .option.wrong    .opt-letter { background: var(--red); color: #fff; border-color: var(--red); }

.kb-app .explanation {
  display: none;
  background: var(--accent-dim);
  border: 1px solid var(--accent);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 13px;
  color: var(--text-1);
  margin-top: 16px;
  line-height: 1.6;
}
.kb-app .explanation.show { display: block; }
.kb-app .explanation strong { color: var(--accent); }

.kb-app .quiz-footer {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 8px;
}
.kb-app .btn-submit {
  background: var(--accent2);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px 28px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: opacity .15s;
}
.kb-app .btn-submit:hover { opacity: .88; }
.kb-app .btn-finish {
  background: var(--accent);
  color: #0d1117;
  border: none;
  border-radius: 8px;
  padding: 11px 28px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: opacity .15s;
}
.kb-app .btn-finish:hover { opacity: .88; }

/* SCREEN 4: Results */
.kb-app .results-header {
  text-align: center;
  margin-bottom: 36px;
}
.kb-app .score-ring-wrap {
  display: flex; justify-content: center; margin-bottom: 20px;
}
.kb-app .score-ring {
  position: relative;
  width: 140px; height: 140px;
}
.kb-app .score-ring svg { transform: rotate(-90deg); }
.kb-app .score-ring .ring-bg { fill: none; stroke: var(--border); stroke-width: 10; }
.kb-app .score-ring .ring-fill {
  fill: none;
  stroke: var(--accent);
  stroke-width: 10;
  stroke-linecap: round;
  stroke-dasharray: 345;
  stroke-dashoffset: 345;
  transition: stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1);
}
.kb-app .score-center {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.kb-app .score-pct { font-size: 30px; font-weight: 800; color: var(--accent); }
.kb-app .score-lbl { font-size: 11px; color: var(--text-2); font-weight: 500; }
.kb-app .results-header h2 { font-size: 22px; font-weight: 800; }
.kb-app .results-header p  { font-size: 13.5px; color: var(--text-2); margin-top: 6px; }

.kb-app .stats-row {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 14px; margin-bottom: 36px;
}
.kb-app .stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px;
  text-align: center;
}
.kb-app .stat-card .s-val { font-size: 26px; font-weight: 800; }
.kb-app .stat-card .s-lbl { font-size: 12px; color: var(--text-2); margin-top: 4px; }
.kb-app .stat-card.correct .s-val { color: var(--accent); }
.kb-app .stat-card.wrong   .s-val { color: var(--red); }
.kb-app .stat-card.skipped .s-val { color: var(--yellow); }

.kb-app .review-title { font-size: 15px; font-weight: 700; margin-bottom: 16px; }
.kb-app .review-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
.kb-app .review-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex; align-items: flex-start; gap: 14px;
}
.kb-app .review-badge {
  width: 28px; height: 28px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; flex-shrink: 0;
}
.kb-app .review-badge.c { background: var(--accent-dim); color: var(--accent); }
.kb-app .review-badge.w { background: rgba(239,68,68,.15); color: var(--red); }
.kb-app .review-item .ri-q { font-size: 13.5px; font-weight: 600; line-height: 1.4; }
.kb-app .review-item .ri-a { font-size: 12px; color: var(--text-2); margin-top: 4px; }
.kb-app .review-item .ri-a span { color: var(--text-1); font-weight: 500; }

.kb-app .results-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
`;