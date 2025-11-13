export function Location() {
  return (
    <section id="location" className="py-16 text-center">
      <div className="mx-auto max-w-4xl px-8">
        <h2 className="text-4xl font-bold text-primary-navy mb-8">Location</h2>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Amman,+Dhirar+Bin+Al-Azwar+Street+57"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <div className="rounded-2xl border-2 border-primary-blue/10 bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer">
            <div className="text-6xl mb-4">📍</div>
            <p className="text-xl font-bold text-gray-900 mb-2">
              Amman, Dhirar Bin Al-Azwar Street 57
            </p>
            <p className="text-gray-600 mb-1">Various locations for different sports</p>
            <p className="text-gray-600 mb-4">Exact meeting points will be provided upon registration</p>
            <p className="text-accent-orange font-bold">Click to open in Google Maps</p>
          </div>
        </a>
      </div>
    </section>
  );
}
