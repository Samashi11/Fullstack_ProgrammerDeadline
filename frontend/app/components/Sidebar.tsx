"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: "space_dashboard" },
    { href: "/document", label: "Documents", icon: "description" },
    { href: "/chat", label: "Chat", icon: "forum" },
    { href: "/quizzes", label: "Quizzes", icon: "quiz" },
    // { href: "/history", label: "History", icon: "history" },
    // { href: "/bookmarks", label: "Bookmarks", icon: "bookmark" },
    { href: "/settings", label: "Settings", icon: "settings" },
  ];

  return (
    <nav className="fixed left-0 top-0 hidden h-screen w-[280px] flex-col border-r border-gray-100 bg-white md:flex">
      {/* LOGO */}
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
          <span className="material-symbols-outlined text-violet-600">
            menu_book
          </span>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          SL 
          <span className="text-violet-600"> Notes</span>
        </h1>
      </div>

      {/* NEW CHAT */}
      <div className="px-4 pt-2">
        <button
          onClick={() => router.push("/chat")}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 hover:shadow-lg active:scale-[0.98]"
        >
          <span className="material-symbols-outlined mr-2 text-[20px]">
            add
          </span>
          New Chat
        </button>
      </div>

      {/* MENU */}
      <ul className="mt-6 flex flex-1 flex-col gap-1 px-3 text-[15px] font-medium">
        {menuItems.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex h-12 items-center gap-3 rounded-xl px-4 transition-all ${
                  active
                    ? "bg-violet-100 font-semibold text-violet-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* USER */}
      <div className="relative mt-auto border-t border-gray-100 p-4" ref={menuRef}>
        {menuOpen && (
          <div className="absolute bottom-[88px] left-4 right-4 z-10 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            <button
              onClick={() => router.push("/settings")}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <span className="material-symbols-outlined text-[20px] text-gray-500">
                settings
              </span>
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
              Logout
            </button>
          </div>
        )}

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3 transition hover:border-violet-200 hover:bg-violet-50">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQvbJHMZoI4313_iXBl-sEPoMBw0O8rtoaUHpIRWwCoksxVUhXIHrGbJDx0Iu_-TyPq8dAPLLD4rob6MQZwCWGdTHWyjzftJ2UqqOZryXhYshzSEVeB8bl4XAbIjlNTeWK0KtoG83JiBKeGyZvp46-x02VSuwrlcRTusVotR3zodA2pwmcnEn3pTH-f2OnVIkePKktpucIWD8jCTJY5CPAgRAEzt1CXHJGrLn5RqJ2iSv3gAXQgHxZqgFbPVdNqWA-WjPCcQdxBn7x"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              Mahasiswa
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-600" />
              <span className="text-xs font-medium text-violet-600">
                Pro Plan
              </span>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white hover:text-violet-600"
          >
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
      </div>
    </nav>
  );
}