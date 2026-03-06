import { pgTable, integer, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const candidates = pgTable('candidates', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
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
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  candidateId: integer('candidateId')
    .notNull()
    .references(() => candidates.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 255 }),
  company: varchar('company', { length: 255 }),
  startDate: timestamp('start_date', { withTimezone: false }),
  endDate: timestamp('end_date', { withTimezone: false }),
  currentlyWorkHere: boolean('currentltyWorkHere'),
  description: text('description')
});

export const education = pgTable('education', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  candidateId: integer('candidateId')
    .notNull()
    .references(() => candidates.id, { onDelete: 'cascade' }),
  institution: varchar('institution', { length: 255 }),
  degree: varchar('degree', { length: 255 }),
  field: varchar('field', { length: 255 }),
  startDate: timestamp('start_date', { withTimezone: false }),
  endDate: timestamp('end_date', { withTimezone: false }),
  description: text('description')
});

export const skills = pgTable('skills', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  candidateId: integer('candidateId')
    .notNull()
    .references(() => candidates.id, { onDelete: 'cascade' }),
  skillName: varchar('skillName', { length: 255 }),
  category: integer('category'),
  level: integer('level'),
  description: text('description')
});

export const projects = pgTable('projects', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  candidateId: integer('candidateId')
    .notNull()
    .references(() => candidates.id, { onDelete: 'cascade' }),
  projectTitle: varchar('projectTitle', { length: 255 }),
  description: text('description'),
  techStack: text('techStack'),
  gitHubURL: varchar('gitHubURL', { length: 512 }),
  liveURL: varchar('liveURL', { length: 512 })
});

export const certifications = pgTable('certifications', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  candidateId: integer('candidateId')
    .notNull()
    .references(() => candidates.id, { onDelete: 'cascade' }),
  certificationName: varchar('certificationName', { length: 255 }),
  issuer: text('issuer'),
  date: timestamp('Date', { withTimezone: false }),
  credentialURL: varchar('credentianlURL', { length: 512 })
});

export const recommendations = pgTable('recommendations', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  candidateId: integer('candidateId')
    .notNull()
    .references(() => candidates.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }),
  role: text('role'),
  recommendation: text('recommendation')
});

