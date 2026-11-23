"use client";

import { useEffect, useState } from "react";

export default function PublicVisiMisiPage() {
  const [dataVisiMisi, setDataVisiMisi] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/galeri?type=visi-misi");
      const data = await res.json();
      setDataVisiMisi(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const visi = dataVisiMisi.filter((item) => item.tipe === "Visi");
  const misi = dataVisiMisi.filter((item) => item.tipe === "Misi");

  return (
    <main className="min-h-screen bg-transparent pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Visi & Misi</h1>
          <p className="text-slate-300">Arah dan tujuan sekolah kami.</p>
        </div>

        {isLoading ? (
          <div className="text-center text-slate-400 py-10">Memuat data...</div>
        ) : (
          <div className="space-y-8">
            
            {/* Bagian Visi */}
            {visi.length > 0 && (
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-600 pb-4">Visi Kami</h2>
                <div className="space-y-4"> {/* Ditambah space-y-4 agar jarak antar paragraf rapi */}
                  {visi.map((item) => (
                    <p key={item.id} className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap">
                      {/* Membersihkan angka manual di depan teks visi (jika ada) */}
                      {item.konten.replace(/^\d+\.\s*/, '')}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Bagian Misi */}
            {misi.length > 0 && (
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-600 pb-4">Misi Kami</h2>
                <ul className="space-y-4">
                  {misi.map((item, index) => (
                    <li key={item.id} className="flex gap-4 text-slate-200 text-lg leading-relaxed">
                      <span className="font-bold text-green-400 shrink-0">{index + 1}.</span>
                      <span className="whitespace-pre-wrap">
                        {/* Membersihkan angka manual di depan teks misi (jika ada) */}
                        {item.konten.replace(/^\d+\.\s*/, '')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Jika kosong */}
            {visi.length === 0 && misi.length === 0 && (
              <div className="text-center text-slate-400 py-10">
                Belum ada data Visi & Misi.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}