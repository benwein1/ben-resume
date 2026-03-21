"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserService = getUserService;
exports.postUserService = postUserService;
exports.putUserService = putUserService;
exports.deleteUserService = deleteUserService;
const candidateService_1 = require("./candidateService");
const BEN_CANDIDATE_ID = Number(process.env.BEN_CANDIDATE_ID ?? 1);
const cleanOptional = (value) => {
    if (typeof value !== 'string')
        return value;
    const trimmed = value.trim();
    return trimmed.length ? trimmed : undefined;
};
const toOptionalUrl = (value) => {
    const cleaned = cleanOptional(value);
    if (typeof cleaned !== 'string')
        return undefined;
    const withScheme = cleaned.startsWith('http://') || cleaned.startsWith('https://')
        ? cleaned
        : `https://${cleaned}`;
    try {
        // eslint-disable-next-line no-new
        new URL(withScheme);
        return withScheme;
    }
    catch {
        return undefined;
    }
};
function formatPeriod(startDate, endDate, currently) {
    const start = startDate ? new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
    const end = currently ? 'Present' : endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
    if (!start && !end)
        return '';
    if (start && end)
        return `${start} - ${end}`;
    return start || end;
}
function toDateLabel(value) {
    if (!value)
        return '';
    return new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
function mapCandidateToUser(candidate) {
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
        experiences: (candidate.experiences ?? []).map((item) => ({
            role: item.role ?? '',
            company: item.company ?? '',
            location: '',
            period: formatPeriod(item.startDate, item.endDate, item.currentlyWorkHere),
            description: item.description ?? ''
        })),
        education: (candidate.education ?? []).map((item) => ({
            degree: item.degree ?? '',
            institution: item.institution ?? '',
            location: '',
            period: formatPeriod(item.startDate, item.endDate, false),
            details: item.description ?? ''
        })),
        skills: (candidate.skills ?? []).map((item) => item.skillName).filter(Boolean),
        projects: (candidate.projects ?? []).map((item) => ({
            title: item.projectTitle ?? '',
            summary: item.description ?? '',
            tags: item.techStack
                ? item.techStack
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                : [],
            liveUrl: item.liveURL ?? '',
            githubUrl: item.gitHubURL ?? ''
        })),
        certifications: (candidate.certifications ?? []).map((item) => ({
            name: item.certificationName ?? '',
            issuer: item.issuer ?? '',
            dateLabel: toDateLabel(item.date),
            credentialId: item.credentialURL ?? ''
        })),
        recommendations: (candidate.recommendations ?? []).map((item) => ({
            name: item.name ?? '',
            role: item.role ?? '',
            company: '',
            quote: item.recommendation ?? '',
            avatarUrl: ''
        }))
    };
}
function mapUserPayloadToCandidate(payload) {
    return {
        fullName: cleanOptional(payload.fullName),
        jobTitle: cleanOptional(payload.headline),
        email: cleanOptional(payload.email),
        phone: cleanOptional(payload.phone),
        location: cleanOptional(payload.location),
        linkedInURL: toOptionalUrl(payload.linkedInUrl),
        gitHubURL: toOptionalUrl(payload.gitHubUrl),
        websiteURL: toOptionalUrl(payload.websiteUrl),
        imageURL: toOptionalUrl(payload.imageUrl),
        bio: cleanOptional(payload.bio),
        experiences: Array.isArray(payload.experiences)
            ? payload.experiences.map((item) => ({
                role: item.role,
                company: item.company,
                description: item.description
            }))
            : undefined,
        education: Array.isArray(payload.education)
            ? payload.education.map((item) => ({
                degree: item.degree,
                institution: item.institution,
                description: item.details
            }))
            : undefined,
        skills: Array.isArray(payload.skills)
            ? payload.skills.map((skill) => ({
                skillName: skill
            }))
            : undefined,
        projects: Array.isArray(payload.projects)
            ? payload.projects.map((item) => ({
                projectTitle: item.title,
                description: item.summary,
                techStack: Array.isArray(item.tags) ? item.tags.join(', ') : undefined,
                liveURL: toOptionalUrl(item.liveUrl),
                gitHubURL: toOptionalUrl(item.githubUrl)
            }))
            : undefined,
        certifications: Array.isArray(payload.certifications)
            ? payload.certifications.map((item) => ({
                certificationName: item.name,
                issuer: item.issuer,
                // Old candidate schema requires URL. Keep only valid URLs.
                credentialURL: toOptionalUrl(item.credentialId)
            }))
            : undefined,
        recommendations: Array.isArray(payload.recommendations)
            ? payload.recommendations.map((item) => ({
                name: item.name,
                role: item.role,
                recommendation: item.quote
            }))
            : undefined
    };
}
async function getUserService() {
    const candidate = await (0, candidateService_1.getCandidateByIdService)(BEN_CANDIDATE_ID);
    return mapCandidateToUser(candidate);
}
async function postUserService(payload) {
    const candidatePayload = mapUserPayloadToCandidate(payload);
    const created = await (0, candidateService_1.createCandidateService)(candidatePayload);
    return mapCandidateToUser(created);
}
async function putUserService(payload) {
    const candidatePayload = mapUserPayloadToCandidate(payload);
    const updated = await (0, candidateService_1.updateCandidateService)(BEN_CANDIDATE_ID, candidatePayload);
    return mapCandidateToUser(updated);
}
async function deleteUserService() {
    return (0, candidateService_1.deleteCandidateService)(BEN_CANDIDATE_ID);
}
