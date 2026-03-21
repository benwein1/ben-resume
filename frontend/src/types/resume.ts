export type ResumeExperience = {
  role: string
  company: string
  location: string
  period: string
  description: string
}

export type ResumeEducation = {
  degree: string
  institution: string
  location: string
  period: string
  details: string
}

export type ResumeProject = {
  title: string
  summary: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export type ResumeCertification = {
  name: string
  issuer: string
  date: string
  credentialId: string
}

export type ResumeRecommendation = {
  name: string
  role: string
  company: string
  quote: string
  avatarUrl: string
}

export type ResumeData = {
  name: string
  headline: string
  location: string
  email: string
  phone: string
  linkedIn: string
  gitHub: string
  website: string
  imageUrl: string
  bio: string
  skills: string[]
  experiences: ResumeExperience[]
  education: ResumeEducation[]
  projects: ResumeProject[]
  certifications: ResumeCertification[]
  recommendations: ResumeRecommendation[]
}
