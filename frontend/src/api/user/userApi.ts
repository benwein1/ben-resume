import type { ResumeData } from '../../types/resume'
import { apiFetch } from '../client/httpClient'

type UserApiResponse = {
  fullName: string
  headline: string
  email: string
  phone: string
  location: string
  linkedInUrl: string
  gitHubUrl: string
  websiteUrl: string
  imageUrl: string
  bio: string
  skills: string[]
  experiences: Array<{ role: string; company: string; location: string; period: string; description: string }>
  education: Array<{ degree: string; institution: string; location: string; period: string; details: string }>
  projects: Array<{ title: string; summary: string; tags: string[]; liveUrl?: string; githubUrl?: string }>
  certifications: Array<{ name: string; issuer: string; dateLabel: string; credentialId: string }>
  recommendations: Array<{ name: string; role: string; company: string; quote: string; avatarUrl: string }>
}

export function getUserResume() {
  return apiFetch<UserApiResponse>('/api/user').then((raw) => ({
    name: raw.fullName ?? '',
    headline: raw.headline ?? '',
    email: raw.email ?? '',
    phone: raw.phone ?? '',
    location: raw.location ?? '',
    linkedIn: raw.linkedInUrl ?? '',
    gitHub: raw.gitHubUrl ?? '',
    website: raw.websiteUrl ?? '',
    imageUrl: raw.imageUrl ?? '',
    bio: raw.bio ?? '',
    skills: raw.skills ?? [],
    experiences: raw.experiences ?? [],
    education: raw.education ?? [],
    projects: raw.projects ?? [],
    certifications: (raw.certifications ?? []).map((c) => ({
      name: c.name,
      issuer: c.issuer,
      date: c.dateLabel,
      credentialId: c.credentialId,
    })),
    recommendations: raw.recommendations ?? [],
  }))
}

function toUserPayload(resume: ResumeData) {
  return {
    fullName: resume.name,
    headline: resume.headline,
    email: resume.email,
    phone: resume.phone,
    location: resume.location,
    linkedInUrl: resume.linkedIn,
    gitHubUrl: resume.gitHub,
    websiteUrl: resume.website,
    imageUrl: resume.imageUrl,
    bio: resume.bio,
    skills: resume.skills,
    experiences: resume.experiences,
    education: resume.education,
    projects: resume.projects,
    certifications: resume.certifications.map((c) => ({
      name: c.name,
      issuer: c.issuer,
      dateLabel: c.date,
      credentialId: c.credentialId,
    })),
    recommendations: resume.recommendations,
  }
}

export function createUserResume(resume: ResumeData) {
  return apiFetch('/api/user', {
    method: 'POST',
    body: JSON.stringify(toUserPayload(resume)),
  })
}

export function updateUserResume(resume: ResumeData) {
  return apiFetch('/api/user', {
    method: 'PUT',
    body: JSON.stringify(toUserPayload(resume)),
  })
}

export function deleteUserResume() {
  return apiFetch('/api/user', {
    method: 'DELETE',
  })
}
