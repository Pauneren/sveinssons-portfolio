// app/page.js
'use client';

import { useState } from 'react';
import { Orbitron, Inter } from 'next/font/google';

// Fonts
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-inter">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-purple-900/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <a href="#hero" className={`text-white text-3xl font-bold ${orbitron.className}`}>
            S
          </a>

          {/* Hamburger for Mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Links */}
          <nav
            className={`space-x-6 text-white font-inter md:flex md:items-center ${menuOpen
                ? 'flex flex-col space-y-2 mt-4 md:mt-0 md:flex-row md:space-y-0'
                : 'hidden'
              }`}
          >
            <a href="#contact" className="hover:text-indigo-200 transition">
              Get in Touch
            </a>
            <a href="#about" className="hover:text-indigo-200 transition">
              About Us
            </a>
            <a href="#services" className="hover:text-indigo-200 transition">
              What We Do
            </a>
            <a href="#portfolio" className="hover:text-indigo-200 transition">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-indigo-200 transition">
              Contact Us
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center h-screen text-center p-8 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/my-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <h1 className={`text-6xl font-extrabold mb-4 tracking-widest ${orbitron.className}`}>
            Sveinssons
          </h1>
          <p className={`text-2xl mb-6 max-w-2xl mx-auto ${inter.className}`}>
            Husband & wife team crafting modern, fast, and user-friendly websites.
          </p>
          <a
            href="#contact"
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto py-24 px-6">
        <h2 className={`text-4xl font-bold mb-8 text-center ${inter.className}`}>About Us</h2>
        <p className={`text-lg leading-relaxed text-center text-gray-700 ${inter.className}`}>
          We are <span className="font-semibold">Sveinssons</span> — a creative duo passionate about web
          development. Our goal is to help small businesses and individuals establish a strong online
          presence with websites that are clean, modern, and effective.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-24 px-6">
        <h2 className={`text-4xl font-bold mb-12 text-center ${inter.className}`}>What We Do</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className={`text-xl font-semibold mb-4 ${inter.className}`}>Web Design</h3>
            <p>Beautiful and professional website designs tailored to your brand.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className={`text-xl font-semibold mb-4 ${inter.className}`}>Development</h3>
            <p>Responsive, accessible, and fast websites using modern technologies.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className={`text-xl font-semibold mb-4 ${inter.className}`}>Optimization</h3>
            <p>SEO and performance enhancements to help your site get noticed.</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="max-w-6xl mx-auto py-24 px-6">
        <h2 className={`text-4xl font-bold mb-12 text-center ${inter.className}`}>Portfolio</h2>
        <p className={`text-center mb-10 text-gray-600 ${inter.className}`}>
          We’re currently building our first collection of projects. Here’s a preview of what’s to come:
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-200 h-64 rounded-2xl flex items-center justify-center text-gray-600 text-lg font-medium">
            Project 1 (Coming Soon)
          </div>
          <div className="bg-gray-200 h-64 rounded-2xl flex items-center justify-center text-gray-600 text-lg font-medium">
            Project 2 (Coming Soon)
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-purple-700 text-white py-24 px-6 text-center">
        <h2 className={`text-4xl font-bold mb-8 ${inter.className}`}>Let’s Connect</h2>
        <p className={`mb-8 max-w-xl mx-auto ${inter.className}`}>
          Interested in working with us? We’d love to help bring your website idea to life.
        </p>
        <a
          href="mailto:paula1@ymail.com"
          className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition"
        >
          Email Us
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p className={`text-gray-400 ${inter.className}`}>
          © {new Date().getFullYear()} Sveinssons. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
