# QuickFix Services Website

A modern, responsive website for QuickFix Services - your trusted handyman and mobile mechanic service provider. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Dual Service Focus**: Handyman services and mobile mechanic services
- **Responsive Design**: Mobile-first design that works on all devices
- **Contact Forms**: Integrated booking and contact forms
- **Modern UI**: Clean, professional design with smooth animations
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Performance**: Optimized for speed and Core Web Vitals

## Services Offered

### Handyman Services
- Plumbing repairs & fixtures
- Electrical work (switches, lights)
- Furniture assembly & carpentry
- Drywall repair & painting
- Door & window installation
- Tile & flooring work

### Mobile Mechanic Services
- Battery replacement & testing
- Brake service & repair
- Oil changes & fluid top-ups
- Diagnostics & engine analysis
- Tire rotation & replacement
- Starter & alternator service

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Email**: SendGrid (production ready)
- **Deployment**: GitHub Actions + PM2 + DigitalOcean

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Update the environment variables in `.env.local` with your actual values.

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (pages)/           # Route groups
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Header.tsx         # Site navigation
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx          # Homepage hero section
│   ├── ServiceCard.tsx   # Service preview cards
│   ├── BookingModal.tsx  # Booking form modal
│   └── ContactForm.tsx   # Contact form
└── lib/
    ├── services.ts        # Service data and types
    └── utils.ts          # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The project includes GitHub Actions workflow for automated deployment:

1. Set up these GitHub secrets:
   - `DEPLOY_HOST` - Your server IP/domain
   - `DEPLOY_USER` - SSH username
   - `DEPLOY_KEY` - SSH private key
   - `DEPLOY_PATH` - Deployment directory path

2. Push to main branch to trigger deployment

## API Endpoints

- `/api/contact` - Handle contact form submissions
- `/health` - Health check endpoint

## Customization

### Adding New Services

1. Update the `SERVICES` object in `src/lib/services.ts`
2. Create a new page in `src/app/[service-name]/page.tsx`
3. Add navigation links in the Header component

### Styling

The project uses Tailwind CSS for styling. Update `src/app/globals.css` for global styles and use Tailwind classes for component styling.

### Contact Form Integration

For production, update the SendGrid configuration in:
- Environment variables (`.env.local`)
- API route (`src/app/api/contact/route.ts`)

## License

Private project for QuickFix Services.
