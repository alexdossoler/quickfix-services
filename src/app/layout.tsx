import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Use system fonts for offline builds
const fontClass = "font-sans antialiased";

export const metadata: Metadata = {
  title: "QuickFix Services - Handyman & Mobile Mechanic",
  description: "Professional handyman services and mobile mechanic repairs. Licensed, insured, and ready to help with all your home and automotive needs.",
  keywords: "handyman, mobile mechanic, home repair, auto repair, plumbing, electrical, brake service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontClass}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
