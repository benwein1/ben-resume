export type Experience = {
  id: number
  candidateId: number
  role: string | null
  company: string | null
  startDate: string | null
  endDate: string | null
  currentlyWorkHere: boolean | null
  description: string | null
}

export type Education = {
  id: number
  candidateId: number
  institution: string | null
  degree: string | null
  field: string | null
  startDate: string | null
  endDate: string | null
  description: string | null
}

export type Skill = {
  id: number
  candidateId: number
  skillName: string | null
  category: number | null
  level: number | null
  description: string | null
}

export type Project = {
  id: number
  candidateId: number
  projectTitle: string | null
  description: string | null
  techStack: string | null
  gitHubURL: string | null
  liveURL: string | null
}

export type Certification = {
  id: number
  candidateId: number
  certificationName: string | null
  issuer: string | null
  date: string | null
  credentialURL: string | null
}

export type Recommendation = {
  id: number
  candidateId: number
  name: string | null
  role: string | null
  recommendation: string | null
}

export type Candidate = {
  id: number
  fullName: string | null
  jobTitle: string | null
  email: string | null
  phone: string | null
  location: string | null
  gitHubURL: string | null
  linkedInURL: string | null
  websiteURL: string | null
  imageURL: string | null
  bio: string | null
  experiences?: Experience[]
  education?: Education[]
  skills?: Skill[]
  projects?: Project[]
  certifications?: Certification[]
  recommendations?: Recommendation[]
}

export type ExperienceUpdate = {
  role?: string
  company?: string
  startDate?: string
  endDate?: string
  currentlyWorkHere?: boolean
  description?: string
}

export type EducationUpdate = {
  institution?: string
  degree?: string
  field?: string
  startDate?: string
  endDate?: string
  description?: string
}

export type SkillUpdate = {
  skillName?: string
  category?: number
  level?: number
  description?: string
}

export type ProjectUpdate = {
  projectTitle?: string
  description?: string
  techStack?: string
  gitHubURL?: string
  liveURL?: string
}

export type CertificationUpdate = {
  certificationName?: string
  issuer?: string
  date?: string
  credentialURL?: string
}

export type RecommendationUpdate = {
  name?: string
  role?: string
  recommendation?: string
}

export type CandidateUpdate = Partial<
  Pick<
    Candidate,
    | 'fullName'
    | 'jobTitle'
    | 'email'
    | 'phone'
    | 'location'
    | 'gitHubURL'
    | 'linkedInURL'
    | 'websiteURL'
    | 'imageURL'
    | 'bio'
  >
> & {
  experiences?: ExperienceUpdate[]
  education?: EducationUpdate[]
  skills?: SkillUpdate[]
  projects?: ProjectUpdate[]
  certifications?: CertificationUpdate[]
  recommendations?: RecommendationUpdate[]
}
