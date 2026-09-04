import { ResumeFile } from "@/shared/types/resume.types";
import {
  Download,
  Eye,
  FileText,
  Loader2,
  RefreshCw,
  Trash2,
  Upload,
} from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { useUploadResume } from "../hooks/use-upload-resume";
import Notiflix from "notiflix";

interface ResumeUploadFormProps {
  formClose: () => void;
}

const ResumeUploadForm = ({ formClose }: ResumeUploadFormProps) => {
  const { mutate, isPending, error } = useUploadResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<ResumeFile | null>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setResume({
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      file,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function formatSize(bytes: number) {
    const kb = bytes / 1024;
    return kb > 1024 ? (kb / 1024).toFixed(1) + " MB" : Math.round(kb) + " KB";
  }

  const handleUploadResume = () => {
    if (!resume?.file) return;

    mutate(resume.file, {
      onSuccess: () => {
        formClose();
      },
      onError: (error) => {
        Notiflix.Notify.failure(error.message || "An error occurred while uploading the resume.");
      },
    });
  };

  return (
    <div className="mt-4">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <FileText size={14} className="text-purple-600" /> Upload Resume
          Document
        </p>

        {!resume ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all shadow-2xs">
              <Upload
                size={18}
                className="text-purple-600 group-hover:text-white transition-colors"
              />
            </div>
            <p className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
              Click to choose file or drag and drop
            </p>
            <p className="text-xs text-slate-400 font-semibold">
              PDF or DOCX (10 MB maximum size)
            </p>
          </div>
        ) : (
          <div className="border border-slate-200 bg-slate-50/70 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0 shadow-2xs">
                <FileText size={18} className="text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-950 truncate">
                  {resume.name}
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  {formatSize(resume.size)}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {[
                {
                  Icon: Eye,
                  label: "View",
                  onClick: () => window.open(resume.url, "_blank"),
                },
                {
                  Icon: Download,
                  label: "Download",
                  onClick: () => {
                    const a = document.createElement("a");
                    a.href = resume.url;
                    a.download = resume.name;
                    a.click();
                  },
                },
                {
                  Icon: RefreshCw,
                  label: "Replace",
                  onClick: () => fileInputRef.current?.click(),
                },
                {
                  Icon: Trash2,
                  label: "Remove",
                  onClick: () => setResume(null),
                },
              ].map(({ Icon, label, onClick }) => (
                <button
                  key={label}
                  type="button"
                  onClick={onClick}
                  title={label}
                  className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-purple-600 hover:border-purple-200 transition-all shadow-2xs"
                >
                  <Icon size={12} /> {label}
                </button>
              ))}
            </div>

            {error && (
              <p className="text-rose-700 text-xs font-semibold p-3 border border-rose-200 bg-rose-50 rounded-xl">
                {error?.message ?? "Upload failed. Please try again."}
              </p>
            )}

            <button
              disabled={isPending}
              onClick={handleUploadResume}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-purple-500/20 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Uploading & Extracting...</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>Confirm & Upload Resume</span>
                </>
              )}
            </button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );
};

export default ResumeUploadForm;
