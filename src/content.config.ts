import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const wines = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/wines" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    line: z.enum(["palato-do-coa", "vinhas-do-coa", "vinhas-da-migalha", "edicoes-especiais"]),
    type: z.enum(["tinto", "branco", "rose"]),
    year: z.number().optional(),
    alcohol: z.string().optional(),
    region: z.string().default("Douro Superior"),
    grapes: z.array(z.string()).default([]),
    description: z.string(),
    tasting_notes: z.string().optional(),
    pairing: z.array(z.string()).default([]),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Palato do Côa"),
    category: z.enum(["vinhos", "enoturismo", "mercado", "harmonizacao", "noticias"]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    ai_generated: z.boolean().default(false),
    ai_model: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
    og_image: z.string().optional(),
  }),
});

export const collections = { wines, blog, pages };
