"use client";

import { useEffect, useState } from "react";

export default function GaleriPage() {
  const [galeri, setGaleri] = useState<any[]>([]);
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/galeri");
      const data = await res.json();
      setGaleri(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const daftarKategori = ["Semua", "Ruang Kelas", "Laboratorium", "Ekstrakurikuler", "Fasilitas Umum", "Program Jurusan"];

  const filteredGaleri = filterKategori === "Semua" 
    ? galeri 
    : galeri.filter(item => item.kategori === filterKategori);

  return (
    <main className="min-h-screen bg-transparent pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Galeri Sekolah</h1>
          <p className="text-slate-300">Melihat lebih dekat fasilitas dan kegiatan kami.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {daftarKategori.map((kategori) => (
            <button
              key={kategori}
              onClick={() => setFilterKategori(kategori)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filterKategori === kategori
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/30" 
                  : "bg-slate-800/80 backdrop-blur-md text-slate-300 border border-slate-600 hover:bg-slate-700"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-10 text-slate-400">Memuat galeri...</div>
          ) : filteredGaleri.length > 0 ? (
            filteredGaleri.map((item: any) => (
              <div key={item.id} className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700 overflow-hidden group hover:shadow-2xl hover:bg-slate-800 transition-all duration-300">
                {item.gambar ? (
                  <img src={item.gambar} alt={item.judul} className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="h-48 bg-slate-700/50 flex items-center justify-center text-slate-400">
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