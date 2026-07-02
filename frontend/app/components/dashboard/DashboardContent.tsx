"use client";

import RecentDocuments from "./RecentDocuments";
import RecentActivity from "./RecentActivity";
import AISuggestions from "./AISuggestions";
import RecentQuiz from "./RecentQuiz";
import RecentChat from "./RecentChat";

interface Document {
    id: string;
    file_name: string;
    created_at: string;
    status: string;
}

interface Props {
    documents: Document[];
}

export default function DashboardContent({

    documents,

}: Props) {

    return (

        <section className="space-y-6">

            {/* BARIS 1 */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                <RecentDocuments
                    documents={documents}
                />

                <RecentActivity
                    documents={documents}
                />

                <AISuggestions
                    documents={documents}
                />

            </div>

            {/* BARIS 2 */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <RecentQuiz />

                <RecentChat />

            </div>

        </section>

    );

}