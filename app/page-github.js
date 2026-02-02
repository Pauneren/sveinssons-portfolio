// GitHub Pages version - No Sanity, pure static
"use client";

import { useState, useEffect } from 'react';
import { Orbitron, Inter } from 'next/font/google';

// Fonts
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);

  // Static projects for GitHub Pages
  const projects = [
    {
      _id: 'project-1',
      title: 'Landing Page Design',
      description: 'A clean, responsive landing page focused on conversions.',
      image: '/projects/project-1.png',
    },
    {
      _id: 'project-2',
      title: 'E‑commerce Template',
      description: 'Lightweight store front with accessibility and performance in mind.',
      image: '/projects/project-2.png',
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  function ProjectCard({ project }) {
    return (
      <article className="project-card">
        <div className="project-image">
          <img 
            src={project.image} 
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.75rem' }}
          />
        </div>
        <h3 className={`text-xl font-semibold mb-4 text-white ${inter.className}`}>
          {project.title}
        </h3>
        <p className="mb-6">{project.description}</p>
        <div className="flex gap-3 items-center">
          <button className="btn">
            View Project
          </button>
        </div>
      </article>
    );
  }

  return (
    <main className="min-h-screen font-inter">
      {/* Navigation */}
      <nav className="nav">
        <div className="container flex justify-between items-center py-4">
          <div className="text-white font-bold text-xl">Sveinssons</div>
          <div className="hidden md:flex space-x-8">
            {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-primary"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className={`text-6xl font-extrabold mb-4 tracking-widest ${orbitron.className}`}>
            Sveinssons
          </h1>
          <p className={`text-2xl mb-6 max-w-2xl mx-auto ${inter.className}`}>
            We are a team specializing in modern, high-performance, and user-centered websites.
          </p>
          <a href="#contact" className="btn">
            Get in Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="container">
          <h2 className={`text-4xl font-bold mb-8 text-center text-white ${inter.className}`}>About Us</h2>
          <p className={`text-lg leading-relaxed text-center text-muted ${inter.className}`}>
            We are <span className="font-semibold">Sveinssons</span> — a creative duo passionate about web
            development. Our goal is to help small businesses and individuals establish a strong online
            presence with websites that are clean, modern, and effective.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="container">
          <h2 className={`text-4xl font-bold mb-12 text-center text-white ${inter.className}`}>What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="card">
              <h3 className={`text-xl font-semibold mb-4 text-white ${inter.className}`}>Web Design</h3>
              <p>Beautiful and professional website designs tailored to your brand.</p>
            </div>
            <div className="card">
              <h3 className={`text-xl font-semibold mb-4 text-white ${inter.className}`}>Development</h3>
              <p>Responsive, accessible, and fast websites using modern technologies.</p>
            </div>
            <div className="card">
              <h3 className={`text-xl font-semibold mb-4 text-white ${inter.className}`}>Optimization</h3>
              <p>SEO and performance enhancements to help your site get noticed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 px-6">
        <div className="container">
          <h2 className={`text-4xl font-bold mb-12 text-center text-white ${inter.className}`}>Portfolio</h2>
          <p className={`text-center mb-10 text-muted ${inter.className}`}>
            We're currently building our first collection of projects. Here's a preview of what's to come:
          </p>
          <div className="portfolio-grid">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 text-center">
        <div className="container">
          <h2 className={`text-4xl font-bold mb-8 text-white ${inter.className}`}>Let's Connect</h2>
          <p className={`mb-8 max-w-xl mx-auto ${inter.className}`}>
            Interested in working with us? We'd love to help bring your website idea to life.
          </p>
          <a href="mailto:paula1@ymail.com" className="btn">
            Email Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm">
        <p className={`${inter.className} text-muted`}>
          © {new Date().getFullYear()} Sveinssons. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
