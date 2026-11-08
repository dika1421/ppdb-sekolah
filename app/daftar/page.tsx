"use client";

import { useState } from "react";

export default function DaftarPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h1 className="text-2xl font-bold text-green-600">
            Pendaftaran Berhasil Dikirim
          </h1>
          <p className="mt-2 text-gray-600">
            Tim kami akan menghubungi Anda melalui WhatsApp.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Formulir Pendaftaran</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Nama calon siswa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Asal Sekolah</label>
            <input
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="SD asal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nomor WhatsApp</label>
            <input
              required
              type="tel"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="08xxxxxxxxxx"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Kirim Pendaftaran
          </button>
        </form>
      </div>
    </main>
  );
}