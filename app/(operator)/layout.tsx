export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}