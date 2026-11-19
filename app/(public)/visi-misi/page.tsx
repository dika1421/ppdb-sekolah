"use client";

import { useEffect, useState } from "react";
import { defaultVisi, defaultMisi } from "../../data"; 

export default function VisiMisiPage() {
  const [visi, setVisi] = useState(defaultVisi);
  const [misi, setMisi] = useState(defaultMisi);

  useEffect(() => {
    const savedVisi = localStorage.getItem("ppdb_visi");
    const savedMisi = localStorage.getItem("ppdb_misi");

    if (savedVisi) setVisi(savedVisi);
    if (savedMisi) setMisi(JSON.parse(savedMisi));
  }, []);

  return (
    // 1. Latar belakang dibuat transparan, dan diberikan pt-32 agar tidak tertutup navbar
    <main className="min-h-screen bg-transparent pt-32 pb-20 px-6">
      
      {/* 2. Kotak dibuat semi-transparan gelap (glassmorphism) */}
      <div className="max-w-3xl mx-auto bg-slate-800/80 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-700">
        
        {/* 3. Judul diubah menjadi putih */}
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Visi & Misi</h1>
        
        <div className="mb-10">
          {/* 4. Sub-judul diubah menjadi putih */}
          <h2 className="text-xl font-bold text-white mb-3">Visi</h2>
          {/* 5. Teks visi diubah menjadi terang dengan latar transparan biru */}
          <p className="text-slate-200 leading-relaxed bg-blue-900/50 p-5 rounded-xl border-l-4 border-blue-400">
            {visi}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Misi</h2>
          {/* 6. Teks misi diubah menjadi terang */}
          <ul className="list-disc list-outside ml-5 text-slate-300 space-y-3 leading-relaxed">
            {misi.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}