// app/page.js
"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Orbitron, Inter } from 'next/font/google';

// Fonts
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const revealRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  const lastActiveRef = useRef(null);
  const modalRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Fallback projects for GitHub Pages deployment
  const fallbackProjects = [
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

  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    // Try to fetch from Sanity API, fall back to static projects
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (error) {
        // Keep fallback projects if API fails
        console.log('Using fallback projects - API not available');
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Track when the page has mounted so we can avoid rendering
    // browser-dependent attributes on the server and prevent
    // hydration mismatches caused by immediate client-only changes.
    setMounted(true);

    const el = revealRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12 }
    );

    const items = el.querySelectorAll('[data-reveal]');
    items.forEach((i) => io.observe(i));
    // Ensure a graceful fallback in case IntersectionObserver doesn't trigger
    // (avoids sections staying hidden if the observer fails or scripts error).
    items.forEach((i) => i.classList.add('is-visible'));

    return () => io.disconnect();
  }, []);


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function ProjectCard({ project, index, onOpen }) {
    const imageUrl = project.image?.asset?.url || project.image;

    return (
      <article
        key={project._id || project.id}
        className="project-card"
      >
        <div className="project-image">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.75rem' }}
            />
          ) : (
            <span>Project Image</span>
          )}
        </div>

        <h3 className={`text-xl font-semibold mb-4 text-white ${inter.className}`}>
          {project.title}
        </h3>
        <p className="mb-6">{project.description}</p>
        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={() => onOpen(index, imageUrl)}
            className="btn"
          >
            View Project
          </button>
        </div>
      </article>
    );
  }

  function openModal(index) {
    lastActiveRef.current = document.activeElement;
    setModalIndex(index);
    setModalImageSrc(null);
    setModalOpen(true);
    // focus will be set in effect
  }

  // allow passing a resolved src candidate so the modal can use it
  function openModalWithImage(index, src) {
    lastActiveRef.current = document.activeElement;
    setModalIndex(index);
    setModalImageSrc(src || null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalIndex(null);
    if (lastActiveRef.current && typeof lastActiveRef.current.focus === 'function') {
      lastActiveRef.current.focus();
    }
  }

  useEffect(() => {
    if (!modalOpen) return;
    const el = modalRef.current;
    if (el) el.focus();

    function onKey(e) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight' && modalIndex < projects.length - 1) setModalIndex((i) => i + 1);
      if (e.key === 'ArrowLeft' && modalIndex > 0) setModalIndex((i) => i - 1);
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen, modalIndex, projects.length]);

  // Observe sections to keep nav link "active" while in use
  useEffect(() => {
    const ids = ['hero', 'about', 'services', 'portfolio', 'contact'];
    const sections = ids.map((i) => document.getElementById(i)).filter(Boolean);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the most visible section
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) setActiveSection(visible[0].target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-30% 0px -30% 0px' }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <main ref={revealRef} className="min-h-screen font-inter" suppressHydrationWarning>
      {/* Sticky Navbar */}
      <header
        className={`nav transition-colors duration-300 ${mounted && scrolled
          ? 'shadow-lg'
          : ''
          }`}
      >
        <div className="container flex justify-between items-center py-4">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group" aria-label="Home">
            <Image src="/logo-variant-3.svg" alt="Sveinssons mark" width={36} height={36} className="drop-shadow-lg rounded-full logo-anim" priority />
            <span className={`text-white text-2xl font-bold ${orbitron.className} hidden md:inline`}>
              Sveinssons
            </span>
          </a>

          {/* Hamburger for Mobile */}
          <button
            className="md:hidden text-white focus:outline-none rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Links */}
          <nav
            className={`text-white md:flex md:items-center ${menuOpen
              ? 'flex flex-col gap-4 mt-4 md:mt-0 md:flex-row md:gap-6'
              : 'hidden'
              }`}
            aria-hidden={!menuOpen}
          >
            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-primary px-2 py-1"
            >
              About
            </a>
            <a
              href="#services"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-primary px-2 py-1"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-primary px-2 py-1"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-primary px-2 py-1"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="hero"
        data-reveal
      >
        <div className="hero-content">
          <h1 className={`text-6xl font-extrabold mb-4 tracking-widest ${orbitron.className}`}>
            Sveinssons
          </h1>
          <p className={`text-2xl mb-6 max-w-2xl mx-auto ${inter.className}`}>
            We are a team specializing in modern, high-performance, and user-centered websites.
          </p>
          <a
            href="#contact"
            className="btn"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Lightbox modal */}
      {modalOpen && modalIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={projects[modalIndex].title}
          tabIndex={-1}
          ref={modalRef}
          className="fixed inset-0 z-60 flex items-center justify-center p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity" />
          <div className="relative z-10 max-w-4xl w-full bg-transparent rounded-lg overflow-hidden shadow-2xl">
            <div className="relative h-[60vh] sm:h-[70vh] bg-black">
              <Image
                // Prefer the candidate resolved at card time to avoid 400s
                src={modalImageSrc || projects[modalIndex].image}
                alt={projects[modalIndex].title}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                quality={85}
              />
            </div>
            <div className="p-6 bg-gradient-to-t from-black/85 to-transparent">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{projects[modalIndex].title}</h3>
                  <p className="text-sm text-muted mt-1">{projects[modalIndex].description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => modalIndex > 0 && setModalIndex((i) => i - 1)}
                    disabled={modalIndex === 0}
                    className="p-2 rounded-md text-white/90 bg-white/6 disabled:opacity-40"
                    aria-label="Previous project"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => modalIndex < projects.length - 1 && setModalIndex((i) => i + 1)}
                    disabled={modalIndex === projects.length - 1}
                    className="p-2 rounded-md text-white/90 bg-white/6 disabled:opacity-40"
                    aria-label="Next project"
                  >
                    ›
                  </button>
                  <button
                    onClick={closeModal}
                    className="ml-2 p-2 rounded-md text-white/90 bg-white/6"
                    aria-label="Close dialog"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto py-24 px-6 scroll-mt-20" data-reveal>
        <h2 className={`text-4xl font-bold mb-8 text-center text-white ${inter.className}`}>About Us</h2>
        <p className={`text-lg leading-relaxed text-center text-muted ${inter.className}`}>
          We are <span className="font-semibold">Sveinssons</span> — a creative duo passionate about web
          development. Our goal is to help small businesses and individuals establish a strong online
          presence with websites that are clean, modern, and effective.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 scroll-mt-20" data-reveal>
        <h2 className={`text-4xl font-bold mb-12 text-center text-white ${inter.className}`}>What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="card" data-reveal>
            <h3 className={`text-xl font-semibold mb-4 text-white ${inter.className}`}>Web Design</h3>
            <p>Beautiful and professional website designs tailored to your brand.</p>
          </div>
          <div className="card" data-reveal>
            <h3 className={`text-xl font-semibold mb-4 text-white ${inter.className}`}>Development</h3>
            <p>Responsive, accessible, and fast websites using modern technologies.</p>
          </div>
          <div className="card" data-reveal>
            <h3 className={`text-xl font-semibold mb-4 text-white ${inter.className}`}>Optimization</h3>
            <p>SEO and performance enhancements to help your site get noticed.</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 scroll-mt-20">
        <h2 className={`text-4xl font-bold mb-12 text-center text-white ${inter.className}`}>Portfolio</h2>
        <p className={`text-center mb-10 text-muted ${inter.className}`}>
          We’re currently building our first collection of projects. Here’s a preview of what’s to come:
        </p>
        <div className="portfolio-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={openModalWithImage} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-deep text-white py-24 px-6 text-center scroll-mt-20">
        <h2 className={`text-4xl font-bold mb-8 ${inter.className}`}>Let’s Connect</h2>
        <p className={`mb-8 max-w-xl mx-auto ${inter.className}`}>
          Interested in working with us? We’d love to help bring your website idea to life.
        </p>
        <a
          href="mailto:paula1@ymail.com"
          className="btn"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 4h16v16H4z" opacity="0" />
            <path d="M22 6l-10 7L2 6" />
            <path d="M22 6v12H2V6" />
          </svg>
          Email Us
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-deep text-muted py-8 text-center text-sm">
        <p className={`${inter.className} text-muted`}>
          © {new Date().getFullYear()} Sveinssons. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
