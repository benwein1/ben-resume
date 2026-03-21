import type { ResumeData } from '../types/resume'

export type ProfileOverrides = Pick<
  ResumeData,
  'name' | 'headline' | 'location' | 'email' | 'phone' | 'linkedIn' | 'gitHub' | 'website' | 'imageUrl' | 'bio'
>

export const benProfileMock: ProfileOverrides = {
  name: 'Your Name',
  headline: 'Full Stack Developer & Tech Enthusiast',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  linkedIn: 'linkedin.com/in/yourname',
  gitHub: 'github.com/yourname',
  website: 'https://portfolio.example.com',
  imageUrl: 'https://via.placeholder.com/320',
  bio: 'Passionate software engineer with 5+ years of experience building scalable web applications and leading development teams. Specialized in React, Node.js, and cloud technologies. Always eager to learn new technologies and solve complex problems.',
}

export const emptyResumeData: ResumeData = {
  ...benProfileMock,
  skills: [],
  experiences: [],
  education: [],
  projects: [],
  certifications: [],
  recommendations: [],
}
