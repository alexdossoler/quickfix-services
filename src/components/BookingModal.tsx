'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Calendar, Check } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  urgency: string;
  address: string;
  message: string;
}

export function BookingModal({ isOpen, onClose, preSelectedService }: BookingModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>({
    defaultValues: {
      service: preSelectedService || '',
      urgency: 'normal'
    }
  });

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', 
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  const serviceOptions = [
    { value: 'plumbing', label: 'Plumbing Repairs & Fixtures' },
    { value: 'electrical', label: 'Electrical Work' },
    { value: 'carpentry', label: 'Furniture Assembly & Carpentry' },
    { value: 'painting', label: 'Drywall & Painting' },
    { value: 'handyman-other', label: 'Other Handyman Service' },
    { value: 'battery', label: 'Battery Replacement & Testing' },
    { value: 'brakes', label: 'Brake Service & Repair' },
    { value: 'oil-change', label: 'Oil Changes & Maintenance' },
    { value: 'diagnostics', label: 'Diagnostics & Engine Analysis' },
    { value: 'tires', label: 'Tire Service & Replacement' },
    { value: 'mechanic-other', label: 'Other Automotive Service' },
    { value: 'emergency', label: 'Emergency Service' }
  ];

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      // Post directly to Formspree for instant email delivery
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('service', data.service);
      formData.append('address', data.address);
      formData.append('preferredDate', data.preferredDate);
      formData.append('preferredTime', data.preferredTime);
      formData.append('urgency', data.urgency);
      formData.append('message', data.message);
      formData.append('type', 'booking');
      formData.append('_subject', `New Booking Request from ${data.name} - ${data.service}`);

      const response = await fetch('https://formspree.io/f/xwpbawgq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try calling us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Book Your Service</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            // Success State
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Request Submitted!</h3>
              <p className="text-gray-600 mb-6">
                We&apos;ll contact you within 1 hour to confirm your appointment and provide a quote.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleClose}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
                <a
                  href="https://calendly.com/quickfix-services" // Replace with actual Calendly link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule on Calendar</span>
                </a>
              </div>
            </div>
          ) : (
            // Form State
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(864) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...register('address', { required: 'Service address is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Street address, Charlotte, NC"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Needed *
                </label>
                <select
                  id="service"
                  {...register('service', { required: 'Please select a service' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <optgroup label="Handyman Services">
                    {serviceOptions.filter(opt => opt.value.includes('handyman') || ['plumbing', 'electrical', 'carpentry', 'painting'].includes(opt.value)).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Mobile Mechanic Services">
                    {serviceOptions.filter(opt => opt.value.includes('mechanic') || ['battery', 'brakes', 'oil-change', 'diagnostics', 'tires'].includes(opt.value)).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </optgroup>
                  <option value="emergency">Emergency Service</option>
                </select>
                {errors.service && (
                  <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    {...register('preferredDate', { required: 'Please select a preferred date' })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.preferredDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.preferredDate.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    id="preferredTime"
                    {...register('preferredTime', { required: 'Please select a time' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.preferredTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.preferredTime.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    id="urgency"
                    {...register('urgency')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="normal">Normal (24-48 hrs)</option>
                    <option value="same-day">Same Day</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Needs
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us what you need help with..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to receive communication from QuickFix Services regarding your service request.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}