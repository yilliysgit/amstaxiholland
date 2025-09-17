'use client';

const events = [
  {
    id: 1,
    title: 'Concerten',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  },
  {
    id: 2,
    title: 'Bruiloften',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
  },
  {
    id: 3,
    title: 'Bedrijfsfeesten',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
  },
  {
    id: 4,
    title: 'Sportevenementen',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  },
];

export default function EventsSection() {
  return (
    <section className="py-24 bg-gradient-mercedes-light">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT – GRID IMAGES */}
        <div className="grid grid-cols-2 gap-4">
          {events.map((item) => (
            <div
              key={item.id}
              className="relative h-56 w-full overflow-hidden rounded-xl mercedes-shadow"
              style={{ backgroundImage: `url(${item.image})`, backgroundSize:'cover', backgroundPosition:'center' }}
            />
          ))}
        </div>

        {/* RIGHT – CONTENT */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-gray-900)] mb-6">
            Evenementenvervoer voor elke gelegenheid
          </h2>
          <p className="text-lg text-[var(--color-gray-600)] mb-8 leading-relaxed max-w-lg">
            Of het nu gaat om een concert, bruiloft, bedrijfsfeest of
            sportevenement – wij zorgen ervoor dat je comfortabel en op tijd arriveert.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              'Groepsvervoer voor alle evenementen',
              'VIP shuttle services',
              'Flexibele planning en routing',
              'Professionele chauffeurs',
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-[var(--color-gray-700)]">
                <div className="w-2 h-2 bg-[var(--color-navy-600)] mr-4" />
                {item}
              </li>
            ))}
          </ul>

          <button className="bg-[var(--color-navy-700)] text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-[var(--color-navy-600)] transition-all">
            Plan je evenementenvervoer
          </button>
        </div>
      </div>
    </section>
  );
}
