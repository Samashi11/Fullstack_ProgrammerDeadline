"use client";

interface Document {
  id: string;
  status: string;
  file_name: string;
}

interface Props {
  documents: Document[];
}

export default function KnowledgeOverview({ documents }: Props) {
  const totalDocuments = documents.length;

  const readyDocuments = documents.filter(
    (doc) => doc.status === "ready"
  ).length;

  const processingDocuments = totalDocuments - readyDocuments;

  const cards = [
    {
      icon: "description",
      value: totalDocuments,
      label: "Documents",
      description: "Total uploaded documents",
      color: "bg-violet-100 text-violet-600",
    },
    {
      icon: "verified",
      value: readyDocuments,
      label: "Ready",
      description: "Documents ready to use",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: "hourglass_top",
      value: processingDocuments,
      label: "Processing",
      description: "Documents still processing",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: "history_edu",
      value: totalDocuments > 0 ? documents[0].file_name : "-",
      label: "Latest Upload",
      description: "Most recently uploaded file",
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          SL Overview
        </h2>
        <p className="mt-1 text-gray-500">
          Overview of your AI knowledge base.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-gray-100 bg-white p-5"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}
            >
              <span className="material-symbols-outlined">{card.icon}</span>
            </div>

            <div className="flex items-baseline gap-2">
              <h3 className="truncate text-3xl font-bold text-gray-900">
                {card.value}
              </h3>
              <span className="truncate font-semibold text-gray-900">
                {card.label}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
