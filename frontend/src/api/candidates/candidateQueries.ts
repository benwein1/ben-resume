import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCandidate, listCandidates, updateCandidate } from '../internal/candidates'
import type { CandidateUpdate } from '../types'

export const candidateKeys = {
  all: ['candidates'] as const,
  list: () => [...candidateKeys.all, 'list'] as const,
  detail: (id: number) => [...candidateKeys.all, 'detail', id] as const,
}

export function useCandidatesListQuery() {
  return useQuery({
    queryKey: candidateKeys.list(),
    queryFn: listCandidates,
  })
}

export function useCandidateDetailQuery(id: number, enabled = true) {
  return useQuery({
    queryKey: candidateKeys.detail(id),
    queryFn: () => getCandidate(id),
    enabled,
  })
}

export function useUpdateCandidateMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (vars: { id: number; patch: CandidateUpdate }) =>
      updateCandidate(vars.id, vars.patch),
    onSuccess: async (updated) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: candidateKeys.list() }),
        qc.setQueryData(candidateKeys.detail(updated.id), updated),
      ])
    },
  })
}
