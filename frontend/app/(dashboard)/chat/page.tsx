"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { useAuth } from "@/app/hooks/useAuth";
import LogoutButton from "../../../app/components/logout/LogoutButton";

import Sidebar from "../../components/Sidebar";
import ChatHeader from "../../components/ChatHeader";
import ChatMessage from "../../components/ChatMessage";
import ChatInput from "../../components/ChatInput";

export default function ChatPage() {
  useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUserData(res.data);
      } catch (err) {
        console.error("Unauthorized", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden font-body-md text-body-md text-on-surface">
      {/* Sidebar khusus Chat Interface */}
      <Sidebar />

      {/* Main Chat Canvas dengan Custom Grid Background */}
      <main
        className="flex-1 flex flex-col h-screen md:ml-[280px] relative"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      >
        <ChatHeader fileName="React_Handbook.pdf" />

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto px-lg py-xl flex flex-col gap-xl custom-scrollbar">
          <ChatMessage type="user">
            Can you explain the useEffect hook based on chapter 4?
          </ChatMessage>

          <ChatMessage type="ai" citations={["Page 12", "Page 15"]}>
            <p className="font-body-md text-body-md text-on-surface mb-md">
              Based on the context provided, the{" "}
              <code className="bg-white/10 px-1 rounded text-primary">
                useEffect
              </code>{" "}
              hook is used to perform side effects in function components. It
              serves the same purpose as <code>componentDidMount</code>,{" "}
              <code>componentDidUpdate</code>, and{" "}
              <code>componentWillUnmount</code> in React classes, but unified
              into a single API.
            </p>
            <p className="font-body-md text-body-md text-on-surface mb-md">
              The handbook notes that side effects include things like data
              fetching, subscriptions, or manually changing the DOM.
            </p>
          </ChatMessage>

          <ChatMessage type="user">What about dependencies array?</ChatMessage>

          <ChatMessage type="ai" citations={["Page 13"]} isLast>
            <p className="font-body-md text-body-md text-on-surface mb-md">
              The dependency array is the second argument passed to{" "}
              <code className="bg-white/10 px-1 rounded text-primary">
                useEffect
              </code>
              . If you pass an array, React will only re-run the effect if one
              of the dependencies has changed between renders. If you pass an
              empty array{" "}
              <code className="bg-white/10 px-1 rounded text-primary">[]</code>,
              it tells React that your effect doesn't depend on any values from
              props or state, so it never needs to re-run.
            </p>
          </ChatMessage>
        </div>

        <ChatInput />
      </main>
    </div>
  );
}
