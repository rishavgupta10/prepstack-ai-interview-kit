'use client'
import useUserProfile, { useUpdateUserProfile } from "@/features/user/hooks/use-user-profile";
import { Loader } from "@/shared/components/Loader";
import React, { useState, useRef, ChangeEvent } from "react";
import { LoaderCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  summary: string;
  skills: string[];
  portfolioUrl: string;
  linkedinUrl: string;
  avatarUrl: string;
}

// ─── Initial data ─────────────────────────────────────────────────────────────
const INITIAL_PROFILE: UserProfile = {
  name: "Aryan Mehta",
  email: "aryan.mehta@example.com",
  phone: "+91 98765 43210",
  role: "Senior Product Designer",
  summary:
    "Multidisciplinary designer with 6+ years crafting user-centred digital products for startups and enterprise clients. Fluent in the full design cycle — from discovery and strategy through high-fidelity prototyping and handoff. Passionate about travel tech, accessibility, and systems thinking.",
  skills: ["UI / UX Design", "Figma", "Tailwind CSS", "React", "User Research", "Design Systems", "Prototyping", "Motion Design"],
  portfolioUrl: "https://aryanmehta.design",
  linkedinUrl: "https://linkedin.com/in/aryanmehta",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85",
};

// ─── Icons (inline SVG, no dependency) ───────────────────────────────────────
const Icon = {
  mail: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  phone: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z" />
    </svg>
  ),
  link: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  linkedin: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
  edit: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  close: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  camera: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
  ),
  plus: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  x: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

// ─── Skill chip (profile view) ────────────────────────────────────────────────
const SkillChip: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium tracking-wide border border-white/12 rounded-md bg-white text-white/70 hover:bg-white hover:text-white hover:border-white transition-all duration-200 cursor-default select-none">
    {label}
  </span>
);

// ─── Section label ────────────────────────────────────────────────────────────
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-3">{children}</p>
);

// ─── Info row ─────────────────────────────────────────────────────────────────
const InfoRow: React.FC<{ icon: React.ReactNode; value: string; href?: string }> = ({ icon, value, href }) => {
  const content = (
    <div className="flex items-center gap-2.5 text-sm text-white/80 group">
      <span className="text-white/35 group-hover:text-white transition-colors duration-200">{icon}</span>
      <span className={`truncate ${href ? "group-hover:text-white group-hover:underline underline-offset-2 transition-colors duration-200" : ""}`}>
        {value}
      </span>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer" className="block">{content}</a> : <div>{content}</div>;
};

// ─── Form field ───────────────────────────────────────────────────────────────
const Field: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
  error?: string;
}> = ({ label, name, value, onChange, type = "text", placeholder, textarea, rows = 4, error }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={name} className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white">
      {label}
    </label>
    {textarea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-sm text-white bg-white/10 shadow-inner shadow-black rounded-md  border ${error ? "border-red-400" : "border-black/12"} focus:outline-none focus:border-black transition-colors duration-200 resize-none placeholder:text-black/25`}
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-sm text-white bg-white/10 shadow-inner shadow-black rounded-md  border ${error ? "border-red-400" : "border-black/12"} focus:outline-none focus:border-black transition-colors duration-200 placeholder:text-black/25`}
      />
    )}
    {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
  </div>
);

// ─── Edit Panel (slide-in drawer) ─────────────────────────────────────────────
interface EditPanelProps {
  profile: UserProfile;
  onSave: (p: UserProfile) => void;
  onClose: () => void;
}

const EditPanel: React.FC<EditPanelProps> = ({ profile, onSave, onClose }) => {
  const [form, setForm] = useState<UserProfile>({ ...profile });
  const [errors, setErrors] = useState<Partial<Record<keyof UserProfile, string>>>({});
  const [newSkill, setNewSkill] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const {mutateAsync:updateUserProfile,isPending,isSuccess} = useUpdateUserProfile()

  // Controlled field change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof UserProfile]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Avatar upload (base64 preview)
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((prev) => ({ ...prev, avatarUrl: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  // Skill management
  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !form.skills.includes(trimmed)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    }
    setNewSkill("");
  };
  const removeSkill = (skill: string) =>
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));

  // Validation
  const validate = (): boolean => {
    const e: Partial<Record<keyof UserProfile, string>> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required.";
    if (!form.role.trim()) e.role = "Role is required.";
    if (!form.summary.trim()) e.summary = "Summary is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const { skills, avatarUrl, ...payload } = form;
    console.log(payload);
    await updateUserProfile(payload)
    onClose()
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-black z-50 shadow-2xl flex flex-col"
        style={{ animation: "slideIn 0.3s cubic-bezier(.22,1,.36,1)" }}>

        <style>{`
          @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        `}</style>

        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold tracking-tight">Edit Profile</h2>
            <p className="text-xs text-white mt-0.5">Changes save to your profile immediately.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-black hover:bg-white transition-colors duration-200"
          >
            {Icon.close}
          </button>
        </div>

        {/* Scrollable form body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form id="edit-form" onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

            {/* Avatar */}
            <div>
              <SectionLabel>Profile Picture</SectionLabel>
              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <img
                    src={form.avatarUrl || "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"}
                    alt="avatar preview"
                    className="w-20 h-20 object-cover border border-white/90"
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-7 h-7 bg-white text-black flex items-center justify-center hover:bg-green-700/75 transition-colors duration-200"
                  >
                    {Icon.camera}
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="text-xs font-semibold underline underline-offset-2 hover:text-black/50 transition-colors duration-200"
                  >
                    Upload new photo
                  </button>
                  <p className="text-[11px] text-white mt-1">JPG, PNG or WebP. Max 2 MB.</p>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </div>
              </div>
            </div>

            <div className="h-px bg-white/6" />

            {/* Personal info */}
            <div>
              <SectionLabel>Personal Info</SectionLabel>
              <div className="flex flex-col gap-4">
                <Field label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" error={errors.name} />
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" error={errors.email} />
                <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" />
                <Field label="Role / Title" name="role" value={form.role} onChange={handleChange} placeholder="e.g. Senior Product Designer" error={errors.role} />
              </div>
            </div>

            <div className="h-px bg-white/6" />

            {/* Professional summary */}
            <div>
              <SectionLabel>Professional Summary</SectionLabel>
              <Field
                label="Summary"
                name="summary"
                value={form.summary}
                onChange={handleChange}
                textarea
                rows={5}
                placeholder="A concise overview of your experience and expertise..."
                error={errors.summary}
              />
            </div>

            <div className="h-px bg-white/6" />

            {/* Links */}
            <div>
              <SectionLabel>Links</SectionLabel>
              <div className="flex flex-col gap-4">
                <Field label="Portfolio URL" name="portfolioUrl" type="url" value={form.portfolioUrl} onChange={handleChange} placeholder="https://yourportfolio.com" />
                <Field label="LinkedIn URL" name="linkedinUrl" type="url" value={form.linkedinUrl} onChange={handleChange} placeholder="https://linkedin.com/in/yourhandle" />
              </div>
            </div>

          </form>
        </div>

        {/* Drawer footer */}
        <div className="px-6 py-4 border-t border-black/8 flex items-center gap-3 flex-shrink-0 bg-black">
          <button
            type="submit"
            form="edit-form"
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] ${isSuccess
              ? "bg-white text-black"
              : "bg-emerald-600 text-white hover:bg-white/75"
              }`}
          >
            {isPending ? <div className="flex items-center gap-2"><LoaderCircle className="animate-spin"/> saving...</div> : (isSuccess ? <>{Icon.check} Saved!</> : "Save Changes")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border  text-white text-sm font-medium border-white hover:bg-white/20 transition-all duration-200 active:scale-[0.98]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

// ─── UserProfile ──────────────────────────────────────────────────────────
const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [editing, setEditing] = useState(false);
  const { data: userProfileRes, isLoading, error } = useUserProfile()

  const handleSave = (updated: UserProfile) => setProfile(updated);



  if (isLoading) {
    return <Loader />
  }
  const userProfile = userProfileRes?.data

  // if(error){
  //   return  <section className="h-screen"><ErrorFallback/></section>
  // }

  const initials = userProfile?.name.split(" ").map((n:string) => n[0]).join("").toUpperCase().slice(0, 2);
  console.log(userProfile)

  return (
    <div className="min-h-screen w-screen pt-16 bg-[#060B16] antialiased">
      <div
        className="absolute w-[560px] h-[560px] rounded-full opacity-[0.15] blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          top: "-120px",
          left: "-120px",
        }}
      />
      <div
        className="absolute w-[480px] h-[480px] rounded-full opacity-[0.12] blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
          bottom: "-160px",
          right: "-100px",
        }}
      />


      {/* ── Page content ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Page title row */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">My Profile</h1>
            <p className="text-xs sm:text-sm text-white/35 mt-0.5">View and manage your professional information.</p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white/10 rounded-md text-white text-xs sm:text-sm font-semibold hover:bg-white/75 active:scale-95 transition-all duration-200"
          >
            {Icon.edit}
            <span className="hidden sm:inline">Edit Profile</span>
            <span className="sm:hidden">Edit</span>
          </button>
        </div>

        {/* ── Profile layout: sidebar + content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 sm:gap-6">

          {/* ── Left sidebar ── */}
          <aside className="flex flex-col gap-5">

            {/* Identity card */}
            <div className="bg-white/5 rounded-lg backdrop-blur-sm border border-white/8 shadow-inner shadow-black p-6 flex flex-col items-center text-center gap-4">
              {/* Avatar with ring */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 ring-[3px] ring-black/8 ring-offset-2 overflow-hidden flex-shrink-0">
                  {userProfile.avatarUrl ? (
                    <img src={userProfile?.avatarUrl || "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"} alt={userProfile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center text-white text-2xl font-bold">
                      {initials}
                    </div>
                  )}
                </div>
                {/* Online dot */}
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight leading-tight">{userProfile.name}</h2>
                <p className="text-sm text-white mt-1 font-medium">{userProfile.role}</p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/6" />

              {/* Contact */}
              <div className="w-full flex flex-col text-white gap-2.5 text-left">
                <InfoRow icon={Icon.mail} value={userProfile.email} />
                <InfoRow icon={Icon.phone} value={userProfile.phone || "-"} />
              </div>
            </div>

            {/* Links card */}
            <div className="bg-white/5 border border-white/8  p-5 shadow-inner shadow-black">
              <SectionLabel>Links</SectionLabel>
              <div className="flex flex-col gap-3">
                <InfoRow
                  icon={Icon.link}
                  value={userProfile.portfolioUrl?.replace("https://", "")}
                  href={userProfile.portfolioUrl}
                />
                <InfoRow
                  icon={Icon.linkedin}
                  value="LinkedIn Profile"
                  href={userProfile.linkedinUrl}
                />
              </div>
            </div>

            {/* Completion card */}
            {/* <div className="bg-white/5 border border-white/8  p-5 shadow-inner shadow-black">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/40 mb-2">Profile Strength</p>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold">92%</span>
                <span className="text-xs text-white/40">Complete</span>
              </div>
              <div className="h-1 bg-white/10 w-full">
                <div className="h-full bg-white" style={{ width: "92%" }} />
              </div>
              <p className="text-[11px] text-white/35 mt-3 leading-relaxed">
                Add a portfolio project to reach 100%.
              </p>
            </div> */}

          </aside>

          {/* ── Right content ── */}
          <div className="flex flex-col gap-5 sm:gap-6">

            {/* Professional Summary */}
            <div className="bg-white/5 border border-white/8  p-5 shadow-inner shadow-black">
              <SectionLabel>Professional Summary</SectionLabel>
              <p className="text-sm text-white/80 leading-relaxed">{userProfile.summary}</p>
            </div>

            {/* Skills */}
            <div className="bg-white/5 border border-white/8  p-5 shadow-inner shadow-black">
              <SectionLabel>Skills</SectionLabel>
              {userProfile?.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((s:string) => <SkillChip key={s} label={s} />)}
                </div>
              ) : (
                <p className="text-sm text-white italic">No skills added yet.</p>
              )}
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

              {/* Contact details */}
              <div className="bg-white/5 border border-white/8  p-5 shadow-inner shadow-black">
                <SectionLabel>Contact Details</SectionLabel>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[10px] text-white uppercase tracking-widest mb-0.5">Email</p>
                    <p className="text-sm text-white/70 font-medium truncate">{userProfile.email}</p>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div>
                    <p className="text-[10px] text-white uppercase tracking-widest mb-0.5">Phone</p>
                    <p className="text-sm text-white/70 font-medium">{userProfile.phone}</p>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div>
                    <p className="text-[10px] text-white uppercase tracking-widest mb-0.5">Role</p>
                    <p className="text-sm text-white/70 font-medium">{userProfile.role}</p>
                  </div>
                </div>
              </div>

              {/* Portfolio + LinkedIn */}
              <div className="bg-white/5 border border-white/8  p-5 shadow-inner shadow-black">
                <SectionLabel>Online Presence</SectionLabel>
                <div className="flex flex-col gap-3">
                  <a
                    href={userProfile.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 p-3 border border-black/8 hover:border-white hover:bg-white/20 transition-all duration-200"
                  >
                    <span className="text-white group-hover:text-white/50 transition-colors duration-200 mt-0.5">{Icon.link}</span>
                    <div className="min-w-0">
                      <p className="text-[10px] text-white uppercase tracking-widest">Portfolio</p>
                      <p className="text-sm font-medium text-white/70 truncate group-hover:text-white/50 transition-colors duration-200">
                        {userProfile?.portfolioUrl?.replace("https://", "")}
                      </p>
                    </div>
                  </a>
                  <a
                    href={userProfile?.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 p-3 border border-black/8 hover:border-white hover:bg-white/20 transition-all duration-200"
                  >
                    <span className="text-white group-hover:text-white/50 transition-colors duration-200 mt-0.5">{Icon.linkedin}</span>
                    <div>
                      <p className="text-[10px] text-white uppercase tracking-widest">LinkedIn</p>
                      <p className="text-sm font-medium text-white/70 group-hover:text-white/50 transition-colors duration-200">View Profile →</p>
                    </div>
                  </a>
                </div>
              </div>

            </div>

      

          </div>
        </div>
      </main>

      {/* ── Edit drawer ── */}
      {editing && (
        <EditPanel
          profile={userProfile}
          onSave={handleSave}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;