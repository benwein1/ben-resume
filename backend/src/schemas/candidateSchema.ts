import { z } from 'zod';

const experienceSchema = z.object({
  role: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  currentlyWorkHere: z.boolean().optional(),
  description: z.string().optional()
});

const educationSchema = z.object({
  institution: z.string().min(1).optional(),
  degree: z.string().optional(),
  field: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  description: z.string().optional()
});

const skillSchema = z.object({
  skillName: z.string().min(1),
  category: z.number().int().optional(),
  level: z.number().int().optional(),
  description: z.string().optional()
});

const projectSchema = z.object({
  projectTitle: z.string().min(1),
  description: z.string().optional(),
  techStack: z.string().optional(),
  gitHubURL: z.string().url().optional(),
  liveURL: z.string().url().optional()
});

const certificationSchema = z.object({
  certificationName: z.string().min(1),
  issuer: z.string().optional(),
  date: z.coerce.date().optional(),
  credentialURL: z.string().url().optional()
});

const recommendationSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  recommendation: z.string().optional()
});

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
  bio: z.string().optional(),
  experiences: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  skills: z.array(skillSchema).optional(),
  projects: z.array(projectSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
  recommendations: z.array(recommendationSchema).optional()
});

export const createCandidateSchema = candidateBaseSchema.extend({
  id: z.number().int().optional()
});

export const updateCandidateSchema = candidateBaseSchema.partial();

export type CandidateCreateInput = z.infer<typeof createCandidateSchema>;
export type CandidateUpdateInput = z.infer<typeof updateCandidateSchema>;

