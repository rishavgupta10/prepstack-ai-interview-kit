"use client"
import React from "react";
import {
  LayoutDashboard,
  User,
  Settings,
  ChevronRight,
//   Github,
//   Twitter,
//   Instagram,
//   Linkedin,
  Heart,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: LucideIcon;
}

interface SocialLink {
  label: string;
  icon: LucideIcon;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
];

const socialLinks: SocialLink[] = [
  { label: "Github", icon: User, href: "#" },
  { label: "Twitter", icon: User, href: "#" },
  { label: "Instagram", icon: User, href: "#" },
  { label: "LinkedIn", icon: User, href: "#" },
];

export default function MobileDrawer(): React.JSX.Element {
  return (
    <div className="fixed top-24  duration-200 z-50 h-screen w-screen rounded-tr-4xl rounded-tl-4xl bg-[#0d1526e5] backdrop-blur-sm right-0 overflow-hidden border-t border-white/10">
      {/* signature glow — single warm accent, kept quiet */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-72 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, #ff6b4a 0%, #ff6b4a00 70%)",
        }}
      />

      <div className="relative flex h-full w-full flex-col overflow-y-auto px-6 pb-8 pt-3">
        {/* drag handle */}
        <div className="mx-auto h-1.5 w-12 shrink-0 rounded-full bg-white/15" />

        {/* auth buttons */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="rounded-2xl bg-gradient-to-r from-[#013553] to-[#013650] py-3 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(255,107,74,0.6)] transition active:scale-[0.98]"
          >
            Sign up
          </button>
          <button
            type="button"
            className="rounded-2xl border border-white/15 bg-white/5 py-3 text-sm font-medium text-white/90 transition active:scale-[0.98] hover:bg-white/10"
          >
            Sign in
          </button>
        </div>

        {/* nav section */}
        <div className="mt-9">
          <p className="px-1 text-xs font-medium uppercase tracking-[0.14em] text-white/30">
            Menu
          </p>
          <nav className="mt-3 flex flex-col gap-1">
            {navItems.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="group flex items-center justify-between rounded-2xl px-3 py-3.5 text-left transition hover:bg-white/5 active:scale-[0.99]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/80 transition group-hover:bg-white/10 group-hover:text-white">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="text-[15px] font-medium text-white/90">
                    {label}
                  </span>
                </span>
                <ChevronRight
                  size={16}
                  strokeWidth={1.75}
                  className="text-white/25 transition group-hover:translate-x-0.5 group-hover:text-white/50"
                />
              </button>
            ))}
          </nav>
        </div>

        {/* social section */}
        <div className="mt-9">
          <p className="px-1 text-xs font-medium uppercase tracking-[0.14em] text-white/30">
            Connect
          </p>
          <div className="mt-3 flex items-center gap-3 px-1">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <Icon size={17} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}