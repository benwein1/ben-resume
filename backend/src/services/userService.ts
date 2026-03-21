import {
  createCandidateService,
  deleteCandidateService,
  getCandidateByIdService,
  updateCandidateService
} from './candidateService';

const BEN_CANDIDATE_ID = Number(process.env.BEN_CANDIDATE_ID ?? 1);

const cleanOptional = (value: unknown) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

function formatPeriod(startDate?: string | Date | null, endDate?: string | Date | null, currently?: boolean | null) {
  const start = startDate ? new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
  const end = currently ? 'Present' : endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

  if (!start && !end) return '';
  if (start && end) return `${start} - ${end}`;
  return start || end;
}

function toDateLabel(value?: string | Date | null) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function mapCandidateToUser(candidate: any) {
  return {
    id: candidate.id,
    fullName: candidate.fullName,
    headline: candidate.jobTitle ?? '',
    email: candidate.email ?? '',
    phone: candidate.phone ?? '',
    location: candidate.location ?? '',
    linkedInUrl: candidate.linkedInURL ?? '',
    gitHubUrl: candidate.gitHubURL ?? '',
    websiteUrl: candidate.websiteURL ?? '',
    imageUrl: candidate.imageURL ?? '',
    bio: candidate.bio ?? '',
    experiences: (candidate.experiences ?? []).map((item: any) => ({
      role: item.role ?? '',
      company: item.company ?? '',
      location: '',
      period: formatPeriod(item.startDate, item.endDate, item.currentlyWorkHere),
      description: item.description ?? ''
    })),
    education: (candidate.education ?? []).map((item: any) => ({
      degree: item.degree ?? '',
      institution: item.institution ?? '',
      location: '',
      period: formatPeriod(item.startDate, item.endDate, false),
      details: item.description ?? ''
    })),
    skills: (candidate.skills ?? []).map((item: any) => item.skillName).filter(Boolean),
    projects: (candidate.projects ?? []).map((item: any) => ({
      title: item.projectTitle ?? '',
      summary: item.description ?? '',
      tags: item.techStack
        ? item.techStack
            .split(',')
            .map((tag: string) => tag.trim())
            .filter(Boolean)
        : [],
      liveUrl: item.liveURL ?? '',
      githubUrl: item.gitHubURL ?? ''
    })),
    certifications: (candidate.certifications ?? []).map((item: any) => ({
      name: item.certificationName ?? '',
      issuer: item.issuer ?? '',
      dateLabel: toDateLabel(item.date),
      credentialId: item.credentialURL ?? ''
    })),
    recommendations: (candidate.recommendations ?? []).map((item: any) => ({
      name: item.name ?? '',
      role: item.role ?? '',
      company: '',
      quote: item.recommendation ?? '',
      avatarUrl: ''
    }))
  };
}

function mapUserPayloadToCandidate(payload: any) {
  return {
    fullName: cleanOptional(payload.fullName),
    jobTitle: cleanOptional(payload.headline),
    email: cleanOptional(payload.email),
    phone: cleanOptional(payload.phone),
    location: cleanOptional(payload.location),
    linkedInURL: cleanOptional(payload.linkedInUrl),
    gitHubURL: cleanOptional(payload.gitHubUrl),
    websiteURL: cleanOptional(payload.websiteUrl),
    imageURL: cleanOptional(payload.imageUrl),
    bio: cleanOptional(payload.bio),
    experiences: Array.isArray(payload.experiences)
      ? payload.experiences.map((item: any) => ({
          role: item.role,
          company: item.company,
          description: item.description
        }))
      : undefined,
    education: Array.isArray(payload.education)
      ? payload.education.map((item: any) => ({
          degree: item.degree,
          institution: item.institution,
          description: item.details
        }))
      : undefined,
    skills: Array.isArray(payload.skills)
      ? payload.skills.map((skill: string) => ({
          skillName: skill
        }))
      : undefined,
    projects: Array.isArray(payload.projects)
      ? payload.projects.map((item: any) => ({
          projectTitle: item.title,
          description: item.summary,
          techStack: Array.isArray(item.tags) ? item.tags.join(', ') : undefined,
          liveURL: item.liveUrl,
          gitHubURL: item.githubUrl
        }))
      : undefined,
    certifications: Array.isArray(payload.certifications)
      ? payload.certifications.map((item: any) => ({
          certificationName: item.name,
          issuer: item.issuer,
          credentialURL: item.credentialId
        }))
      : undefined,
    recommendations: Array.isArray(payload.recommendations)
      ? payload.recommendations.map((item: any) => ({
          name: item.name,
          role: item.role,
          recommendation: item.quote
        }))
      : undefined
  };
}

export async function getUserService() {
  const candidate = await getCandidateByIdService(BEN_CANDIDATE_ID);
  return mapCandidateToUser(candidate);
}

export async function postUserService(payload: unknown) {
  const candidatePayload = mapUserPayloadToCandidate(payload as any);
  const created = await createCandidateService(candidatePayload);
  return mapCandidateToUser(created as any);
}

export async function putUserService(payload: unknown) {
  const candidatePayload = mapUserPayloadToCandidate(payload as any);
  const updated = await updateCandidateService(BEN_CANDIDATE_ID, candidatePayload);
  return mapCandidateToUser(updated as any);
}

export async function deleteUserService() {
  return deleteCandidateService(BEN_CANDIDATE_ID);
}
