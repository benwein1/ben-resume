import type { ChangeEvent } from 'react'
import { Button, Drawer, Stack, TextField, Typography } from '@mui/material'
import type { CandidateUpdate } from '../../api/types'
import './EditCandidateDrawer.scss'

type EditCandidateDrawerProps = {
  open: boolean
  form: CandidateUpdate
  dirty: boolean
  loading: boolean
  error?: string
  onClose: () => void
  onSave: () => void
  onReset: () => void
  onChangeField: (key: keyof CandidateUpdate) => (event: ChangeEvent<HTMLInputElement>) => void
}

export function EditCandidateDrawer({
  open,
  form,
  dirty,
  loading,
  error,
  onClose,
  onSave,
  onReset,
  onChangeField,
}: EditCandidateDrawerProps) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="edit-candidate-drawer">
        <header className="edit-candidate-drawer__header">
          <Typography variant="h6">Edit Candidate</Typography>
          <Typography variant="body2" color="text.secondary">
            Updates are saved to the profile instantly after submit.
          </Typography>
        </header>

        <Stack spacing={2.2} className="edit-candidate-drawer__fields">
          <TextField fullWidth label="Full name" value={form.fullName ?? ''} onChange={onChangeField('fullName')} />
          <TextField fullWidth label="Job title" value={form.jobTitle ?? ''} onChange={onChangeField('jobTitle')} />
          <TextField fullWidth label="Email" value={form.email ?? ''} onChange={onChangeField('email')} />
          <TextField fullWidth label="Phone" value={form.phone ?? ''} onChange={onChangeField('phone')} />
          <TextField fullWidth label="Location" value={form.location ?? ''} onChange={onChangeField('location')} />
          <TextField fullWidth label="GitHub URL" value={form.gitHubURL ?? ''} onChange={onChangeField('gitHubURL')} />
          <TextField
            fullWidth
            label="LinkedIn URL"
            value={form.linkedInURL ?? ''}
            onChange={onChangeField('linkedInURL')}
          />
          <TextField
            fullWidth
            label="Website URL"
            value={form.websiteURL ?? ''}
            onChange={onChangeField('websiteURL')}
          />
          <TextField fullWidth label="Image URL" value={form.imageURL ?? ''} onChange={onChangeField('imageURL')} />
          <TextField
            fullWidth
            multiline
            minRows={5}
            label="Bio"
            value={form.bio ?? ''}
            onChange={onChangeField('bio')}
          />
        </Stack>

        <footer className="edit-candidate-drawer__footer">
          {error ? <Typography color="error">{error}</Typography> : null}
          <div className="edit-candidate-drawer__actions">
            <Button variant="outlined" disabled={!dirty || loading} onClick={onReset}>
              Reset
            </Button>
            <Button variant="contained" disabled={!dirty || loading} onClick={onSave}>
              Save
            </Button>
          </div>
        </footer>
      </div>
    </Drawer>
  )
}
