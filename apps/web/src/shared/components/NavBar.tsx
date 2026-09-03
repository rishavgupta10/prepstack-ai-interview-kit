"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  BrainCircuit,
  ChevronDown,
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  LogInIcon,
  ShieldCheckIcon,
  EllipsisVertical,
} from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import MobileDrawer from "./Mobiledrawer";
import { BsQuestionCircle } from "react-icons/bs";
import { useLogout } from "@/features/auth/api/use-logout";
import { Confirm, Notify } from "notiflix";
import { authStorage } from "../lib/auth";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const isLoggedIn = isAuthenticated; // wire this to your auth

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const LogoutMutation = useLogout();

  const handleLogout = async () => {
    Confirm.show(
      "Logout",
      "Are sure to you want to logout?",
      "Logout",
      "Cancel",
      async () => {
        const response = await LogoutMutation.mutateAsync();
        if (response.success) {
          authStorage.removeToken();
          router.push("/");
        }
      },
      () => {
        Notify.info("Logout Aborted!!");
      },
      {},
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    Confirm.init({
      backgroundColor: "#032c26",
      titleColor: "white",
      messageColor: "cyan",
      cancelButtonBackground: "red",
      cancelButtonColor: "white",
      okButtonBackground: "black",
      okButtonColor: "white",
    });
  }, []);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
        <div className="flex items-center justify-between rounded-2xl border border-[#1E2D45] bg-[#0D1526] backdrop-blur-md px-4 py-3 shadow-xl shadow-black/30">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center">
              <BrainCircuit
                className="w-4 h-4 text-blue-400"
                strokeWidth={1.75}
              />
            </div>
            <span className="text-sm font-semibold text-slate-100 space-y-4 tracking-tight">
              prepStack <span className="text-blue-400">AI</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-slate-50">
            <Link
              href="/#features"
              className="hover:text-slate-200 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#engine"
              className="hover:text-slate-200 transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/#tracks"
              className="hover:text-slate-200 transition-colors"
            >
              Practice tracks
            </Link>
          </nav>

          {/* Right side */}
          {!isLoggedIn && (
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/login"
                className="rounded-lg sm:flex hidden  items-center gap-2  bg-blue-800/50 hover:bg-blue-500 text-white px-3.5 py-2 font-medium transition-colors"
              >
                Sign in <LogInIcon />
              </Link>
              <Link
                href="/register"
                className="rounded-lg sm:flex hidden   items-center gap-2  bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 font-medium transition-colors"
              >
                <ShieldCheckIcon />{" "}
                <span className="textt-nowrap">Get started</span>
              </Link>
            </div>
          )}

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg border bg-emerald-500 border-[#1E2D45] hover:border-[#2A3D5C] px-4 py-1.5 transition-colors"
            >
              {isLoggedIn ? (
                <div className="w-7 h-7 rounded-full  bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-xs font-semibold text-blue-400">
                  {user?.name?.charAt(0)}
                </div>
              ) : (
                <span className="capitalize text-white text-nowrap">get started</span>
              )}
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-50 transition-transform duration-150 ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#1E2D45] bg-[#111827] shadow-xl shadow-black/40 overflow-hidden">
                {/* User info */}
                {isLoggedIn ? (
                  <div>
                    <div className="px-4 py-3 border-b border-[#1E2D45]">
                      <p className="text-sm font-medium text-slate-100 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors"
                      >
                        <User
                          className="w-4 h-4 text-slate-500"
                          strokeWidth={1.75}
                        />
                        Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors"
                      >
                        <LayoutDashboard
                          className="w-4 h-4 text-slate-500"
                          strokeWidth={1.75}
                        />
                        Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors"
                      >
                        <Settings
                          className="w-4 h-4 text-slate-500"
                          strokeWidth={1.75}
                        />
                        Settings
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-[#1E2D45] py-1">
                      <button
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" strokeWidth={1.75} />
                        Log out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 px-4 py-3">

                    <Link
                      href="/login"
                      className="rounded-lg flex   items-center gap-2  hover:bg-blue-500 text-white  py-2 font-medium transition-colors"
                    >
                      <LogInIcon /> Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="rounded-lg flex   items-center gap-2  hover:bg-blue-500 text-white  py-2 font-medium transition-colors"
                    >
                      <ShieldCheckIcon /> Register
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="rounded-lg flex   items-center gap-2  text-white  py-2 font-medium transition-colors"
                    >
                      <BsQuestionCircle /> How it works
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* mobile drawer   */}
      </header>
    </>
  );
}
