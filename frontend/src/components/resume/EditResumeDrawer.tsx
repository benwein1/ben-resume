import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Button, Drawer, IconButton, Tab, Tabs, TextField } from '@mui/material'
import * as React from 'react'
import type { ResumeData } from '../../types/resume'
import './EditResumeDrawer.scss'

type EditTab = 'bio' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'recommendations'

type Props = {
  open: boolean
  draft: ResumeData
  onChange: (next: ResumeData) => void
  onClose: () => void
  onSave: () => void
}

const tabs: Array<{ key: EditTab; label: string }> = [
  { key: 'bio', label: 'BIO' },
  { key: 'experience', label: 'EXPERIENCE' },
  { key: 'education', label: 'EDUCATION' },
  { key: 'skills', label: 'SKILLS' },
  { key: 'projects', label: 'PROJECTS' },
  { key: 'certifications', label: 'CERTIFICATIONS' },
  { key: 'recommendations', label: 'RECOMMENDATIONS' },
]

export function EditResumeDrawer({ open, draft, onChange, onClose, onSave }: Props) {
  const [tab, setTab] = React.useState<EditTab>('bio')

  const update = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => onChange({ ...draft, [key]: value })

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <aside className="edit-resume-drawer">
        <header className="edit-resume-drawer__header">
          <h2>Edit Resume</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </header>

        <Tabs value={tab} onChange={(_, v: EditTab) => setTab(v)} variant="scrollable" scrollButtons="auto" className="edit-resume-drawer__tabs">
          {tabs.map((item) => (
            <Tab key={item.key} value={item.key} label={item.label} />
          ))}
        </Tabs>

        <div className="edit-resume-drawer__body">
          {tab === 'bio' ? (
            <div className="edit-resume-drawer__group">
              <TextField label="Name" fullWidth value={draft.name} onChange={(e) => update('name', e.target.value)} />
              <TextField label="Title" fullWidth value={draft.headline} onChange={(e) => update('headline', e.target.value)} />
              <TextField label="Email" fullWidth value={draft.email} onChange={(e) => update('email', e.target.value)} />
              <TextField label="Phone" fullWidth value={draft.phone} onChange={(e) => update('phone', e.target.value)} />
              <TextField label="Location" fullWidth value={draft.location} onChange={(e) => update('location', e.target.value)} />
              <TextField label="LinkedIn" fullWidth value={draft.linkedIn} onChange={(e) => update('linkedIn', e.target.value)} />
              <TextField label="GitHub" fullWidth value={draft.gitHub} onChange={(e) => update('gitHub', e.target.value)} />
              <TextField label="Website" fullWidth value={draft.website} onChange={(e) => update('website', e.target.value)} />
              <TextField label="Avatar URL" fullWidth value={draft.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} />
              <TextField label="Summary" fullWidth multiline minRows={4} value={draft.bio} onChange={(e) => update('bio', e.target.value)} />
            </div>
          ) : null}

          {tab === 'experience' ? (
            <div className="edit-resume-drawer__group">
              <div className="edit-resume-drawer__section-actions"><Button size="small" startIcon={<AddIcon />} onClick={() => update('experiences', [...draft.experiences, { role: '', company: '', location: '', period: '', description: '' }])}>Add experience</Button></div>
              {draft.experiences.map((item, i) => (
                <div className="edit-resume-drawer__block" key={`${item.role}-${i}`}>
                  <div className="edit-resume-drawer__block-actions"><IconButton size="small" onClick={() => update('experiences', draft.experiences.filter((_, idx) => idx !== i))}><DeleteOutlineIcon /></IconButton></div>
                  <TextField label="Role" fullWidth value={item.role} onChange={(e) => update('experiences', draft.experiences.map((x, idx) => idx === i ? { ...x, role: e.target.value } : x))} />
                  <TextField label="Company" fullWidth value={item.company} onChange={(e) => update('experiences', draft.experiences.map((x, idx) => idx === i ? { ...x, company: e.target.value } : x))} />
                  <TextField label="Location" fullWidth value={item.location} onChange={(e) => update('experiences', draft.experiences.map((x, idx) => idx === i ? { ...x, location: e.target.value } : x))} />
                  <TextField label="Period" fullWidth value={item.period} onChange={(e) => update('experiences', draft.experiences.map((x, idx) => idx === i ? { ...x, period: e.target.value } : x))} />
                  <TextField label="Description" fullWidth multiline minRows={3} value={item.description} onChange={(e) => update('experiences', draft.experiences.map((x, idx) => idx === i ? { ...x, description: e.target.value } : x))} />
                </div>
              ))}
            </div>
          ) : null}

          {tab === 'education' ? (
            <div className="edit-resume-drawer__group">
              <div className="edit-resume-drawer__section-actions"><Button size="small" startIcon={<AddIcon />} onClick={() => update('education', [...draft.education, { degree: '', institution: '', location: '', period: '', details: '' }])}>Add education</Button></div>
              {draft.education.map((item, i) => (
                <div className="edit-resume-drawer__block" key={`${item.degree}-${i}`}>
                  <div className="edit-resume-drawer__block-actions"><IconButton size="small" onClick={() => update('education', draft.education.filter((_, idx) => idx !== i))}><DeleteOutlineIcon /></IconButton></div>
                  <TextField label="Degree" fullWidth value={item.degree} onChange={(e) => update('education', draft.education.map((x, idx) => idx === i ? { ...x, degree: e.target.value } : x))} />
                  <TextField label="Institution" fullWidth value={item.institution} onChange={(e) => update('education', draft.education.map((x, idx) => idx === i ? { ...x, institution: e.target.value } : x))} />
                  <TextField label="Location" fullWidth value={item.location} onChange={(e) => update('education', draft.education.map((x, idx) => idx === i ? { ...x, location: e.target.value } : x))} />
                  <TextField label="Period" fullWidth value={item.period} onChange={(e) => update('education', draft.education.map((x, idx) => idx === i ? { ...x, period: e.target.value } : x))} />
                  <TextField label="Details" fullWidth multiline minRows={3} value={item.details} onChange={(e) => update('education', draft.education.map((x, idx) => idx === i ? { ...x, details: e.target.value } : x))} />
                </div>
              ))}
            </div>
          ) : null}

          {tab === 'skills' ? (
            <div className="edit-resume-drawer__group">
              <div className="edit-resume-drawer__section-actions"><Button size="small" startIcon={<AddIcon />} onClick={() => update('skills', [...draft.skills, ''])}>Add skill</Button></div>
              {draft.skills.map((skill, i) => (
                <div className="edit-resume-drawer__row" key={`${skill}-${i}`}>
                  <TextField label="Skill" fullWidth value={skill} onChange={(e) => update('skills', draft.skills.map((x, idx) => idx === i ? e.target.value : x))} />
                  <IconButton size="small" onClick={() => update('skills', draft.skills.filter((_, idx) => idx !== i))}><DeleteOutlineIcon /></IconButton>
                </div>
              ))}
            </div>
          ) : null}

          {tab === 'projects' ? (
            <div className="edit-resume-drawer__group">
              <div className="edit-resume-drawer__section-actions"><Button size="small" startIcon={<AddIcon />} onClick={() => update('projects', [...draft.projects, { title: '', summary: '', tags: [], liveUrl: '', githubUrl: '' }])}>Add project</Button></div>
              {draft.projects.map((item, i) => (
                <div className="edit-resume-drawer__block" key={`${item.title}-${i}`}>
                  <div className="edit-resume-drawer__block-actions"><IconButton size="small" onClick={() => update('projects', draft.projects.filter((_, idx) => idx !== i))}><DeleteOutlineIcon /></IconButton></div>
                  <TextField label="Title" fullWidth value={item.title} onChange={(e) => update('projects', draft.projects.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} />
                  <TextField label="Summary" fullWidth multiline minRows={3} value={item.summary} onChange={(e) => update('projects', draft.projects.map((x, idx) => idx === i ? { ...x, summary: e.target.value } : x))} />
                  <TextField label="Tags (comma separated)" fullWidth value={item.tags.join(', ')} onChange={(e) => update('projects', draft.projects.map((x, idx) => idx === i ? { ...x, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) } : x))} />
                  <TextField label="Live URL" fullWidth value={item.liveUrl ?? ''} onChange={(e) => update('projects', draft.projects.map((x, idx) => idx === i ? { ...x, liveUrl: e.target.value } : x))} />
                  <TextField label="GitHub URL" fullWidth value={item.githubUrl ?? ''} onChange={(e) => update('projects', draft.projects.map((x, idx) => idx === i ? { ...x, githubUrl: e.target.value } : x))} />
                </div>
              ))}
            </div>
          ) : null}

          {tab === 'certifications' ? (
            <div className="edit-resume-drawer__group">
              <div className="edit-resume-drawer__section-actions"><Button size="small" startIcon={<AddIcon />} onClick={() => update('certifications', [...draft.certifications, { name: '', issuer: '', date: '', credentialId: '' }])}>Add certification</Button></div>
              {draft.certifications.map((item, i) => (
                <div className="edit-resume-drawer__block" key={`${item.name}-${i}`}>
                  <div className="edit-resume-drawer__block-actions"><IconButton size="small" onClick={() => update('certifications', draft.certifications.filter((_, idx) => idx !== i))}><DeleteOutlineIcon /></IconButton></div>
                  <TextField label="Name" fullWidth value={item.name} onChange={(e) => update('certifications', draft.certifications.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))} />
                  <TextField label="Issuer" fullWidth value={item.issuer} onChange={(e) => update('certifications', draft.certifications.map((x, idx) => idx === i ? { ...x, issuer: e.target.value } : x))} />
                  <TextField label="Date" fullWidth value={item.date} onChange={(e) => update('certifications', draft.certifications.map((x, idx) => idx === i ? { ...x, date: e.target.value } : x))} />
                  <TextField label="Credential ID" fullWidth value={item.credentialId} onChange={(e) => update('certifications', draft.certifications.map((x, idx) => idx === i ? { ...x, credentialId: e.target.value } : x))} />
                </div>
              ))}
            </div>
          ) : null}

          {tab === 'recommendations' ? (
            <div className="edit-resume-drawer__group">
              <div className="edit-resume-drawer__section-actions"><Button size="small" startIcon={<AddIcon />} onClick={() => update('recommendations', [...draft.recommendations, { name: '', role: '', company: '', quote: '', avatarUrl: '' }])}>Add recommendation</Button></div>
              {draft.recommendations.map((item, i) => (
                <div className="edit-resume-drawer__block" key={`${item.name}-${i}`}>
                  <div className="edit-resume-drawer__block-actions"><IconButton size="small" onClick={() => update('recommendations', draft.recommendations.filter((_, idx) => idx !== i))}><DeleteOutlineIcon /></IconButton></div>
                  <TextField label="Name" fullWidth value={item.name} onChange={(e) => update('recommendations', draft.recommendations.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))} />
                  <TextField label="Role" fullWidth value={item.role} onChange={(e) => update('recommendations', draft.recommendations.map((x, idx) => idx === i ? { ...x, role: e.target.value } : x))} />
                  <TextField label="Company" fullWidth value={item.company} onChange={(e) => update('recommendations', draft.recommendations.map((x, idx) => idx === i ? { ...x, company: e.target.value } : x))} />
                  <TextField label="Quote" fullWidth multiline minRows={3} value={item.quote} onChange={(e) => update('recommendations', draft.recommendations.map((x, idx) => idx === i ? { ...x, quote: e.target.value } : x))} />
                  <TextField label="Avatar URL" fullWidth value={item.avatarUrl} onChange={(e) => update('recommendations', draft.recommendations.map((x, idx) => idx === i ? { ...x, avatarUrl: e.target.value } : x))} />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <footer className="edit-resume-drawer__footer">
          <Button variant="outlined" onClick={onClose}>Close</Button>
          <Button variant="contained" onClick={onSave}>Save</Button>
        </footer>
      </aside>
    </Drawer>
  )
}
