import { apiFetch } from '../client/httpClient'
import type { Candidate, CandidateUpdate } from '../types'

export const candidateKeys = {
  all: ['candidates'] as const,
  list: () => [...candidateKeys.all, 'list'] as const,
  detail: (id: number) => [...candidateKeys.all, 'detail', id] as const,
}

export function listCandidates() {
  return apiFetch<Candidate[]>('/api/candidates')
}

export function getCandidate(id: number) {
  return apiFetch<Candidate>(`/api/candidates/${id}`)
}

export function updateCandidate(id: number, patch: CandidateUpdate) {
  return apiFetch<Candidate>(`/api/candidates/${id}`, {
    method: 'PUT',
    body: JSON.stringify(patch),
  })
}
