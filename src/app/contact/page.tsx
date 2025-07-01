import React from 'react';
import { ContactForm } from '@/components/ContactForm';
import { COMPANY_INFO } from '@/lib/services';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Contact <span className="text-blue-600">QuickFix Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to get started? Contact us today for a free estimate or to schedule your handyman or mobile mechanic service.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  We&apos;re here to help with all your handyman and automotive needs. Contact us using any of the methods below.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <a 
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Call for immediate assistance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <a 
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Service Area</h3>
                    <p className="text-gray-700">{COMPANY_INFO.address}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Serving: {COMPANY_INFO.serviceAreas.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-700">{COMPANY_INFO.hours}</p>
                    <p className="text-sm text-gray-500 mt-1">Emergency services available</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <MessageCircle className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-900">Emergency Service</h3>
                </div>
                <p className="text-red-700 mb-3">
                  For urgent plumbing, electrical, or automotive emergencies, call us immediately.
                </p>
                <a 
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Emergency Call</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Service Area</h2>
            <p className="text-lg text-gray-600">
              We proudly serve the following areas with professional handyman and mobile mechanic services.
            </p>
          </div>
          
          {/* Static Map Placeholder */}
          <div className="bg-blue-100 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Area Map</h3>
              <p className="text-gray-600 mb-4">Interactive map coming soon</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
                {COMPANY_INFO.serviceAreas.map((area, index) => (
                  <div key={index} className="bg-white rounded-lg px-4 py-2 text-center">
                    <span className="text-gray-700 font-medium">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}