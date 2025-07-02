'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/Hero';
import { ServiceCard } from '@/components/ServiceCard';
import { BookingModal } from '@/components/BookingModal';
import { SERVICES, COMPANY_INFO } from '@/lib/services';
import { Shield, Clock, Award, MapPin } from 'lucide-react';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Professional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From home repairs to automotive service, we&apos;re your one-stop solution for quality, reliable work.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.values(SERVICES).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose QuickFix Services?
            </h2>
            <p className="text-xl text-gray-600">
              We&apos;re committed to providing exceptional service with every job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Licensed & Insured',
                description: 'Fully licensed professionals with comprehensive insurance coverage for your peace of mind.'
              },
              {
                icon: Clock,
                title: 'Fast Response',
                description: 'Same-day service available with quick response times for all your urgent needs.'
              },
              {
                icon: Award,
                title: 'Quality Guaranteed',
                description: 'All work backed by our satisfaction guarantee. We stand behind our craftsmanship.'
              },
              {
                icon: MapPin,
                title: 'Local Service',
                description: 'Proudly serving our community with personalized, local service you can trust.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today for a free estimate and experience the QuickFix difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Book Service Now
            </button>
            <a 
              href={`tel:${COMPANY_INFO.phone}`}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
            >
              Call {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
}