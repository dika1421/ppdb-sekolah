"use client";

import { useEffect, useState } from "react";
import { defaultGaleri } from "../../data";

export default function GaleriPage() {
  const [galeri, setGaleri] = useState(defaultGaleri);

  useEffect(() => {
    const savedGaleri = localStorage.getItem("ppdb_galeri");
    if (savedGaleri) {
      setGaleri(JSON.parse(savedGaleri));
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Galeri Sekolah</h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galeri.map((item: any) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 transition-colors">
                <span>[ Foto {item.judul} ]</span>
              </div>
              <div className="p-5 text-center">
                <h2 className="font-semibold text-gray-800">{item.judul}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}