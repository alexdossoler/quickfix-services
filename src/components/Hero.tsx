'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { COMPANY_INFO } from '@/lib/services';
import { Phone, Star, CheckCircle } from 'lucide-react';
import { BookingModal } from './BookingModal';

export function Hero() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-amber-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">5.0 (200+ reviews)</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Your Trusted{' '}
              <span className="text-blue-600">Handyman</span>{' '}
              &{' '}
              <span className="text-amber-500">Mobile Mechanic</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {COMPANY_INFO.tagline}. Licensed, insured, and ready to solve your home and automotive problems today.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                'Licensed & Insured',
                'Same-Day Service',
                'Transparent Pricing',
                'Quality Guaranteed'
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Book Service Now
              </button>
              <a 
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center justify-center space-x-2 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg"
              >
                <Phone className="h-5 w-5" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Service Areas */}
            <div className="mt-8 text-sm text-gray-500">
              <span className="font-medium">Service Areas: </span>
              {COMPANY_INFO.serviceAreas.join(', ')}
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-amber-100 rounded-2xl flex items-center justify-center">
              {/* Placeholder for hero image/mascot */}
              <div className="text-center">
                <div className="w-48 h-48 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto overflow-hidden">
                  <Image 
                    src="/images/handyman-icon.svg" 
                    alt="Professional handyman tools" 
                    width={96} 
                    height={96}
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-600 font-medium">Professional Service</p>
                <p className="text-gray-600">Home & Auto Repair</p>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Available Today</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">200+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </section>
  );
}