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

  // Daftar tombol kategori
  const daftarKategori = ["Semua", "Ruang Kelas", "Laboratorium", "Ekstrakurikuler", "Fasilitas Umum", "Kegiatan Sekolah"];

  // Menyaring foto berdasarkan kategori yang diklik
  const filteredGaleri = filterKategori === "Semua" 
    ? galeri 
    : galeri.filter(item => item.kategori === filterKategori);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Galeri Sekolah</h1>
          <p className="text-gray-600 mt-2">Melihat lebih dekat fasilitas dan kegiatan kami.</p>
        </div>

        {/* Tombol Filter Kategori */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {daftarKategori.map((kategori) => (
            <button
              key={kategori}
              onClick={() => setFilterKategori(kategori)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filterKategori === kategori
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
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
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                {item.gambar ? (
                  <img src={item.gambar} alt={item.judul} className="w-full h-48 object-cover" />
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 transition-colors">
                    <span>[ Tanpa Foto ]</span>
                  </div>
                )}
                <div className="p-5 text-center">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">
                    {item.kategori || "Umum"}
                  </span>
                  <h2 className="font-semibold text-gray-800">{item.judul}</h2>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              Belum ada foto untuk kategori ini.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}