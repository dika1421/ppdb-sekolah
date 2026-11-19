"use client";

import { useEffect, useState } from "react";
import { defaultGaleri } from "../../data";

export default function GaleriPage() {
  const [galeri, setGaleri] = useState<any[]>([]);
  const [filterKategori, setFilterKategori] = useState("Semua");

  useEffect(() => {
    const saved = localStorage.getItem("ppdb_galeri");
    if (saved) {
      setGaleri(JSON.parse(saved));
    } else {
      setGaleri(defaultGaleri);
    }
  }, []);

  const daftarKategori = ["Semua", "Ruang Kelas", "Laboratorium", "Ekstrakurikuler", "Fasilitas Umum", "Kegiatan Sekolah"];

  const filteredGaleri = filterKategori === "Semua" 
    ? galeri 
    : galeri.filter(item => item.kategori === filterKategori);

  return (
    // 1. Latar belakang dibuat transparan, beri pt-32 agar tidak tertutup navbar
    <main className="min-h-screen bg-transparent pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          {/* 2. Warna teks diubah menjadi putih */}
          <h1 className="text-3xl font-bold text-white mb-2">Galeri Sekolah</h1>
          <p className="text-slate-300">Melihat lebih dekat fasilitas dan kegiatan kami.</p>
        </div>

        {/* Tombol Filter Kategori */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {daftarKategori.map((kategori) => (
            <button
              key={kategori}
              onClick={() => setFilterKategori(kategori)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filterKategori === kategori
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/30" // Warna aktif disesuaikan dengan tombol navbar
                  : "bg-slate-800/80 backdrop-blur-md text-slate-300 border border-slate-600 hover:bg-slate-700" // Warna tidak aktif transparan
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>
        
        {/* Grid Galeri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGaleri.length > 0 ? (
            filteredGaleri.map((item: any) => (
              // 3. Kartu diubah menjadi transparan gelap
              <div key={item.id} className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700 overflow-hidden group hover:shadow-2xl hover:bg-slate-800 transition-all duration-300">
                {item.gambar ? (
                  <img src={item.gambar} alt={item.judul} className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="h-48 bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover:bg-slate-700 transition-colors">
                    <span>[ Tanpa Foto ]</span>
                  </div>
                )}
                <div className="p-5 text-center">
                  <span className="text-xs font-semibold text-blue-300 bg-blue-900/50 px-2 py-1 rounded-md mb-2 inline-block">
                    {item.kategori || "Umum"}
                  </span>
                  <h2 className="font-semibold text-white">{item.judul}</h2>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-slate-400">
              Belum ada foto untuk kategori ini.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}