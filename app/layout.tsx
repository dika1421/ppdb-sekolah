import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PPDB Sekolah Kami",
  description: "Website Pendaftaran Peserta Didik Baru",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      {/* body saya sesuaikan kelasnya */}
      <body className="min-h-full flex flex-col bg-gray-50">
        {/* Navbar dipanggil di sini */}
        <Navbar />
        
        {/* Konten halaman dibungkus di dalam main */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}