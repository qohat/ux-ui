export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-primary">FINAZACTIVOS</h1>
        </div>
      </header>
      <main className="py-8">{children}</main>
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>&copy; 2026 FINAZACTIVOS. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
