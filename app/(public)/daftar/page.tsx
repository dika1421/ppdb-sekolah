"use client";

import { useState } from "react";
// Import fungsi Server Action yang baru kita buat
import { simpanPendaftar } from "../actions/pendaftaran"; 

export default function DaftarPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fungsi ini akan dipanggil oleh form
  async function handleClientAction(formData: FormData) {
    setLoading(true);
    try {
      // Panggil fungsi dari Server Action
      await simpanPendaftar(formData);
      setSubmitted(true);
    } catch (error) {
      alert("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  // Tampilan jika berhasil submit
  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-transparent pt-20 px-6">
        <div className="bg-slate-800/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-slate-700 text-center">
          <h1 className="text-2xl font-bold text-green-400">
            Pendaftaran Berhasil Dikirim
          </h1>
          <p className="mt-2 text-slate-300">
            Tim kami akan menghubungi Anda melalui WhatsApp.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent pt-32 pb-20 px-6">
      <div className="max-w-xl mx-auto bg-slate-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700">
        
        <h1 className="text-2xl font-bold text-white mb-6">Formulir Pendaftaran</h1>
        
        {/* KUNCI PERUBAHAN 1: Gunakan action={handleClientAction} bukan onSubmit */}
        <form action={handleClientAction} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nama Lengkap</label>
            {/* KUNCI PERUBAHAN 2: Tambahkan atribut name="nama" */}
            <input
              name="nama"
              required
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              placeholder="Nama calon siswa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Asal Sekolah</label>
            {/* KUNCI PERUBAHAN 3: Tambahkan atribut name="asalSekolah" */}
            <input
              name="asalSekolah"
              required
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              placeholder="SD asal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nomor WhatsApp</label>
            {/* KUNCI PERUBAHAN 4: Tambahkan atribut name="wa" */}
            <input
              name="wa"
              required
              type="tel"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              placeholder="08xxxxxxxxxx"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3.5 rounded-lg font-semibold hover:bg-green-600 transition-all shadow-lg shadow-green-500/30 transform hover:-translate-y-0.5 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Mengirim Data..." : "Kirim Pendaftaran"}
          </button>
        </form>

      </div>
    </main>
  );
}