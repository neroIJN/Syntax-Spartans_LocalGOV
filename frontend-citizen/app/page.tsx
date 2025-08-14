export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">
          e-Services Sri Lanka
        </h1>
        <p className="text-neutral-600 mb-8">
          Centralized appointment booking system for Sri Lankan government services
        </p>
        <div className="bg-white p-6 rounded-xl shadow-soft max-w-2xl">
          <h2 className="text-xl font-semibold text-primary-600 mb-4">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-neutral-200 rounded-lg hover:shadow-medium transition-shadow">
              <h3 className="font-medium text-neutral-900">Grama Niladhari Services</h3>
              <p className="text-sm text-neutral-600 mt-1">Local administrative services</p>
            </div>
            <div className="p-4 border border-neutral-200 rounded-lg hover:shadow-medium transition-shadow">
              <h3 className="font-medium text-neutral-900">Divisional Secretariat</h3>
              <p className="text-sm text-neutral-600 mt-1">Regional government services</p>
            </div>
          </div>
          <p className="text-sm text-neutral-500 mt-6">
            🚧 Under Development - Phase 1 Implementation Coming Soon
          </p>
        </div>
      </div>
    </main>
  )
}