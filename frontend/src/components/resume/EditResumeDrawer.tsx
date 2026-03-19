import CloseIcon from '@mui/icons-material/Close'
import { Button, Drawer, IconButton, Tab, Tabs, TextField } from '@mui/material'
import * as React from 'react'
import type { BenResume } from '../../mock/benResume'
import './EditResumeDrawer.scss'

type EditTab = 'bio' | 'experience' | 'education' | 'skills' | 'projects'

type EditResumeDrawerProps = {
  open: boolean
  draft: BenResume
  onDraftChange: (next: BenResume) => void
  onClose: () => void
  onSave: () => void
}

const tabs: Array<{ key: EditTab; label: string }> = [
  { key: 'bio', label: 'BIO' },
  { key: 'experience', label: 'EXPERIENCE' },
  { key: 'education', label: 'EDUCATION' },
  { key: 'skills', label: 'SKILLS' },
  { key: 'projects', label: 'PROJECTS' },
]

export function EditResumeDrawer({ open, draft, onDraftChange, onClose, onSave }: EditResumeDrawerProps) {
  const [activeTab, setActiveTab] = React.useState<EditTab>('bio')

  const updateText = (key: keyof Pick<BenResume, 'name' | 'headline' | 'email' | 'phone' | 'location' | 'linkedIn' | 'gitHub' | 'imageUrl' | 'bio' | 'website'>, value: string) => {
    onDraftChange({ ...draft, [key]: value })
  }

  const updateExperience = (
    index: number,
    key: keyof BenResume['experiences'][number],
    value: string,
  ) => {
    const next = [...draft.experiences]
    next[index] = { ...next[index], [key]: value }
    onDraftChange({ ...draft, experiences: next })
  }

  const updateEducation = (
    index: number,
    key: keyof BenResume['education'][number],
    value: string,
  ) => {
    const next = [...draft.education]
    next[index] = { ...next[index], [key]: value }
    onDraftChange({ ...draft, education: next })
  }

  const updateProject = (
    index: number,
    key: keyof BenResume['projects'][number],
    value: string,
  ) => {
    const next = [...draft.projects]
    if (key === 'tags') {
      next[index] = { ...next[index], tags: value.split(',').map((tag) => tag.trim()).filter(Boolean) }
    } else {
      next[index] = { ...next[index], [key]: value }
    }
    onDraftChange({ ...draft, projects: next })
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <aside className="edit-resume-drawer">
        <header className="edit-resume-drawer__header">
          <h2>Edit Resume</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </header>

        <Tabs
          value={activeTab}
          onChange={(_, value: EditTab) => setActiveTab(value)}
          className="edit-resume-drawer__tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} value={tab.key} label={tab.label} />
          ))}
        </Tabs>

        <div className="edit-resume-drawer__body">
          {activeTab === 'bio' ? (
            <div className="edit-resume-drawer__group">
              <TextField label="Name" value={draft.name} onChange={(e) => updateText('name', e.target.value)} fullWidth />
              <TextField label="Title" value={draft.headline} onChange={(e) => updateText('headline', e.target.value)} fullWidth />
              <TextField label="Email" value={draft.email} onChange={(e) => updateText('email', e.target.value)} fullWidth />
              <TextField label="Phone" value={draft.phone} onChange={(e) => updateText('phone', e.target.value)} fullWidth />
              <TextField label="Location" value={draft.location} onChange={(e) => updateText('location', e.target.value)} fullWidth />
              <TextField label="LinkedIn" value={draft.linkedIn} onChange={(e) => updateText('linkedIn', e.target.value)} fullWidth />
              <TextField label="GitHub" value={draft.gitHub} onChange={(e) => updateText('gitHub', e.target.value)} fullWidth />
              <TextField label="Website" value={draft.website} onChange={(e) => updateText('website', e.target.value)} fullWidth />
              <TextField label="Avatar URL" value={draft.imageUrl} onChange={(e) => updateText('imageUrl', e.target.value)} fullWidth />
              <TextField
                label="Summary"
                value={draft.bio}
                onChange={(e) => updateText('bio', e.target.value)}
                fullWidth
                multiline
                minRows={4}
              />
            </div>
          ) : null}

          {activeTab === 'experience' ? (
            <div className="edit-resume-drawer__group">
              {draft.experiences.map((item, index) => (
                <div key={`${item.role}-${index}`} className="edit-resume-drawer__block">
                  <TextField label="Role" value={item.role} onChange={(e) => updateExperience(index, 'role', e.target.value)} fullWidth />
                  <TextField label="Company" value={item.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} fullWidth />
                  <TextField label="Location" value={item.location} onChange={(e) => updateExperience(index, 'location', e.target.value)} fullWidth />
                  <TextField label="Period" value={item.period} onChange={(e) => updateExperience(index, 'period', e.target.value)} fullWidth />
                  <TextField
                    label="Description"
                    value={item.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    fullWidth
                    multiline
                    minRows={3}
                  />
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === 'education' ? (
            <div className="edit-resume-drawer__group">
              {draft.education.map((item, index) => (
                <div key={`${item.degree}-${index}`} className="edit-resume-drawer__block">
                  <TextField label="Degree" value={item.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} fullWidth />
                  <TextField label="Institution" value={item.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} fullWidth />
                  <TextField label="Location" value={item.location} onChange={(e) => updateEducation(index, 'location', e.target.value)} fullWidth />
                  <TextField label="Period" value={item.period} onChange={(e) => updateEducation(index, 'period', e.target.value)} fullWidth />
                  <TextField label="Details" value={item.details} onChange={(e) => updateEducation(index, 'details', e.target.value)} fullWidth multiline minRows={3} />
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === 'skills' ? (
            <div className="edit-resume-drawer__group">
              <TextField
                label="Skills (comma separated)"
                value={draft.skills.join(', ')}
                onChange={(e) =>
                  onDraftChange({
                    ...draft,
                    skills: e.target.value
                      .split(',')
                      .map((skill) => skill.trim())
                      .filter(Boolean),
                  })
                }
                fullWidth
                multiline
                minRows={4}
              />
            </div>
          ) : null}

          {activeTab === 'projects' ? (
            <div className="edit-resume-drawer__group">
              {draft.projects.map((item, index) => (
                <div key={`${item.title}-${index}`} className="edit-resume-drawer__block">
                  <TextField label="Title" value={item.title} onChange={(e) => updateProject(index, 'title', e.target.value)} fullWidth />
                  <TextField label="Summary" value={item.summary} onChange={(e) => updateProject(index, 'summary', e.target.value)} fullWidth multiline minRows={3} />
                  <TextField label="Tags (comma separated)" value={item.tags.join(', ')} onChange={(e) => updateProject(index, 'tags', e.target.value)} fullWidth />
                  <TextField label="Live URL" value={item.liveUrl ?? ''} onChange={(e) => updateProject(index, 'liveUrl', e.target.value)} fullWidth />
                  <TextField label="GitHub URL" value={item.githubUrl ?? ''} onChange={(e) => updateProject(index, 'githubUrl', e.target.value)} fullWidth />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <footer className="edit-resume-drawer__footer">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onSave}>
            Save
          </Button>
        </footer>
      </aside>
    </Drawer>
  )
}
