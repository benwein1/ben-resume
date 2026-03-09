import { CircularProgress, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { candidateKeys, listCandidates } from '../api/candidates'
import { UserList } from '../components/users/UserList'
import './CandidatesPage.scss'

export function CandidatesPage() {
  const navigate = useNavigate()
  const candidatesQuery = useQuery({
    queryKey: candidateKeys.list(),
    queryFn: listCandidates,
  })

  return (
    <main className="candidates-page">
      <header className="candidates-page__header">
        <Typography variant="h3" className="candidates-page__title">
          Candidate Directory
        </Typography>
        <Typography className="candidates-page__subtitle">
          Browse profiles, review complete details, and edit candidates from a side panel.
        </Typography>
      </header>

      <section className="candidates-page__content">
        {candidatesQuery.isLoading ? (
          <div className="candidates-page__state">
            <CircularProgress size={30} />
          </div>
        ) : candidatesQuery.isError ? (
          <div className="candidates-page__state candidates-page__state--error">
            {(candidatesQuery.error as Error).message}
          </div>
        ) : (
          <UserList
            title="All Users"
            users={candidatesQuery.data ?? []}
            onSelect={(id) => navigate(`/candidates/${id}`)}
          />
        )}
      </section>
    </main>
  )
}
