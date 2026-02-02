export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      description: 'Link to the live project',
    },
    {
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link to the GitHub repository',
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technologies used in this project',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this project on the homepage',
      defaultValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'description',
    },
  },
}
