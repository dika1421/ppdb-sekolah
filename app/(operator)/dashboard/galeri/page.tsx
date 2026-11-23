"use client";

import { useEffect, useState } from "react";

export default function OperatorGaleriPage() {
  const [galeri, setGaleri] = useState<any[]>([]);
  const [newJudul, setNewJudul] = useState("");
  const [newKategori, setNewKategori] = useState("Ruang Kelas");
  const [fileGambar, setFileGambar] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const loadGaleri = async () => {
    const res = await fetch("/api/galeri");
    const data = await res.json();
    setGaleri(data);
  };

  useEffect(() => {
    loadGaleri();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJudul || !fileGambar) {
      alert("Judul dan Gambar wajib diisi!");
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload ke Cloudinary
      const formData = new FormData();
      formData.append("file", fileGambar);
      formData.append("upload_preset", "GANTI_PRESET_KAMU"); // <--- GANTI DENGAN PRESET CLOUDINARY ANDA
      
      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/GANTI_CLOUD_NAME/image/upload", // <--- GANTI DENGAN CLOUD NAME ANDA
        { method: "POST", body: formData }
      );
      
      const cloudinaryData = await cloudinaryRes.json();
      const imageUrl = cloudinaryData.secure_url;

      // 2. Simpan URL ke Neon via API
      await fetch("/api/galeri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul: newJudul, kategori: newKategori, gambar: imageUrl }),
      });

      setNewJudul("");
      setFileGambar(null);
      loadGaleri();
      alert("Gambar berhasil ditambahkan!");
    } catch (error) {
      alert("Gagal upload gambar.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus gambar ini?")) return;
    await fetch(`/api/galeri/${id}`, { method: "DELETE" });
    loadGaleri();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Galeri Sekolah</h1>
        <p className="text-gray-500 mt-1">Tambahkan atau kelola foto galeri yang tampil di halaman publik.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Judul Foto</label>
              <input
                type="text"
                value={newJudul}
                onChange={(e) => setNewJudul(e.target.value)}
                placeholder="Misal: Ruang Guru"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Foto</label>
              <select
                value={newKategori}
                onChange={(e) => setNewKategori(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Ruang Kelas">Ruang Kelas</option>
                <option value="Laboratorium">Laboratorium</option>
                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                <option value="Fasilitas Umum">Fasilitas Umum</option>
                <option value="Program Jurusan">Program Jurusan</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Upload Foto (Wajib)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFileGambar(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-2 w-max disabled:bg-gray-400"
          >
            {isUploading ? "Mengunggah..." : "+ Tambah ke Galeri"}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galeri.map((item) => (
          <div key={item.id} className="border rounded-xl overflow-hidden flex flex-col bg-white shadow-sm">
            <img src={item.gambar} alt={item.judul} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div className="text-center mb-4">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">
                  {item.kategori}
                </span>
                <div className="font-medium text-gray-800">{item.judul}</div>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 text-sm font-semibold hover:text-red-800 bg-red-50 px-3 py-2 rounded-lg w-full transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}