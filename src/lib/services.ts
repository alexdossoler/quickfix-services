export interface Service {
  title: string;
  slug: string;
  heroImg: string;
  description: string;
  priceRange: string;
  bullets: string[];
  gallery: string[];
  features: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const SERVICES: Record<string, Service> = {
  handyman: {
    title: 'Handyman Services',
    slug: 'handyman',
    heroImg: '/images/handyman-hero.jpg',
    description: 'Professional handyman services for your home and office. From small repairs to major installations, we handle it all with expertise and care.',
    priceRange: '$50 - $200/hour',
    bullets: [
      'Plumbing repairs & fixtures',
      'Electrical (switches, lights)',
      'Furniture assembly & carpentry',
      'Drywall repair & painting',
      'Door & window installation',
      'Tile & flooring work'
    ],
    gallery: [
      '/images/handyman-carpentry.png',
      '/images/handyman-electrical.png', 
      '/images/handyman-plumbing.png',
      '/images/Generated Image July 02, 2025 - 2_15PM.jpeg'
    ],
    features: [
      'Licensed & Insured',
      'Same-day service available',
      'Quality guarantee',
      'Transparent pricing',
      'Professional tools & equipment'
    ],
    faqs: [
      {
        question: 'What types of handyman services do you offer?',
        answer: 'We provide a wide range of handyman services including plumbing repairs, electrical work, carpentry, painting, furniture assembly, and general home maintenance.'
      },
      {
        question: 'Are you licensed and insured?',
        answer: 'Yes, we are fully licensed and insured for your peace of mind. All our work comes with a satisfaction guarantee.'
      },
      {
        question: 'How do you charge for services?',
        answer: 'We offer transparent hourly rates starting at $50/hour, with free estimates for larger projects. No hidden fees!'
      },
      {
        question: 'Do you provide same-day service?',
        answer: 'Yes, we often accommodate same-day requests depending on availability and the scope of work needed.'
      }
    ]
  },
  mechanic: {
    title: 'Mobile Mechanic',
    slug: 'mechanic',
    heroImg: '/images/mechanic-hero.jpg',
    description: 'Professional automotive services that come to you. No need to visit a shop - we bring expert car care directly to your location.',
    priceRange: '$75 - $300/service',
    bullets: [
      'Battery replacement & testing',
      'Brake service & repair',
      'Oil changes & fluid top-ups',
      'Diagnostics & engine analysis',
      'Tire rotation & replacement',
      'Starter & alternator service'
    ],
    gallery: [
      '/images/mechanic-1.jpg',
      '/images/mechanic-2.jpg',
      '/images/mechanic-3.jpg',
      '/images/mechanic-4.jpg'
    ],
    features: [
      'ASE Certified Technicians',
      'Mobile service to your location',
      'Quality parts & warranties',
      'Competitive pricing',
      'Emergency roadside assistance'
    ],
    faqs: [
      {
        question: 'What automotive services do you provide?',
        answer: 'We offer comprehensive mobile automotive services including battery replacement, brake service, oil changes, diagnostics, and general maintenance - all at your location.'
      },
      {
        question: 'Are your technicians certified?',
        answer: 'Yes, all our technicians are ASE certified with years of experience working on all makes and models of vehicles.'
      },
      {
        question: 'Do you come to my location?',
        answer: 'Absolutely! We bring our mobile service directly to your home, office, or wherever your vehicle is located within our service area.'
      },
      {
        question: 'What if you can&apos;t fix my car on-site?',
        answer: 'We handle 90% of issues on-site. For complex repairs requiring specialized equipment, we can arrange towing to a trusted partner shop.'
      }
    ]
  }
};

export const COMPANY_INFO = {
  name: 'QuickFix Services',
  tagline: 'Your trusted handyman and mobile mechanic',
  phone: '(864) 743-3178',
  email: 'info@quick-fix-handyman.com',
  address: 'Charlotte, NC',
  hours: 'Mon-Sun: 7AM-9PM, Emergency service available 24/7',
  serviceAreas: ['Charlotte', 'Matthews', 'Huntersville', 'Concord', 'Gastonia', 'Belmont'],
  social: {
    facebook: 'https://facebook.com/quickfixservices',
    instagram: 'https://instagram.com/quickfixservices',
    google: 'https://maps.google.com/quickfixservices'
  }
};

export const QUALITY_WORK = [
  {
    title: 'Electrical Install',
    desc: 'Professional electrical work - outlets, switches & lighting.',
    img: '/images/electrical-install.jpg',
    alt: 'Handyman installing electrical outlets and switches'
  },
  {
    title: 'Carpentry Work',
    desc: 'Custom furniture assembly and woodworking projects.',
    img: '/images/handyman-carpentry.png',
    alt: 'Professional carpentry and furniture assembly'
  },
  {
    title: 'Plumbing Services',
    desc: 'Reliable plumbing repairs and fixture installations.',
    img: '/images/handyman-plumbing.png', 
    alt: 'Expert plumbing repair and installation services'
  }
];