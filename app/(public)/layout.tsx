import Navbar from "../components/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    // Tambahkan flex, flex-col, dan min-h-screen di sini
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* flex-grow akan membuat area ini mengisi sisa layar */}
      <main className="flex-grow">{children}</main>
      
      {/* Nanti kalau ada Footer, Anda bisa taruh di bawah sini */}
    </div>
  );
}