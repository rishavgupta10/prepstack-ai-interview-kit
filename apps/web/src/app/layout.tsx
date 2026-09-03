import "./globals.css";
import { QueryProvider } from "@/shared/providers/query-provider";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-w-screen overflow-x-hidden">
      <body className={`bg-[#f8fafc] text-slate-950 antialiased selection:bg-purple-100 selection:text-purple-900 ${spaceGrotesk.variable}`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}