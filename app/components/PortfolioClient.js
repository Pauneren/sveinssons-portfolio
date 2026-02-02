'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { inter } from '../layout'

function ProjectCard({ project, index, onOpen }) {
  const imageUrl = project.image?.asset?.url || project.image;
  
  return (
    <article
      key={project._id || project.id}
      className="bg-surface p-8 rounded-3xl shadow-2xl hover:shadow-[0_20px_50px_rgba(196,20,150,0.22)] ring-1 ring-black/20 transform-gpu hover:-translate-y-2 transition text-muted"
    >
      <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover contrast-105 brightness-110 transform-gpu transition-transform duration-300 group-hover:scale-105"
          quality={75}
        />
      </div>

      <h3 className={`text-xl font-semibold mb-4 text-white ${inter.className}`}>
        {project.title}
      </h3>
      <p className="mb-6">{project.description}</p>
      <div className="flex gap-3 items-center">
        <button
          type="button"
          onClick={() => onOpen(index, imageUrl)}
          className="inline-flex items-center gap-2 text-sm text-white bg-[#DC1DB7] hover:bg-[#DC1DB7]/90 px-3 py-2 rounded-md hover:shadow-[0_10px_30px_rgba(220,29,183,0.3)] transition border border-white/20"
        >
          View Project
        </button>
      </div>
    </article>
  );
}

export default function PortfolioClient({ projects: initialProjects }) {
  const [projects, setProjects] = useState(initialProjects || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [modalImageSrc, setModalImageSrc] = useState(null);

  function openModal(index, imageSrc) {
    setModalIndex(index);
    setModalImageSrc(imageSrc);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setModalOpen(false);
    setModalIndex(null);
    setModalImageSrc(null);
    document.body.style.overflow = '';
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
        {projects.map((p, i) => (
          <ProjectCard key={p._id || p.id} project={p} index={i} onOpen={openModal} />
        ))}
      </div>

      {/* Lightbox Modal */}
      {modalOpen && (
        <div 
          className="lightbox fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="lightbox-overlay absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="lightbox-content relative max-w-4xl max-h-[90vh] w-full">
            <button
              type="button"
              className="absolute -top-12 right-0 text-white/80 hover:text-white text-2xl font-light"
              onClick={closeModal}
            >
              ✕
            </button>
            <Image
              src={modalImageSrc}
              alt={`Project ${modalIndex + 1}`}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-2xl"
              quality={95}
            />
          </div>
        </div>
      )}
    </>
  );
}
