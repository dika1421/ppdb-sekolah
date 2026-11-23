"use client";

import { useEffect, useState } from "react";

export default function OperatorGaleriPage() {
  const [galeri, setGaleri] = useState<any[]>([]);
  const [newJudul, setNewJudul] = useState("");
  const [newKategori, setNewKategori] = useState("Ruang Kelas");
  const [fileGambar, setFileGambar] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // State untuk Edit
  const [editId, setEditId] = useState<number | null>(null);
  const [oldGambar, setOldGambar] = useState<string>("");

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
    
    if (!newJudul) {
      alert("Judul wajib diisi!");
      return;
    }
    
    if (!editId && !fileGambar) {
      alert("Gambar wajib diisi untuk data baru!");
      return;
    }

    setIsUploading(true);
    let imageUrl = oldGambar; // Gunakan gambar lama jika mode edit

    try {
      // Jika ada file baru yang dipilih, upload ke Cloudinary
      if (fileGambar) {
        const formData = new FormData();
        formData.append("file", fileGambar);
        formData.append("upload_preset", "galeri_sekolah"); // Sesuaikan dengan nama yang Anda buat
                
        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/biporxjh/image/upload", // Cloud Name Anda
          { method: "POST", body: formData }
        );
        
        const cloudinaryData = await cloudinaryRes.json();
        
        if (!cloudinaryData.secure_url) {
          throw new Error("Gagal upload ke Cloudinary. Cek Upload Preset Anda.");
        }
        
        imageUrl = cloudinaryData.secure_url;
      }

      // Simpan/Update ke API Neon
      const method = editId ? "PUT" : "POST";
      const url = editId ? `/api/galeri/${editId}` : "/api/galeri";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul: newJudul, kategori: newKategori, gambar: imageUrl }),
      });

      // Reset Form
      setNewJudul("");
      setFileGambar(null);
      setEditId(null);
      setOldGambar("");
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      loadGaleri();
      alert(editId ? "Berhasil diperbarui!" : "Gambar berhasil ditambahkan!");
    } catch (error: any) {
      alert(error.message || "Gagal upload gambar.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = (item: any) => {
    setEditId(item.id);
    setNewJudul(item.judul);
    setNewKategori(item.kategori);
    setOldGambar(item.gambar);
    setFileGambar(null); // File input dikosongkan
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setNewJudul("");
    setNewKategori("Ruang Kelas");
    setOldGambar("");
    setFileGambar(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
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

      <div className={`bg-white p-8 rounded-2xl shadow-sm border mb-8 ${editId ? 'border-yellow-400' : 'border-gray-100'}`}>
        
        {editId && (
          <div className="mb-4 text-sm font-semibold text-yellow-700 bg-yellow-100 p-3 rounded-lg">
            ⚠️ Anda sedang mengedit foto. Kosongkan input file jika tidak ingin mengganti gambar.
          </div>
        )}

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
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Upload Foto {editId ? "(Opsional)" : "(Wajib)"}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setFileGambar(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required={!editId} // Wajib hanya saat tambah baru
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={isUploading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isUploading ? "Menyimpan..." : editId ? "Simpan Perubahan" : "+ Tambah ke Galeri"}
            </button>
            
            {editId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galeri.map((item) => (
          <div key={item.id} className={`border rounded-xl overflow-hidden flex flex-col bg-white shadow-sm ${editId === item.id ? 'ring-2 ring-blue-500' : ''}`}>
            {item.gambar ? (
               <img src={item.gambar} alt={item.judul} className="w-full h-40 object-cover" />
            ) : (
               <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">[ Gambar Error ]</div>
            )}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div className="text-center mb-4">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">
                  {item.kategori}
                </span>
                <div className="font-medium text-gray-800">{item.judul}</div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-blue-600 text-sm font-semibold hover:text-blue-800 bg-blue-50 px-3 py-2 rounded-lg w-full transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 text-sm font-semibold hover:text-red-800 bg-red-50 px-3 py-2 rounded-lg w-full transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}