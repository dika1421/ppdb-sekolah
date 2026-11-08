export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-grow">
      {children}
    </main>
  );
}