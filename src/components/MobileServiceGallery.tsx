'use client'

import Image from 'next/image'

/**
 * Path-string approach → missing files show as broken images in browser,
 * easier to spot and debug than compile-time import errors.
 */
const gallery = [
  {
    src: '/images/mobile-mechanic/tire-change.jpg',
    alt: 'Evening roadside tire change for a customer',
  },
  {
    src: '/images/image (4).png',
    alt: 'Mobile mechanic performing engine tune-up under the hood',
  },
  {
    src: '/images/image (10).png',
    alt: 'Technician installing new brake pads',
  },
  {
    src: '/images/image (12).png',
    alt: 'Professional engine diagnostics with laptop equipment',
  },
]

export default function MobileServiceGallery() {
  return (
    <section id="mobile-service" className="py-16">
      <h2 className="text-center text-3xl font-semibold mb-10">
        Our Mobile Service in Action
      </h2>

      {/* Responsive 1‑4 column grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto px-4">
        {gallery.map(({ src, alt }) => (
          <figure
            key={src}
            className="overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02] bg-white dark:bg-gray-800"
          >
            <Image
              src={src}
              alt={alt}
              width={600}
              height={600}
              className="object-cover h-64 w-full"
              priority={false}
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
