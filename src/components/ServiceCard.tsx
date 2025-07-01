import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Service } from '@/lib/services';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const bgColor = service.slug === 'handyman' ? 'bg-blue-50' : 'bg-amber-50';
  const buttonColor = service.slug === 'handyman' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-600 hover:bg-amber-700';
  const iconPath = service.slug === 'handyman' ? '/images/handyman-icon.svg' : '/images/mechanic-icon.svg';

  return (
    <div className={`${bgColor} rounded-2xl p-8 transition-transform hover:scale-105 hover:shadow-lg`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-full bg-white">
          <Image 
            src={iconPath}
            alt={`${service.title} icon`}
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
          <p className="text-gray-600">{service.priceRange}</p>
        </div>
      </div>

      <p className="text-gray-700 mb-6">{service.description}</p>

      <ul className="space-y-3 mb-8">
        {service.bullets.slice(0, 4).map((bullet, index) => (
          <li key={index} className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${service.slug === 'handyman' ? 'bg-blue-600' : 'bg-amber-600'}`}></div>
            <span className="text-gray-700">{bullet}</span>
          </li>
        ))}
        {service.bullets.length > 4 && (
          <li className="text-gray-500 text-sm">+ {service.bullets.length - 4} more services</li>
        )}
      </ul>

      <Link 
        href={`/${service.slug}`}
        className={`inline-flex items-center space-x-2 ${buttonColor} text-white px-6 py-3 rounded-lg font-semibold transition-colors group`}
      >
        <span>Learn More</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}