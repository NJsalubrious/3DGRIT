import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum([
      'tools-with-weight',
      'calculated-margins',
      'defensive-fluidity',
      'normative-tools',
      'ai-experimentation',
    ]),
    tags: z.array(z.string()).optional().default([]),
    video: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

export const collections = { posts };
