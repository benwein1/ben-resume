import { Avatar, Typography } from '@mui/material'
import type { Candidate } from '../../api/types'
import './UserList.scss'

type UserListProps = {
  title: string
  users: Candidate[]
  selectedId?: number
  onSelect: (id: number) => void
}

export function UserList({ title, users, selectedId, onSelect }: UserListProps) {
  return (
    <section className="user-list">
      <Typography variant="h6" className="user-list__title">
        {title}
      </Typography>

      <div className="user-list__items">
        {users.map((user) => {
          const active = selectedId === user.id

          return (
            <button
              key={user.id}
              type="button"
              className={`user-list__item ${active ? 'user-list__item--active' : ''}`}
              onClick={() => onSelect(user.id)}
            >
              <Avatar src={user.imageURL ?? undefined} className="user-list__avatar">
                {user.fullName?.charAt(0) ?? 'U'}
              </Avatar>
              <span className="user-list__meta">
                <span className="user-list__name">{user.fullName ?? `Candidate #${user.id}`}</span>
                <span className="user-list__basic">{user.jobTitle ?? 'No title added'}</span>
                <span className="user-list__basic">{user.location ?? 'No location'}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
