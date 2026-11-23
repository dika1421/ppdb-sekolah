"use client";

import { useEffect, useState } from "react";

export default function OperatorVisiMisiPage() {
  const [dataVisiMisi, setDataVisiMisi] = useState<any[]>([]);
  const [tipe, setTipe] = useState("Visi");
  const [konten, setKonten] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Ambil data dari API dengan parameter visi-misi
  const loadData = async () => {
    const res = await fetch("/api/galeri?type=visi-misi");
    const data = await res.json();
    setDataVisiMisi(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!konten) return;

    setIsLoading(true);
    try {
      const method = editId ? "PUT" : "POST";
      // Jika edit, gunakan URL dengan ID. Jika tambah, gunakan URL dasar.
      const url = editId 
        ? `/api/galeri/${editId}?type=visi-misi` 
        : "/api/galeri";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        // Kirim 'type' agar API tahu ini data visi-misi, bukan galeri
        body: JSON.stringify({ type: "visi-misi", tipe, konten }),
      });

      setKonten("");
      setTipe("Visi");
      setEditId(null);
      loadData();
      alert(editId ? "Berhasil diperbarui!" : "Data berhasil ditambahkan!");
    } catch (error) {
      alert("Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (item: any) => {
    setEditId(item.id);
    setTipe(item.tipe);
    setKonten(item.konten);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setTipe("Visi");
    setKonten("");
  };

  // 2. Hapus data dengan parameter visi-misi
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    await fetch(`/api/galeri/${id}?type=visi-misi`, { method: "DELETE" });
    loadData();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Visi & Misi</h1>
        <p className="text-gray-500 mt-1">Atur visi dan misi sekolah yang tampil di halaman publik.</p>
      </div>

      <div className={`bg-white p-8 rounded-2xl shadow-sm border mb-8 ${editId ? 'border-yellow-400' : 'border-gray-100'}`}>
        {editId && (
          <div className="mb-4 text-sm font-semibold text-yellow-700 bg-yellow-100 p-3 rounded-lg">
            ⚠️ Anda sedang mengedit data. Klik Batal untuk membatalkan.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tipe</label>
            <select
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="Visi">Visi</option>
              <option value="Misi">Misi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Isi Konten</label>
            <textarea
              value={konten}
              onChange={(e) => setKonten(e.target.value)}
              rows={4}
              placeholder="Tuliskan visi atau misi di sini..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? "Menyimpan..." : editId ? "Simpan Perubahan" : "+ Simpan Data"}
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

      {/* List Visi & Misi */}
      <div className="space-y-4">
        {dataVisiMisi.map((item) => (
          <div key={item.id} className={`bg-white p-6 rounded-xl border shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4 ${editId === item.id ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-100'}`}>
            <div className="flex-1">
              <span className={`text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block ${item.tipe === 'Visi' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                {item.tipe}
              </span>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{item.konten}</p>
            </div>
            
            <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleEditClick(item)}
                className="text-blue-600 text-sm font-semibold hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 text-sm font-semibold hover:text-red-800 bg-red-50 px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none"
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