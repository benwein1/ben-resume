import CodeIcon from '@mui/icons-material/Code'
import EditIcon from '@mui/icons-material/Edit'
import EmailIcon from '@mui/icons-material/Email'
import FolderIcon from '@mui/icons-material/Folder'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import SchoolIcon from '@mui/icons-material/School'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import WorkIcon from '@mui/icons-material/Work'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { Avatar, Button, Chip } from '@mui/material'
import * as React from 'react'
import { EditResumeDrawer } from '../components/resume/EditResumeDrawer'
import { benResume } from '../mock/benResume'
import type { BenResume } from '../mock/benResume'
import './ResumePage.scss'

const sectionOrder = [
  { id: 'bio', label: 'BIO' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'certifications', label: 'CERTIFICATIONS' },
  { id: 'recommendations', label: 'RECOMMENDATIONS' },
]

export function ResumePage() {
  const [resume, setResume] = React.useState<BenResume>(benResume)
  const [draft, setDraft] = React.useState<BenResume>(benResume)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const jumpTo = (id: string) => {
    const node = document.getElementById(id)
    if (!node) return
    node.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openEditor = () => {
    setDraft(resume)
    setDrawerOpen(true)
  }

  return (
    <main className="resume-page">
      <section className="resume-hero">
        <Avatar src={resume.imageUrl} className="resume-hero__avatar">
          {resume.name.charAt(0)}
        </Avatar>

        <h1>{resume.name}</h1>
        <p className="resume-hero__headline">{resume.headline}</p>

        <div className="resume-hero__contacts">
          <span>
            <EmailIcon fontSize="small" />
            {resume.email}
          </span>
          <span>
            <PhoneIcon fontSize="small" />
            {resume.phone}
          </span>
          <span>
            <LocationOnIcon fontSize="small" />
            {resume.location}
          </span>
        </div>

        <div className="resume-hero__socials">
          <a href={`https://${resume.linkedIn}`} target="_blank" rel="noreferrer">
            <LinkedInIcon fontSize="small" /> LinkedIn
          </a>
          <a href={`https://${resume.gitHub}`} target="_blank" rel="noreferrer">
            <GitHubIcon fontSize="small" /> GitHub
          </a>
        </div>
      </section>

      <nav className="resume-nav">
        {sectionOrder.map((section) => (
          <button key={section.id} type="button" onClick={() => jumpTo(section.id)}>
            {section.label}
          </button>
        ))}
      </nav>

      <section id="bio" className="resume-section">
        <h2>
          <ThumbUpIcon /> About Me
        </h2>
        <p>{resume.bio}</p>
      </section>

      <section id="experience" className="resume-section">
        <h2>
          <WorkIcon /> Experience
        </h2>
        <div className="resume-timeline">
          {resume.experiences.map((item) => (
            <article key={`${item.company}-${item.role}`} className="resume-timeline__item">
              <h3>{item.role}</h3>
              <p className="resume-item__highlight">
                {item.company} • {item.location}
              </p>
              <p className="resume-item__muted">{item.period}</p>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="resume-section">
        <h2>
          <SchoolIcon /> Education
        </h2>
        <div className="resume-timeline">
          {resume.education.map((item) => (
            <article key={`${item.institution}-${item.degree}`} className="resume-timeline__item">
              <h3>{item.degree}</h3>
              <p className="resume-item__highlight">
                {item.institution} • {item.location}
              </p>
              <p className="resume-item__muted">{item.period}</p>
              <p>{item.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="resume-section">
        <h2>
          <CodeIcon /> Skills
        </h2>
        <div className="resume-skills">
          {resume.skills.map((skill) => (
            <Chip key={skill} label={skill} className="resume-skill-chip" />
          ))}
        </div>
      </section>

      <section id="projects" className="resume-section">
        <h2>
          <FolderIcon /> Projects
        </h2>
        <div className="resume-grid">
          {resume.projects.map((project) => (
            <article key={project.title} className="resume-card">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>

              <div className="resume-card__tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="resume-card__actions">
                {project.liveUrl ? (
                  <Button size="small" variant="contained" href={project.liveUrl}>
                    View Live
                  </Button>
                ) : null}
                {project.githubUrl ? (
                  <Button size="small" variant="outlined" href={project.githubUrl}>
                    GitHub
                  </Button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="certifications" className="resume-section">
        <h2>
          <EmojiEventsIcon /> Certifications
        </h2>
        <div className="resume-certs">
          {resume.certifications.map((item) => (
            <article key={item.name} className="resume-cert-card">
              <h3>{item.name}</h3>
              <p>{item.issuer} • {item.date}</p>
              <p>Credential ID: {item.credentialId}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="recommendations" className="resume-section">
        <h2>
          <ThumbUpIcon /> Recommendations
        </h2>
        <div className="resume-grid resume-grid--three">
          {resume.recommendations.map((item) => (
            <article key={item.name} className="resume-rec-card">
              <p>"{item.quote}"</p>
              <div className="resume-rec-card__author">
                <Avatar src={item.avatarUrl} />
                <div>
                  <strong>{item.name}</strong>
                  <span>
                    {item.role} at {item.company}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <button type="button" className="resume-edit-fab" onClick={openEditor} aria-label="Edit resume">
        <EditIcon />
      </button>

      <EditResumeDrawer
        open={drawerOpen}
        draft={draft}
        onDraftChange={setDraft}
        onClose={() => setDrawerOpen(false)}
        onSave={() => {
          setResume(draft)
          setDrawerOpen(false)
        }}
      />
    </main>
  )
}
