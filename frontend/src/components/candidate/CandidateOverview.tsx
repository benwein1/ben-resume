import { Avatar, Button, Chip } from '@mui/material'
import type { Candidate } from '../../api/types'
import './CandidateOverview.scss'

type CandidateOverviewProps = {
  candidate: Candidate
  onOpenEdit: () => void
}

export function CandidateOverview({ candidate, onOpenEdit }: CandidateOverviewProps) {
  return (
    <header className="candidate-overview">
      <div className="candidate-overview__profile">
        <Avatar src={candidate.imageURL ?? undefined} className="candidate-overview__avatar">
          {candidate.fullName?.charAt(0) ?? 'U'}
        </Avatar>

        <div className="candidate-overview__identity">
          <h1 className="candidate-overview__name">{candidate.fullName ?? `Candidate #${candidate.id}`}</h1>
          <p className="candidate-overview__title">{candidate.jobTitle ?? 'No job title'}</p>
          <div className="candidate-overview__chips">
            <Chip label={candidate.location ?? 'Unknown location'} />
            <Chip label={candidate.email ?? 'No email'} />
          </div>
        </div>
      </div>

      <Button variant="contained" className="candidate-overview__edit" onClick={onOpenEdit}>
        Edit Profile
      </Button>
    </header>
  )
}
