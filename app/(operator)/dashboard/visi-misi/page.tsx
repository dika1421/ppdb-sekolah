"use client";

import { useEffect, useState } from "react";
import { defaultVisi, defaultMisi } from "../../../data";

export default function OperatorVisiMisiPage() {
  const [visi, setVisi] = useState(defaultVisi);
  const [misi, setMisi] = useState(defaultMisi.join("\n"));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedVisi = localStorage.getItem("ppdb_visi");
    const savedMisi = localStorage.getItem("ppdb_misi");
    if (savedVisi) setVisi(savedVisi);
    if (savedMisi) setMisi(JSON.parse(savedMisi).join("\n"));
  }, []);

  const handleSave = () => {
    localStorage.setItem("ppdb_visi", visi);
    localStorage.setItem("ppdb_misi", JSON.stringify(misi.split("\n").filter(t => t.trim() !== "")));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Visi & Misi</h1>
        <p className="text-gray-500 mt-1">Ubah teks yang akan tampil di halaman depan sekolah.</p>
      </div>

      {saved && <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl font-medium">✅ Perubahan berhasil disimpan!</div>}

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Visi Sekolah</label>
          <textarea
            value={visi}
            onChange={(e) => setVisi(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 h-32 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
            placeholder="Tuliskan visi sekolah..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Misi Sekolah (Pisahkan dengan Enter)</label>
          <textarea
            value={misi}
            onChange={(e) => setMisi(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 h-56 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700 leading-relaxed"
            placeholder="Tuliskan misi sekolah, satu baris satu misi..."
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}