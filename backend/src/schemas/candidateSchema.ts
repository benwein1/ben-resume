import { z } from 'zod';

export const candidateBaseSchema = z.object({
  fullName: z.string().min(1),
  jobTitle: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  gitHubURL: z.string().url().optional(),
  linkedInURL: z.string().url().optional(),
  websiteURL: z.string().url().optional(),
  imageURL: z.string().url().optional(),
  bio: z.string().optional()
});

export const createCandidateSchema = candidateBaseSchema.extend({
  id: z.number().int().optional()
});

export const updateCandidateSchema = candidateBaseSchema.partial();

export type CandidateCreateInput = z.infer<typeof createCandidateSchema>;
export type CandidateUpdateInput = z.infer<typeof updateCandidateSchema>;

