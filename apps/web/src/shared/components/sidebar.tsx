"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  BrainCircuit,
  LayoutDashboard,
  FileText,
  MessageSquare,
  BarChart2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { authStorage } from "../lib/auth";

import { Confirm, Notify } from "notiflix";
import { useLogout } from "@/features/auth/api/use-logout";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const LogoutMutation = useLogout();

  Confirm.init({
    backgroundColor: "#ffffff",
    titleColor: "#0f172a",
    messageColor: "#475569",
    cancelButtonBackground: "#f1f5f9",
    cancelButtonColor: "#334155",
    okButtonBackground: "#4f46e5",
    okButtonColor: "#ffffff",
    borderRadius: "16px",
  });

  const handleLogout = async () => {
    Confirm.show(
      "Log Out",
      "Are you sure you want to log out of your session?",
      "Log Out",
      "Cancel",
      async () => {
        try {
          const response = await LogoutMutation.mutateAsync();
          if (response.success) {
            authStorage.removeToken();
            router.push("/");
          }
        } catch {
          authStorage.removeToken();
          router.push("/");
        }
      },
      () => {
        Notify.info("Logout cancelled.");
      },
      {},
    );
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  const linkClass = (href: string) =>
    `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150 ${
      isActive(href)
        ? "bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50/50 text-purple-700 font-semibold border-l-[3px] border-purple-600 shadow-xs"
        : "text-slate-600 hover:bg-slate-100/90 hover:text-slate-950 font-medium"
    } ${collapsed ? "justify-center px-2.5" : ""}`;

  const iconClass = (href: string) =>
    `shrink-0 w-[18px] h-[18px] transition-colors duration-150 ${
      isActive(href)
        ? "text-purple-600"
        : "text-slate-500 group-hover:text-slate-900"
    }`;

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-50 shadow-xs transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 p-5 flex flex-col shadow-2xl transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 border border-purple-500/30 flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/20">
            <BrainCircuit className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-base font-bold text-slate-950 leading-tight">
              prepStack <span className="text-purple-600">AI</span>
            </p>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              Communication Coach
            </p>
          </div>
        </div>

        <p className="px-1 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </p>

        <nav className="flex flex-col gap-1 flex-1">
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className={linkClass("/dashboard")}
          >
            <LayoutDashboard className={iconClass("/dashboard")} strokeWidth={1.75} />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/resume"
            onClick={() => setMobileOpen(false)}
            className={linkClass("/resume")}
          >
            <FileText className={iconClass("/resume")} strokeWidth={1.75} />
            <span>Resume Profile</span>
          </Link>

          <Link
            href="/interview"
            onClick={() => setMobileOpen(false)}
            className={linkClass("/interview")}
          >
            <MessageSquare className={iconClass("/interview")} strokeWidth={1.75} />
            <span>AI Interview Practice</span>
          </Link>

          <Link
            href="/interview-kit"
            onClick={() => setMobileOpen(false)}
            className={linkClass("/interview-kit")}
          >
            <Briefcase className={iconClass("/interview-kit")} strokeWidth={1.75} />
            <span>Interview Kit</span>
          </Link>

          <Link
            href="/preparation"
            onClick={() => setMobileOpen(false)}
            className={linkClass("/preparation")}
          >
            <BookOpen className={iconClass("/preparation")} strokeWidth={1.75} />
            <span>Q&A Sheet Prep</span>
          </Link>

          <Link
            href="/report"
            onClick={() => setMobileOpen(false)}
            className={linkClass("/report")}
          >
            <BarChart2 className={iconClass("/report")} strokeWidth={1.75} />
            <span>Performance Reports</span>
          </Link>
        </nav>

        <div className="border-t border-slate-200 my-4" />

        <button
          onClick={handleLogout}
          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-150 w-full"
        >
          <LogOut className="shrink-0 w-[18px] h-[18px]" strokeWidth={1.75} />
          <span>Log out</span>
        </button>
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col relative bg-white border-r border-slate-200 min-h-screen p-5 transition-all duration-200 ease-in-out shadow-xs ${
          collapsed ? "w-[72px]" : "w-64"
        }`}
      >
        {/* Logo */}
        <Link
          href={"/"}
          className={`flex items-center gap-3 mb-8 ${collapsed ? "justify-center" : ""}`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 border border-purple-500/30 flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/20">
            <BrainCircuit className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          {!collapsed && (
            <div>
              <p className="text-base font-bold text-slate-950 leading-tight whitespace-nowrap">
                prepStack <span className="text-purple-600">AI</span>
              </p>
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Communication Coach
              </p>
            </div>
          )}
        </Link>

        {!collapsed && (
          <p className="px-1 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </p>
        )}

        <nav className="flex flex-col gap-1.5 flex-1">
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <LayoutDashboard className={iconClass("/dashboard")} strokeWidth={1.75} />
            {!collapsed && <span className="whitespace-nowrap">Dashboard</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-3 z-50 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 shadow-md transition-opacity duration-150">
                Dashboard
              </span>
            )}
          </Link>

          <Link href="/resume" className={linkClass("/resume")}>
            <FileText className={iconClass("/resume")} strokeWidth={1.75} />
            {!collapsed && <span className="whitespace-nowrap">Resume Profile</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-3 z-50 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 shadow-md transition-opacity duration-150">
                Resume Profile
              </span>
            )}
          </Link>

          <Link href="/interview" className={linkClass("/interview")}>
            <MessageSquare className={iconClass("/interview")} strokeWidth={1.75} />
            {!collapsed && <span className="whitespace-nowrap">AI Interview Practice</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-3 z-50 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 shadow-md transition-opacity duration-150">
                AI Interview Practice
              </span>
            )}
          </Link>

          <Link href="/interview-kit" className={linkClass("/interview-kit")}>
            <Briefcase className={iconClass("/interview-kit")} strokeWidth={1.75} />
            {!collapsed && <span className="whitespace-nowrap">Interview Kit</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-3 z-50 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 shadow-md transition-opacity duration-150">
                Interview Kit
              </span>
            )}
          </Link>

          <Link href="/preparation" className={linkClass("/preparation")}>
            <BookOpen className={iconClass("/preparation")} strokeWidth={1.75} />
            {!collapsed && <span className="whitespace-nowrap">Q&A Sheet Prep</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-3 z-50 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 shadow-md transition-opacity duration-150">
                Q&A Sheet Prep
              </span>
            )}
          </Link>

          <Link href="/report" className={linkClass("/report")}>
            <BarChart2 className={iconClass("/report")} strokeWidth={1.75} />
            {!collapsed && <span className="whitespace-nowrap">Performance Reports</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-3 z-50 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 shadow-md transition-opacity duration-150">
                Performance Reports
              </span>
            )}
          </Link>
        </nav>

        <div className="border-t border-slate-200 my-4" />

        <button
          onClick={handleLogout}
          className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-150 w-full ${
            collapsed ? "justify-center px-2.5" : ""
          }`}
        >
          <LogOut className="shrink-0 w-[18px] h-[18px]" strokeWidth={1.75} />
          {!collapsed && <span className="whitespace-nowrap">Log out</span>}
          {collapsed && (
            <span className="pointer-events-none absolute left-full ml-3 z-50 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 shadow-md transition-opacity duration-150">
              Log out
            </span>
          )}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-7 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-purple-600 hover:border-purple-300 transition-colors duration-150 shadow-sm"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </aside>
    </>
  );
}