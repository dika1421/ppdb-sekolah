"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // LOGIN SIMULASI: Nanti ini diganti dengan pengecekan ke Database
    if (username === "admin" && password === "admin123") {
      // Set cookie sederhana (berlaku 1 hari)
      document.cookie = "operator_token=rahasia_ppdb; path=/; max-age=86400";
      router.push("/dashboard");
    } else {
      alert("Username atau Password salah! (Gunakan admin / admin123)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Login Operator</h1>
          <p className="text-gray-500 text-sm mt-2">Sistem PPDB Sekolah Kami</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Masukkan username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Masuk ke Dashboard
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <a href="/" className="hover:text-blue-600 transition-colors">← Kembali ke Beranda Utama</a>
        </div>
      </div>
    </div>
  );
}