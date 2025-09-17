'use client';

export default function DualCTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* CTA 1 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[var(--color-navy-800)] mb-4">
            Direct taxi bestellen
          </h3>
          <a
            href="#"
            className="inline-flex items-center text-[var(--color-navy-800)] font-medium hover:underline"
          >
            Ga naar reserveringsformulier
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <hr className="mt-8 border-[var(--color-navy-800)]" />
        </div>

        {/* CTA 2 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[var(--color-navy-800)] mb-4">
            Chauffeur worden
          </h3>
          <a
            href="#"
            className="inline-flex items-center text-[var(--color-navy-800)] font-medium hover:underline"
          >
            Aanmelden als chauffeur
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <hr className="mt-8 border-[var(--color-navy-800)]" />
        </div>
      </div>
    </section>
  );
}
