import * as React from 'react'
import type { ChangeEvent } from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useCandidateDetailQuery,
  useCandidatesListQuery,
  useUpdateCandidateMutation,
} from '../../api/candidates'
import type { CandidateUpdate } from '../../api/types'
import { UserList } from '../../components/users/UserList'
import { CandidateOverview } from '../../components/candidate/CandidateOverview'
import { CandidateSections } from '../../components/candidate/CandidateSections'
import { EditCandidateDrawer } from '../../components/candidate/EditCandidateDrawer'
import './CandidateDetailsPage.scss'

const emptyForm: CandidateUpdate = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  gitHubURL: '',
  linkedInURL: '',
  websiteURL: '',
  imageURL: '',
  bio: '',
}

export function CandidateDetailsPage() {
  const navigate = useNavigate()
  const { candidateId } = useParams()
  const selectedId = Number(candidateId)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [form, setForm] = React.useState<CandidateUpdate>(emptyForm)
  const [dirty, setDirty] = React.useState(false)

  const candidatesQuery = useCandidatesListQuery()
  const candidateQuery = useCandidateDetailQuery(selectedId, Number.isFinite(selectedId))

  React.useEffect(() => {
    if (!Number.isFinite(selectedId) && candidatesQuery.data?.[0]?.id) {
      navigate(`/candidates/${candidatesQuery.data[0].id}`, { replace: true })
    }
  }, [selectedId, candidatesQuery.data, navigate])

  React.useEffect(() => {
    const candidate = candidateQuery.data
    if (!candidate) return

    setForm({
      fullName: candidate.fullName ?? '',
      jobTitle: candidate.jobTitle ?? '',
      email: candidate.email ?? '',
      phone: candidate.phone ?? '',
      location: candidate.location ?? '',
      gitHubURL: candidate.gitHubURL ?? '',
      linkedInURL: candidate.linkedInURL ?? '',
      websiteURL: candidate.websiteURL ?? '',
      imageURL: candidate.imageURL ?? '',
      bio: candidate.bio ?? '',
    })
    setDirty(false)
  }, [candidateQuery.data])

  const updateMutation = useUpdateCandidateMutation()

  const onChangeField =
    (key: keyof CandidateUpdate) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }))
      setDirty(true)
    }

  const selected = candidateQuery.data

  return (
    <main className="candidate-details-page">
      <aside className="candidate-details-page__sidebar">
        <Button variant="text" className="candidate-details-page__back" onClick={() => navigate('/')}>
          Back to list
        </Button>

        {candidatesQuery.isLoading ? (
          <div className="candidate-details-page__state">
            <CircularProgress size={24} />
          </div>
        ) : candidatesQuery.isError ? (
          <div className="candidate-details-page__state candidate-details-page__state--error">
            {(candidatesQuery.error as Error).message}
          </div>
        ) : (
          <UserList
            title="Users"
            users={candidatesQuery.data ?? []}
            selectedId={Number.isFinite(selectedId) ? selectedId : undefined}
            onSelect={(id) => navigate(`/candidates/${id}`)}
          />
        )}
      </aside>

      <section className="candidate-details-page__content">
        {candidateQuery.isLoading ? (
          <div className="candidate-details-page__state">
            <CircularProgress />
          </div>
        ) : candidateQuery.isError ? (
          <div className="candidate-details-page__state candidate-details-page__state--error">
            {(candidateQuery.error as Error).message}
          </div>
        ) : !selected ? (
          <Typography color="text.secondary">Candidate not found.</Typography>
        ) : (
          <>
            <CandidateOverview candidate={selected} onOpenEdit={() => setDrawerOpen(true)} />
            <CandidateSections candidate={selected} />
          </>
        )}
      </section>

      <EditCandidateDrawer
        open={drawerOpen}
        form={form}
        dirty={dirty}
        loading={updateMutation.isPending}
        error={updateMutation.isError ? (updateMutation.error as Error).message : undefined}
        onClose={() => setDrawerOpen(false)}
        onChangeField={onChangeField}
        onReset={() => {
          const candidate = candidateQuery.data
          if (!candidate) return
          setForm({
            fullName: candidate.fullName ?? '',
            jobTitle: candidate.jobTitle ?? '',
            email: candidate.email ?? '',
            phone: candidate.phone ?? '',
            location: candidate.location ?? '',
            gitHubURL: candidate.gitHubURL ?? '',
            linkedInURL: candidate.linkedInURL ?? '',
            websiteURL: candidate.websiteURL ?? '',
            imageURL: candidate.imageURL ?? '',
            bio: candidate.bio ?? '',
          })
          setDirty(false)
        }}
        onSave={() => {
          if (!selected) return
          updateMutation.mutate(
            { id: selected.id, patch: form },
            {
              onSuccess: () => {
                setDrawerOpen(false)
                setDirty(false)
              },
            },
          )
        }}
      />
    </main>
  )
}
