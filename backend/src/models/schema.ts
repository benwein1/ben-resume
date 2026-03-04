import { pgTable, integer, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const candidates = pgTable('candidates', {
  id: integer('id').primaryKey(),
  fullName: varchar('fullName', { length: 255 }),
  jobTitle: varchar('jobTitle', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  location: varchar('location', { length: 255 }),
  gitHubURL: varchar('gitHubURL', { length: 512 }),
  linkedInURL: varchar('linkedInURL', { length: 512 }),
  websiteURL: varchar('websiteURL', { length: 512 }),
  imageURL: varchar('imageURL', { length: 512 }),
  bio: text('bio')
});

export const experiences = pgTable('expericenes', {
  candidateId: integer('candidateId').primaryKey(),
  role: varchar('role', { length: 255 }),
  company: varchar('company', { length: 255 }),
  startDate: timestamp('start_date', { withTimezone: false }),
  endDate: timestamp('end_date', { withTimezone: false }),
  currentlyWorkHere: boolean('currentltyWorkHere'),
  description: text('description')
});

export const education = pgTable('education', {
  candidateId: integer('candidateId').primaryKey(),
  institution: varchar('institution', { length: 255 }),
  degree: varchar('degree', { length: 255 }),
  field: varchar('field', { length: 255 }),
  startDate: timestamp('start_date', { withTimezone: false }),
  endDate: timestamp('end_date', { withTimezone: false }),
  description: text('description')
});

export const skills = pgTable('skills', {
  candidateId: integer('candidateId').primaryKey(),
  skillName: varchar('skillName', { length: 255 }),
  category: integer('category'),
  level: integer('level'),
  description: text('description')
});

export const projects = pgTable('projects', {
  candidateId: integer('candidateId').primaryKey(),
  projectTitle: varchar('projectTitle', { length: 255 }),
  description: text('description'),
  techStack: text('techStack'),
  gitHubURL: varchar('gitHubURL', { length: 512 }),
  liveURL: varchar('liveURL', { length: 512 })
});

export const certifications = pgTable('certifications', {
  candidateId: integer('candidateId').primaryKey(),
  certificationName: varchar('certificationName', { length: 255 }),
  issuer: text('issuer'),
  date: timestamp('Date', { withTimezone: false }),
  credentialURL: varchar('credentianlURL', { length: 512 })
});

export const recommendations = pgTable('recommendations', {
  candidateId: integer('candidateId').primaryKey(),
  name: varchar('name', { length: 255 }),
  role: text('role'),
  recommendation: text('recommendation')
});

