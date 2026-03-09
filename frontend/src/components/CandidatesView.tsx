import * as React from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { candidateKeys, getCandidate, listCandidates, updateCandidate } from '../api/candidates'
import type { CandidateUpdate } from '../api/types'

export function CandidatesView() {
  const qc = useQueryClient()
  const [selectedId, setSelectedId] = React.useState<number | null>(null)

  const candidatesQuery = useQuery({
    queryKey: candidateKeys.list(),
    queryFn: listCandidates,
  })

  React.useEffect(() => {
    if (selectedId != null) return
    const first = candidatesQuery.data?.[0]
    if (first?.id != null) setSelectedId(first.id)
  }, [candidatesQuery.data, selectedId])

  const candidateQuery = useQuery({
    queryKey: selectedId == null ? ['candidate', 'none'] : candidateKeys.detail(selectedId),
    queryFn: () => getCandidate(selectedId as number),
    enabled: selectedId != null,
  })

  const updateMutation = useMutation({
    mutationFn: async (vars: { id: number; patch: CandidateUpdate }) =>
      updateCandidate(vars.id, vars.patch),
    onSuccess: async (updated) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: candidateKeys.list() }),
        qc.setQueryData(candidateKeys.detail(updated.id), updated),
      ])
    },
  })

  const [form, setForm] = React.useState<CandidateUpdate>({})
  const [dirty, setDirty] = React.useState(false)

  React.useEffect(() => {
    const c = candidateQuery.data
    if (!c) return
    setForm({
      fullName: c.fullName ?? '',
      jobTitle: c.jobTitle ?? '',
      email: c.email ?? '',
      phone: c.phone ?? '',
      location: c.location ?? '',
      gitHubURL: c.gitHubURL ?? '',
      linkedInURL: c.linkedInURL ?? '',
      websiteURL: c.websiteURL ?? '',
      imageURL: c.imageURL ?? '',
      bio: c.bio ?? '',
    })
    setDirty(false)
  }, [candidateQuery.data])

  const setField = (key: keyof CandidateUpdate) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    setDirty(true)
  }

  const selected = candidateQuery.data

  return (
    <Box sx={{ height: '100vh', p: 2, bgcolor: 'background.default' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Candidates
      </Typography>

      <Stack direction="row" spacing={2} sx={{ height: 'calc(100vh - 88px)' }}>
        <Paper
          variant="outlined"
          sx={{
            width: 340,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 1.5 }}>
            <Typography variant="subtitle1">List</Typography>
          </Box>
          <Divider />
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {candidatesQuery.isLoading ? (
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={22} />
              </Box>
            ) : candidatesQuery.isError ? (
              <Box sx={{ p: 2 }}>
                <Typography color="error" variant="body2">
                  {(candidatesQuery.error as Error).message}
                </Typography>
              </Box>
            ) : (
              <List dense disablePadding>
                {(candidatesQuery.data ?? []).map((c) => (
                  <ListItemButton
                    key={c.id}
                    selected={c.id === selectedId}
                    onClick={() => setSelectedId(c.id)}
                  >
                    <ListItemText
                      primary={c.fullName ?? `Candidate #${c.id}`}
                      secondary={c.jobTitle ?? undefined}
                    />
                  </ListItemButton>
                ))}
              </List>
            )}
          </Box>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 1.5 }}>
            <Typography variant="subtitle1">Details</Typography>
          </Box>
          <Divider />

          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            {selectedId == null ? (
              <Typography variant="body2" color="text.secondary">
                Select a candidate from the list.
              </Typography>
            ) : candidateQuery.isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : candidateQuery.isError ? (
              <Typography color="error" variant="body2">
                {(candidateQuery.error as Error).message}
              </Typography>
            ) : !selected ? (
              <Typography variant="body2" color="text.secondary">
                Candidate not found.
              </Typography>
            ) : (
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Full name"
                    value={form.fullName ?? ''}
                    onChange={setField('fullName')}
                  />
                  <TextField
                    fullWidth
                    label="Job title"
                    value={form.jobTitle ?? ''}
                    onChange={setField('jobTitle')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={form.email ?? ''}
                    onChange={setField('email')}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    value={form.phone ?? ''}
                    onChange={setField('phone')}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Location"
                  value={form.location ?? ''}
                  onChange={setField('location')}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="GitHub URL"
                    value={form.gitHubURL ?? ''}
                    onChange={setField('gitHubURL')}
                  />
                  <TextField
                    fullWidth
                    label="LinkedIn URL"
                    value={form.linkedInURL ?? ''}
                    onChange={setField('linkedInURL')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Website URL"
                    value={form.websiteURL ?? ''}
                    onChange={setField('websiteURL')}
                  />
                  <TextField
                    fullWidth
                    label="Image URL"
                    value={form.imageURL ?? ''}
                    onChange={setField('imageURL')}
                  />
                </Stack>

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Bio"
                  value={form.bio ?? ''}
                  onChange={setField('bio')}
                />

                <Divider />

                <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                  {updateMutation.isError ? (
                    <Typography color="error" variant="body2" sx={{ mr: 'auto' }}>
                      {(updateMutation.error as Error).message}
                    </Typography>
                  ) : null}

                  <Button
                    variant="outlined"
                    disabled={!dirty || updateMutation.isPending}
                    onClick={() => {
                      // reset to last loaded
                      const c = candidateQuery.data
                      if (!c) return
                      setForm({
                        fullName: c.fullName ?? '',
                        jobTitle: c.jobTitle ?? '',
                        email: c.email ?? '',
                        phone: c.phone ?? '',
                        location: c.location ?? '',
                        gitHubURL: c.gitHubURL ?? '',
                        linkedInURL: c.linkedInURL ?? '',
                        websiteURL: c.websiteURL ?? '',
                        imageURL: c.imageURL ?? '',
                        bio: c.bio ?? '',
                      })
                      setDirty(false)
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!dirty || updateMutation.isPending}
                    onClick={() => updateMutation.mutate({ id: selected.id, patch: form })}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            )}
          </Box>
        </Paper>
      </Stack>
    </Box>
  )
}

