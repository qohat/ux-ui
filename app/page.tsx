import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          FINAZACTIVOS
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Portal de Solicitud y Evaluación de Créditos
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/solicitud"
            className="block p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Solicitar Crédito
            </h2>
            <p className="text-gray-600">
              Complete su solicitud de crédito en 6 sencillos pasos
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="block p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Portal Asesor
            </h2>
            <p className="text-gray-600">
              Acceso para asesores - Evaluación y gestión de solicitudes
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
