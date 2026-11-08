"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase"; // Import supabase

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Login menggunakan Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg("Email atau Password salah!");
      setIsLoading(false);
    } else {
      // Jika berhasil, buat cookie sederhana sebagai penanda di browser
      document.cookie = "operator_token=rahasia_ppdb; path=/; max-age=86400";
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sisi Kiri: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <Link href="/" className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
            <span className="text-3xl">🎓</span> PPDB Sekolah
          </Link>
        </div>
        <div className="relative z-10 mb-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Sistem Informasi <br /> Operator PPDB
          </h2>
          <p className="text-blue-100 text-lg max-w-md">
            Kelola pendaftaran, perbarui visi & misi, dan atur galeri sekolah dengan mudah dalam satu platform.
          </p>
        </div>
        <div className="relative z-10 text-blue-200 text-sm">
          © 2026 PPDB Sekolah Kami. All rights reserved.
        </div>
      </div>

      {/* Sisi Kanan: Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang 👋</h1>
            <p className="text-gray-500">Silakan masuk ke akun operator Anda.</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Operator</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="admin@sekolah.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white py-3.5 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-0.5 ${
                isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
              }`}
            >
              {isLoading ? "Memproses..." : "Masuk ke Dashboard"}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
              <span>←</span> Kembali ke Beranda Utama
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
