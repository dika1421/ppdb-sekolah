"use client";

import { useEffect, useState } from "react";
import { defaultGaleri } from "../../../data";

export default function OperatorGaleriPage() {
  const [galeri, setGaleri] = useState<any[]>([]);
  const [newJudul, setNewJudul] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("ppdb_galeri");
    if (saved) {
      setGaleri(JSON.parse(saved));
    } else {
      setGaleri(defaultGaleri);
    }
  }, []);

  const saveToLocalStorage = (data: any[]) => {
    setGaleri(data);
    localStorage.setItem("ppdb_galeri", JSON.stringify(data));
  };

  const handleAdd = () => {
    if (!newJudul.trim()) return;
    const newItem = { id: Date.now(), judul: newJudul };
    saveToLocalStorage([...galeri, newItem]);
    setNewJudul("");
  };

  const handleDelete = (id: number) => {
    const updated = galeri.filter((item) => item.id !== id);
    saveToLocalStorage(updated);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Galeri Sekolah</h1>
        <p className="text-gray-500 mt-1">Tambahkan atau hapus daftar foto yang tampil di halaman publik.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {/* Form Tambah Galeri */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <input
            type="text"
            value={newJudul}
            onChange={(e) => setNewJudul(e.target.value)}
            placeholder="Nama/Judul Foto (Misal: Ruang Guru)"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            + Tambah
          </button>
        </div>

        {/* Grid List Galeri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galeri.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-between bg-white hover:shadow-md transition-shadow">
              <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 mb-3 text-sm">
                [ Foto ]
              </div>
              <span className="font-medium text-gray-800 text-center mb-4">{item.judul}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 text-sm font-semibold hover:text-red-800 bg-red-50 px-4 py-2 rounded-lg w-full transition-colors"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}