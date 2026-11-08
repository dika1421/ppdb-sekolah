"use client";

import { useEffect, useState } from "react";
import { defaultVisi, defaultMisi } from "../../data"; // Sesuaikan path jika perlu

export default function VisiMisiPage() {
  const [visi, setVisi] = useState(defaultVisi);
  const [misi, setMisi] = useState(defaultMisi);

  useEffect(() => {
    // Ambil data dari localStorage jika ada
    const savedVisi = localStorage.getItem("ppdb_visi");
    const savedMisi = localStorage.getItem("ppdb_misi");

    if (savedVisi) setVisi(savedVisi);
    if (savedMisi) setMisi(JSON.parse(savedMisi));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Visi & Misi</h1>
        
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Visi</h2>
          <p className="text-gray-600 leading-relaxed bg-blue-50 p-5 rounded-xl border-l-4 border-blue-600">
            {visi}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Misi</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-3 leading-relaxed">
            {misi.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}