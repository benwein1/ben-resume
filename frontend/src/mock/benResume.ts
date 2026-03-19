export type ResumeExperience = {
  role: string
  company: string
  location: string
  period: string
  description: string
}

export type ResumeEducation = {
  degree: string
  institution: string
  location: string
  period: string
  details: string
}

export type ResumeProject = {
  title: string
  summary: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export type ResumeCertification = {
  name: string
  issuer: string
  date: string
  credentialId: string
}

export type ResumeRecommendation = {
  name: string
  role: string
  company: string
  quote: string
  avatarUrl: string
}

export type BenResume = {
  name: string
  headline: string
  location: string
  email: string
  phone: string
  linkedIn: string
  gitHub: string
  website: string
  imageUrl: string
  bio: string
  skills: string[]
  experiences: ResumeExperience[]
  education: ResumeEducation[]
  projects: ResumeProject[]
  certifications: ResumeCertification[]
  recommendations: ResumeRecommendation[]
}

export const benResume: BenResume = {
  name: 'Ben Gur Weinshtein',
  headline: 'Full Stack Developer & Tech Enthusiast',
  location: 'San Francisco, CA',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  linkedIn: 'linkedin.com/in/yourname',
  gitHub: 'github.com/yourname',
  website: 'https://portfolio.example.com',
  imageUrl: 'https://via.placeholder.com/320',
  bio: 'Passionate software engineer with 5+ years of experience building scalable web applications and leading development teams. Specialized in React, Node.js, and cloud technologies. Always eager to learn new technologies and solve complex problems.',
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'AWS',
    'Docker',
    'Kubernetes',
    'MongoDB',
    'PostgreSQL',
    'GraphQL',
    'REST APIs',
    'Git',
    'CI/CD',
    'Agile/Scrum',
    'TDD',
  ],
  experiences: [
    {
      role: 'Senior Software Engineer',
      company: 'Tech Company Inc.',
      location: 'San Francisco, CA',
      period: 'Jan 2022 - Present',
      description:
        'Leading development of microservices architecture using React, Node.js, and AWS. Mentoring junior developers and conducting code reviews. Improved system performance by 40% through optimization.',
    },
    {
      role: 'Software Engineer',
      company: 'Startup Solutions',
      location: 'Remote',
      period: 'Mar 2020 - Dec 2021',
      description:
        'Built full-stack web applications using React, Express, and MongoDB. Implemented CI/CD pipelines and automated testing. Collaborated with designers to create intuitive user interfaces.',
    },
    {
      role: 'Junior Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      period: 'Jun 2018 - Feb 2020',
      description:
        'Developed responsive websites and web applications. Worked with JavaScript, HTML, CSS, and various frameworks. Participated in agile development processes.',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'State University',
      location: 'Boston, MA',
      period: 'Sep 2014 - May 2018',
      details:
        "Focus on software engineering, algorithms, and data structures. Dean's List all semesters. Active member of Computer Science Club.",
    },
  ],
  projects: [
    {
      title: 'E-Commerce Platform',
      summary:
        'Full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Task Management App',
      summary:
        'Collaborative task management application with real-time updates and team features.',
      tags: ['React', 'Firebase', 'Material-UI'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Weather Dashboard',
      summary: 'Interactive weather dashboard with maps, forecasts, and historical data visualization.',
      tags: ['React', 'D3.js', 'Weather API'],
      githubUrl: '#',
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Jun 2023',
      credentialId: 'ABC123XYZ',
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: 'Nov 2022',
      credentialId: 'GCP456DEF',
    },
    {
      name: 'Certified Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      date: 'Mar 2023',
      credentialId: 'CKA789GHI',
    },
  ],
  recommendations: [
    {
      name: 'John Smith',
      role: 'Engineering Manager',
      company: 'Tech Company Inc.',
      quote:
        'An exceptional developer who consistently delivers high-quality code and innovative solutions. Great team player and always willing to help others.',
      avatarUrl: 'https://i.pravatar.cc/100?img=12',
    },
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'Startup Solutions',
      quote:
        "One of the most talented engineers I've worked with. Combines technical expertise with excellent communication skills. A true asset to any team.",
      avatarUrl: 'https://i.pravatar.cc/100?img=32',
    },
    {
      name: 'Michael Chen',
      role: 'Senior Developer',
      company: 'Tech Company Inc.',
      quote:
        'Brilliant problem solver with a passion for clean code and best practices. Mentored me when I joined the team and helped me grow as a developer.',
      avatarUrl: 'https://i.pravatar.cc/100?img=68',
    },
  ],
}
