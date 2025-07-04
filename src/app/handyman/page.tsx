'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SERVICES, QUALITY_WORK, COMPANY_INFO } from '@/lib/services';
import { BookingModal } from '@/components/BookingModal';
import { Star, CheckCircle, Phone } from 'lucide-react';
import Link from 'next/link';

export default function HandymanPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const service = SERVICES.handyman;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">5.0 (150+ reviews)</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Professional <span className="text-blue-600">Handyman Services</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">{service.description}</p>
              
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-2xl font-bold text-blue-600">{service.priceRange}</span>
                <span className="text-gray-500">• Licensed & Insured</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
                >
                  Book Handyman Service
                </button>
                <a 
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center justify-center space-x-2 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call {COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square bg-blue-100 rounded-2xl overflow-hidden">
                <Image 
                  src="/images/handyman-faucet.png"
                  alt="Professional Handyman TV Mounting and Electrical Work"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Handyman Services</h2>
              <div className="space-y-4">
                {service.bullets.map((bullet, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us?</h2>
              <div className="space-y-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Service Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Professional TV Mounting & Electrical Work
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our skilled technicians handle everything from TV mounting to electrical installations with precision and care. We ensure your home entertainment setup is both functional and aesthetically pleasing.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Professional TV mounting on any wall type</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Cable management and wire concealment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Safe electrical connections and outlet installation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Clean, professional finish guaranteed</span>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <Image
                src="/images/handyman-faucet.png"
                alt="Handyman mounting TV and electrical work"
                width={600}
                height={600}
                className="rounded-lg object-cover shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <span className="font-semibold">Professional Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            More of Our Quality Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUALITY_WORK.map((item, index) => (
              <div key={item.title} className="overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow">
                {item.img ? (
                  <div className="relative">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      width={500}
                      height={400}
                      className="object-cover w-full h-60 hover:scale-105 transition-transform duration-300"
                      priority={index === 0}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      <p className="text-white/90 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-60 items-center justify-center bg-amber-50 p-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {service.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready for Professional Handyman Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a free estimate today and experience quality workmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Book Service Now
            </button>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        preSelectedService="handyman"
      />
    </div>
  );
}