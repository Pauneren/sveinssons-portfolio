import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-03-21',
  useCdn: false,
})

export async function getProjects() {
  return await client.fetch(`
    *[_type == "project" && featured == true] | order(order asc) {
      _id,
      title,
      slug,
      description,
      image,
      projectUrl,
      githubUrl,
      technologies,
      featured
    }
  `)
}

export async function getAllProjects() {
  return await client.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      image,
      projectUrl,
      githubUrl,
      technologies,
      featured
    }
  `)
}
