import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Linked markdown is produced by scripts/link-all.mjs; optional Content Layer access.
const linked = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/linked' }),
  schema: z
    .object({
      title: z.string().optional(),
      type: z.string().optional(),
      url: z.string().optional(),
      status: z.string().optional(),
    })
    .passthrough(),
});

export const collections = { linked };
