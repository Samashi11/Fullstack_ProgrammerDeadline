"use client";

import Sidebar from "@/app/components/Sidebar";
import MobileNavbar from "@/app/components/MobileNavbar";

import QuizHero from "@/app/components/QuizHero";
import QuizGenerator from "@/app/components/QuizGenerator";
import QuizStats from "@/app/components/QuizStats";
import RecentQuiz from "@/app/components/RecentQuiz";

export default function QuizPage() {
    return (
        <div className="bg-background text-on-background min-h-screen flex relative">

            <div
                className="fixed inset-0 pointer-events-none -z-10"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(16,185,129,.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(16,185,129,.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                }}
            />

            <Sidebar />

            <main className="flex-1 md:ml-[280px] p-6 md:p-xl max-w-container_max mx-auto w-full mb-16 md:mb-0 space-y-6">

                <QuizHero />

                <QuizGenerator />

                <QuizStats />

                <RecentQuiz />

            </main>

            <MobileNavbar />

        </div>
    );
}