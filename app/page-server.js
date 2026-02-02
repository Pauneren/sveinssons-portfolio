import { getProjects } from '../lib/sanity.client'
import PortfolioClient from './components/PortfolioClient'

export default async function HomePage() {
  let projects = [];
  
  try {
    projects = await getProjects();
  } catch (error) {
    console.error('Failed to fetch projects from Sanity:', error);
    // Fallback to static projects if Sanity fails
    projects = [
      {
        _id: 'project-1',
        title: 'Landing Page Design',
        description: 'A clean, responsive landing page focused on conversions.',
        image: { asset: { url: '/projects/project-1.png' } },
      },
      {
        _id: 'project-2',
        title: 'E‑commerce Template',
        description: 'Lightweight store front with accessibility and performance in mind.',
        image: { asset: { url: '/projects/project-2.png' } },
      },
    ];
  }

  return <PortfolioClient projects={projects} />;
}
