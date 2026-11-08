export default function VisiMisiPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Visi & Misi</h1>
        
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Visi</h2>
          <p className="text-gray-600 leading-relaxed bg-blue-50 p-5 rounded-xl border-l-4 border-blue-600">
            Menjadi lembaga pendidikan unggulan yang mencetak generasi berkarakter, berprestasi, dan berwawasan global yang berlandaskan iman dan taqwa.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Misi</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-3 leading-relaxed">
            <li>Menyelenggarakan pembelajaran yang aktif, inovatif, dan menyenangkan.</li>
            <li>Membentuk karakter siswa yang berakhlak mulia dan disiplin.</li>
            <li>Mengembangkan potensi bakat dan minat siswa melalui kegiatan ekstrakurikuler.</li>
            <li>Meningkatkan kualitas tenaga pendidik dan sarana prasarana sekolah.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}