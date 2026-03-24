import React from "react";
import type { getCandidate } from "../../api/internal/candidates";
import type { ResumeData } from "../../types/resume";
import type { CandidateUpdate } from "../../api/types";

export const sectionOrder = [
  { id: "bio", label: "BIO" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "education", label: "EDUCATION" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "certifications", label: "CERTIFICATIONS" },
  { id: "recommendations", label: "RECOMMENDATIONS" },
];

export const formatPeriod = (
  startDate?: string | null,
  endDate?: string | null,
  currentlyWorkHere?: boolean | null,
) => {
  const format = (value?: string | null) =>
    value
      ? new Date(value).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "";

  const start = format(startDate);
  const end = currentlyWorkHere ? "Present" : format(endDate);
  if (!start && !end) return "";
  if (start && end) return `${start} - ${end}`;
  return start || end;
};

export const toOptionalUrl = (value?: string) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const withScheme =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;
  try {
    // eslint-disable-next-line no-new
    new URL(withScheme);
    return withScheme;
  } catch {
    return undefined;
  }
};

export const mapCandidateToResume = React.useCallback(
  (candidate: Awaited<ReturnType<typeof getCandidate>>): ResumeData => ({
    name: candidate.fullName ?? "",
    headline: candidate.jobTitle ?? "",
    location: candidate.location ?? "",
    email: candidate.email ?? "",
    phone: candidate.phone ?? "",
    linkedIn: candidate.linkedInURL ?? "",
    gitHub: candidate.gitHubURL ?? "",
    website: candidate.websiteURL ?? "",
    imageUrl: candidate.imageURL ?? "",
    bio: candidate.bio ?? "",
    skills: (candidate.skills ?? [])
      .map((s) => s.skillName ?? "")
      .filter(Boolean),
    experiences: (candidate.experiences ?? []).map((e) => ({
      role: e.role ?? "",
      company: e.company ?? "",
      location: "",
      period: formatPeriod(e.startDate, e.endDate, e.currentlyWorkHere),
      description: e.description ?? "",
    })),
    education: (candidate.education ?? []).map((e) => ({
      degree: e.degree ?? "",
      institution: e.institution ?? "",
      location: "",
      period: formatPeriod(e.startDate, e.endDate, false),
      details: e.description ?? "",
    })),
    projects: (candidate.projects ?? []).map((p) => ({
      title: p.projectTitle ?? "",
      summary: p.description ?? "",
      tags: p.techStack
        ? p.techStack
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      liveUrl: p.liveURL ?? "",
      githubUrl: p.gitHubURL ?? "",
    })),
    certifications: (candidate.certifications ?? []).map((c) => ({
      name: c.certificationName ?? "",
      issuer: c.issuer ?? "",
      date: c.date
        ? new Date(c.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "",
      credentialId: c.credentialURL ?? "",
    })),
    recommendations: (candidate.recommendations ?? []).map((r) => ({
      name: r.name ?? "",
      role: r.role ?? "",
      company: "",
      quote: r.recommendation ?? "",
      avatarUrl: "",
    })),
  }),
  [],
);

export const toCandidateUpdate = (resume: ResumeData): CandidateUpdate => ({
  fullName: resume.name,
  jobTitle: resume.headline,
  email: resume.email,
  phone: resume.phone,
  location: resume.location,
  linkedInURL: toOptionalUrl(resume.linkedIn),
  gitHubURL: toOptionalUrl(resume.gitHub),
  websiteURL: toOptionalUrl(resume.website),
  imageURL: toOptionalUrl(resume.imageUrl),
  bio: resume.bio,
  experiences: resume.experiences.map((item) => ({
    role: item.role || undefined,
    company: item.company || undefined,
    description: item.description || undefined,
  })),
  education: resume.education.map((item) => ({
    degree: item.degree || undefined,
    institution: item.institution || undefined,
    description: item.details || undefined,
  })),
  skills: resume.skills.map((skill) => ({ skillName: skill || undefined })),
  projects: resume.projects.map((item) => ({
    projectTitle: item.title || undefined,
    description: item.summary || undefined,
    techStack: item.tags.length ? item.tags.join(", ") : undefined,
    liveURL: toOptionalUrl(item.liveUrl),
    gitHubURL: toOptionalUrl(item.githubUrl),
  })),
  certifications: resume.certifications.map((item) => ({
    certificationName: item.name || undefined,
    issuer: item.issuer || undefined,
    credentialURL: toOptionalUrl(item.credentialId),
  })),
  recommendations: resume.recommendations.map((item) => ({
    name: item.name || undefined,
    role: item.role || undefined,
    recommendation: item.quote || undefined,
  })),
});

export const jumpTo = (id: string) => {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const toUrl = (v: string) =>
  v.startsWith("http://") || v.startsWith("https://") ? v : `https://${v}`;
