"use client";

import { useEffect, useState } from "react";
import { defaultGaleri } from "../../../data";

export default function OperatorGaleriPage() {
  const [galeri, setGaleri] = useState<any[]>([]);
  const [newJudul, setNewJudul] = useState("");
  const [newKategori, setNewKategori] = useState("Ruang Kelas"); // Kategori default
  const [newGambar, setNewGambar] = useState<string | null>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGambar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (!newJudul.trim()) {
      alert("Judul foto harus diisi!");
      return;
    }
    
    const newItem = { 
      id: Date.now(), 
      judul: newJudul,
      kategori: newKategori, // Simpan kategorinya
      gambar: newGambar 
    };
    
    saveToLocalStorage([...galeri, newItem]);
    setNewJudul("");
    setNewGambar(null);
  };

  const handleDelete = (id: number) => {
    const updated = galeri.filter((item) => item.id !== id);
    saveToLocalStorage(updated);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Galeri Sekolah</h1>
        <p className="text-gray-500 mt-1">Tambahkan atau hapus foto galeri yang tampil di halaman publik.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Form Tambah Galeri */}
        <div className="flex flex-col gap-4 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Judul Foto</label>
              <input
                type="text"
                value={newJudul}
                onChange={(e) => setNewJudul(e.target.value)}
                placeholder="Misal: Ruang Guru"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Foto</label>
              <select
                value={newKategori}
                onChange={(e) => setNewKategori(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
              >
                <option value="Ruang Kelas">Ruang Kelas</option>
                <option value="Laboratorium">Laboratorium</option>
                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                <option value="Fasilitas Umum">Fasilitas Umum</option>
                <option value="Kegiatan Sekolah">Kegiatan Sekolah</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Upload Foto (Opsional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
            />
          </div>

          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors self-start mt-2"
          >
            + Tambah ke Galeri
          </button>
        </div>

        {/* Grid List Galeri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galeri.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden flex flex-col bg-white hover:shadow-md transition-shadow">
              {item.gambar ? (
                <img src={item.gambar} alt={item.judul} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  [ Tanpa Foto ]
                </div>
              )}
              
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div className="text-center mb-4">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">
                    {item.kategori || "Umum"}
                  </span>
                  <div className="font-medium text-gray-800">{item.judul}</div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 text-sm font-semibold hover:text-red-800 bg-red-50 px-4 py-2 rounded-lg w-full transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}