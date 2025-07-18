'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/services';
import { Menu, X, Phone, Wrench, Car } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Wrench className="h-6 w-6 text-blue-600" />
              <Car className="h-6 w-6 text-amber-500" />
            </div>
            <span className="font-bold text-xl text-gray-900">{COMPANY_INFO.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/handyman" className="text-gray-700 hover:text-blue-600 transition-colors">
              Handyman
            </Link>
            <Link href="/mechanic" className="text-gray-700 hover:text-blue-600 transition-colors">
              Mobile Mechanic
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="/crm" className="text-gray-700 hover:text-blue-600 transition-colors">
              CRM
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
              Admin
            </Link>
          </nav>

          {/* Phone & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">{COMPANY_INFO.phone}</span>
            </a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/handyman" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Handyman
              </Link>
              <Link 
                href="/mechanic" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Mobile Mechanic
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/crm" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                CRM
              </Link>
              <Link 
                href="/admin" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <div className="px-3 py-2 border-t border-gray-200 mt-2">
                <a 
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center space-x-2 text-gray-700 mb-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}