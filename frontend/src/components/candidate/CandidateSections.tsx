import type { Candidate } from '../../api/types'
import './CandidateSections.scss'

type CandidateSectionsProps = {
  candidate: Candidate
}

type SectionId = 'about' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'references'

const sections: Array<{ id: SectionId; label: string }> = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'references', label: 'Recommendations' },
]

export function CandidateSections({ candidate }: CandidateSectionsProps) {
  const scrollTo = (id: SectionId) => {
    const element = document.getElementById(id)
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="candidate-sections">
      <nav className="candidate-sections__nav">
        {sections.map((section) => (
          <button key={section.id} type="button" onClick={() => scrollTo(section.id)}>
            {section.label}
          </button>
        ))}
      </nav>

      <section id="about" className="candidate-sections__section">
        <h2>About</h2>
        <p>{candidate.bio ?? 'No bio provided yet.'}</p>
      </section>

      <section id="experience" className="candidate-sections__section">
        <h2>Experience</h2>
        {(candidate.experiences ?? []).length === 0 ? (
          <p>No experience records.</p>
        ) : (
          <div className="candidate-sections__grid">
            {candidate.experiences?.map((experience) => (
              <article key={experience.id} className="candidate-sections__card">
                <h3>{experience.role ?? 'Role not provided'}</h3>
                <p>{experience.company ?? 'Company not provided'}</p>
                <p>
                  {experience.startDate ?? 'Start unknown'} -{' '}
                  {experience.currentlyWorkHere ? 'Present' : experience.endDate ?? 'End unknown'}
                </p>
                <p>{experience.description ?? ''}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="education" className="candidate-sections__section">
        <h2>Education</h2>
        {(candidate.education ?? []).length === 0 ? (
          <p>No education records.</p>
        ) : (
          <div className="candidate-sections__grid">
            {candidate.education?.map((education) => (
              <article key={education.id} className="candidate-sections__card">
                <h3>{education.degree ?? 'Degree not provided'}</h3>
                <p>{education.institution ?? 'Institution not provided'}</p>
                <p>{education.field ?? ''}</p>
                <p>
                  {education.startDate ?? 'Start unknown'} - {education.endDate ?? 'End unknown'}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="skills" className="candidate-sections__section">
        <h2>Skills</h2>
        {(candidate.skills ?? []).length === 0 ? (
          <p>No skills listed.</p>
        ) : (
          <div className="candidate-sections__tags">
            {candidate.skills?.map((skill) => (
              <span key={skill.id} className="candidate-sections__tag">
                {skill.skillName ?? 'Unnamed skill'}
              </span>
            ))}
          </div>
        )}
      </section>

      <section id="projects" className="candidate-sections__section">
        <h2>Projects</h2>
        {(candidate.projects ?? []).length === 0 ? (
          <p>No projects listed.</p>
        ) : (
          <div className="candidate-sections__grid">
            {candidate.projects?.map((project) => (
              <article key={project.id} className="candidate-sections__card">
                <h3>{project.projectTitle ?? 'Untitled project'}</h3>
                <p>{project.description ?? ''}</p>
                <p>{project.techStack ?? ''}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="certifications" className="candidate-sections__section">
        <h2>Certifications</h2>
        {(candidate.certifications ?? []).length === 0 ? (
          <p>No certifications listed.</p>
        ) : (
          <div className="candidate-sections__grid">
            {candidate.certifications?.map((certification) => (
              <article key={certification.id} className="candidate-sections__card">
                <h3>{certification.certificationName ?? 'Unnamed certification'}</h3>
                <p>{certification.issuer ?? ''}</p>
                <p>{certification.date ?? ''}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="references" className="candidate-sections__section">
        <h2>Recommendations</h2>
        {(candidate.recommendations ?? []).length === 0 ? (
          <p>No recommendations listed.</p>
        ) : (
          <div className="candidate-sections__grid">
            {candidate.recommendations?.map((recommendation) => (
              <article key={recommendation.id} className="candidate-sections__card">
                <h3>{recommendation.name ?? 'Anonymous'}</h3>
                <p>{recommendation.role ?? ''}</p>
                <p>{recommendation.recommendation ?? ''}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
