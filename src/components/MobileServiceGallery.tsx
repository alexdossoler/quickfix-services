import React from 'react';
import Image from 'next/image';

const MOBILE_SERVICES = [
  {
    title: 'Engine Diagnostics',
    desc: 'Professional computer diagnostics and troubleshooting',
    img: '/images/mobile-mechanic/mechanic-1.jpg'
  },
  {
    title: 'Tire Change Service', 
    desc: 'On-site tire replacement and repair services',
    img: '/images/mobile-mechanic/tire-change.jpg'
  },
  {
    title: 'Brake Service',
    desc: 'Professional brake inspection and repair',
    img: '/images/mobile-mechanic/brake-service.jpg'
  },
  {
    title: 'Mobile Diagnostics',
    desc: 'Advanced vehicle diagnostics at your location',
    img: '/images/mobile-mechanic/diagnostic.jpg'
  }
];

export default function MobileServiceGallery() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Our Mobile Mechanic Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOBILE_SERVICES.map((service) => (
            <div key={service.title} className="overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow">
              <div className="relative">
                <Image
                  src={service.img}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48 hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-lg">{service.title}</h3>
                  <p className="text-white/90 text-sm">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
