"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCandidateSchema = exports.createCandidateSchema = exports.candidateBaseSchema = void 0;
const zod_1 = require("zod");
const experienceSchema = zod_1.z.object({
    role: zod_1.z.string().min(1).optional(),
    company: zod_1.z.string().min(1).optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    currentlyWorkHere: zod_1.z.boolean().optional(),
    description: zod_1.z.string().optional()
});
const educationSchema = zod_1.z.object({
    institution: zod_1.z.string().min(1).optional(),
    degree: zod_1.z.string().optional(),
    field: zod_1.z.string().optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    description: zod_1.z.string().optional()
});
const skillSchema = zod_1.z.object({
    skillName: zod_1.z.string().min(1),
    category: zod_1.z.number().int().optional(),
    level: zod_1.z.number().int().optional(),
    description: zod_1.z.string().optional()
});
const projectSchema = zod_1.z.object({
    projectTitle: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    techStack: zod_1.z.string().optional(),
    gitHubURL: zod_1.z.string().url().optional(),
    liveURL: zod_1.z.string().url().optional()
});
const certificationSchema = zod_1.z.object({
    certificationName: zod_1.z.string().min(1),
    issuer: zod_1.z.string().optional(),
    date: zod_1.z.coerce.date().optional(),
    credentialURL: zod_1.z.string().url().optional()
});
const recommendationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    role: zod_1.z.string().optional(),
    recommendation: zod_1.z.string().optional()
});
exports.candidateBaseSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1),
    jobTitle: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    gitHubURL: zod_1.z.string().url().optional(),
    linkedInURL: zod_1.z.string().url().optional(),
    websiteURL: zod_1.z.string().url().optional(),
    imageURL: zod_1.z.string().url().optional(),
    bio: zod_1.z.string().optional(),
    experiences: zod_1.z.array(experienceSchema).optional(),
    education: zod_1.z.array(educationSchema).optional(),
    skills: zod_1.z.array(skillSchema).optional(),
    projects: zod_1.z.array(projectSchema).optional(),
    certifications: zod_1.z.array(certificationSchema).optional(),
    recommendations: zod_1.z.array(recommendationSchema).optional()
});
exports.createCandidateSchema = exports.candidateBaseSchema.extend({
    id: zod_1.z.number().int().optional()
});
exports.updateCandidateSchema = exports.candidateBaseSchema.partial();
