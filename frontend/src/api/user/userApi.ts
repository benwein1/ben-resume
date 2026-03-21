import { apiFetch } from '../client/httpClient'
import type { BenResume } from '../../mock/benResume'

type UserApiExperience = {
  role: string | null
  company: string | null
  location: string | null
  period: string | null
  description: string | null
}

type UserApiEducation = {
  degree: string | null
  institution: string | null
  location: string | null
  period: string | null
  details: string | null
}

type UserApiProject = {
  title: string
  summary: string | null
  tags: string[]
  liveUrl: string | null
  githubUrl: string | null
}

type UserApiCertification = {
  name: string
  issuer: string | null
  dateLabel: string | null
  credentialId: string | null
}

type UserApiRecommendation = {
  name: string
  role: string | null
  company: string | null
  quote: string | null
  avatarUrl: string | null
}

type UserApiResponse = {
  fullName: string
  headline: string | null
  location: string | null
  email: string | null
  phone: string | null
  linkedInUrl: string | null
  gitHubUrl: string | null
  websiteUrl: string | null
  imageUrl: string | null
  bio: string | null
  skills: string[]
  experiences: UserApiExperience[]
  education: UserApiEducation[]
  projects: UserApiProject[]
  certifications: UserApiCertification[]
  recommendations: UserApiRecommendation[]
}

export type UserUpdatePayload = {
  fullName?: string
  headline?: string
  location?: string
  email?: string
  phone?: string
  linkedInUrl?: string
  gitHubUrl?: string
  websiteUrl?: string
  imageUrl?: string
  bio?: string
  skills?: string[]
  experiences?: Array<{
    role?: string
    company?: string
    location?: string
    period?: string
    description?: string
  }>
  education?: Array<{
    degree?: string
    institution?: string
    location?: string
    period?: string
    details?: string
  }>
  projects?: Array<{
    title: string
    summary?: string
    tags?: string[]
    liveUrl?: string
    githubUrl?: string
  }>
  certifications?: Array<{
    name: string
    issuer?: string
    dateLabel?: string
    credentialId?: string
  }>
  recommendations?: Array<{
    name: string
    role?: string
    company?: string
    quote?: string
    avatarUrl?: string
  }>
}

export async function getUserResume() {
  const raw = await apiFetch<UserApiResponse>('/api/user')

  const mapped: BenResume = {
    name: raw.fullName,
    headline: raw.headline ?? '',
    location: raw.location ?? '',
    email: raw.email ?? '',
    phone: raw.phone ?? '',
    linkedIn: raw.linkedInUrl ?? '',
    gitHub: raw.gitHubUrl ?? '',
    website: raw.websiteUrl ?? '',
    imageUrl: raw.imageUrl ?? '',
    bio: raw.bio ?? '',
    skills: raw.skills ?? [],
    experiences: (raw.experiences ?? []).map((item) => ({
      role: item.role ?? '',
      company: item.company ?? '',
      location: item.location ?? '',
      period: item.period ?? '',
      description: item.description ?? '',
    })),
    education: (raw.education ?? []).map((item) => ({
      degree: item.degree ?? '',
      institution: item.institution ?? '',
      location: item.location ?? '',
      period: item.period ?? '',
      details: item.details ?? '',
    })),
    projects: (raw.projects ?? []).map((item) => ({
      title: item.title,
      summary: item.summary ?? '',
      tags: item.tags ?? [],
      liveUrl: item.liveUrl ?? undefined,
      githubUrl: item.githubUrl ?? undefined,
    })),
    certifications: (raw.certifications ?? []).map((item) => ({
      name: item.name,
      issuer: item.issuer ?? '',
      date: item.dateLabel ?? '',
      credentialId: item.credentialId ?? '',
    })),
    recommendations: (raw.recommendations ?? []).map((item) => ({
      name: item.name,
      role: item.role ?? '',
      company: item.company ?? '',
      quote: item.quote ?? '',
      avatarUrl: item.avatarUrl ?? '',
    })),
  }

  return mapped
}

export function toUserUpdatePayload(resume: BenResume): UserUpdatePayload {
  return {
    fullName: resume.name,
    headline: resume.headline,
    location: resume.location,
    email: resume.email,
    phone: resume.phone,
    linkedInUrl: resume.linkedIn,
    gitHubUrl: resume.gitHub,
    websiteUrl: resume.website,
    imageUrl: resume.imageUrl,
    bio: resume.bio,
    skills: resume.skills,
    experiences: resume.experiences.map((item) => ({
      role: item.role,
      company: item.company,
      location: item.location,
      period: item.period,
      description: item.description,
    })),
    education: resume.education.map((item) => ({
      degree: item.degree,
      institution: item.institution,
      location: item.location,
      period: item.period,
      details: item.details,
    })),
    projects: resume.projects.map((item) => ({
      title: item.title,
      summary: item.summary,
      tags: item.tags,
      liveUrl: item.liveUrl,
      githubUrl: item.githubUrl,
    })),
    certifications: resume.certifications.map((item) => ({
      name: item.name,
      issuer: item.issuer,
      dateLabel: item.date,
      credentialId: item.credentialId,
    })),
    recommendations: resume.recommendations.map((item) => ({
      name: item.name,
      role: item.role,
      company: item.company,
      quote: item.quote,
      avatarUrl: item.avatarUrl,
    })),
  }
}

export function updateUserResume(payload: UserUpdatePayload) {
  return apiFetch<unknown>('/api/user', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
