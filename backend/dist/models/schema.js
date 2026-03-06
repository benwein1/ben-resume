"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendations = exports.certifications = exports.projects = exports.skills = exports.education = exports.experiences = exports.candidates = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.candidates = (0, pg_core_1.pgTable)('candidates', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    fullName: (0, pg_core_1.varchar)('fullName', { length: 255 }),
    jobTitle: (0, pg_core_1.varchar)('jobTitle', { length: 255 }),
    email: (0, pg_core_1.varchar)('email', { length: 255 }),
    phone: (0, pg_core_1.varchar)('phone', { length: 50 }),
    location: (0, pg_core_1.varchar)('location', { length: 255 }),
    gitHubURL: (0, pg_core_1.varchar)('gitHubURL', { length: 512 }),
    linkedInURL: (0, pg_core_1.varchar)('linkedInURL', { length: 512 }),
    websiteURL: (0, pg_core_1.varchar)('websiteURL', { length: 512 }),
    imageURL: (0, pg_core_1.varchar)('imageURL', { length: 512 }),
    bio: (0, pg_core_1.text)('bio')
});
exports.experiences = (0, pg_core_1.pgTable)('expericenes', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    candidateId: (0, pg_core_1.integer)('candidateId')
        .notNull()
        .references(() => exports.candidates.id, { onDelete: 'cascade' }),
    role: (0, pg_core_1.varchar)('role', { length: 255 }),
    company: (0, pg_core_1.varchar)('company', { length: 255 }),
    startDate: (0, pg_core_1.timestamp)('start_date', { withTimezone: false }),
    endDate: (0, pg_core_1.timestamp)('end_date', { withTimezone: false }),
    currentlyWorkHere: (0, pg_core_1.boolean)('currentltyWorkHere'),
    description: (0, pg_core_1.text)('description')
});
exports.education = (0, pg_core_1.pgTable)('education', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    candidateId: (0, pg_core_1.integer)('candidateId')
        .notNull()
        .references(() => exports.candidates.id, { onDelete: 'cascade' }),
    institution: (0, pg_core_1.varchar)('institution', { length: 255 }),
    degree: (0, pg_core_1.varchar)('degree', { length: 255 }),
    field: (0, pg_core_1.varchar)('field', { length: 255 }),
    startDate: (0, pg_core_1.timestamp)('start_date', { withTimezone: false }),
    endDate: (0, pg_core_1.timestamp)('end_date', { withTimezone: false }),
    description: (0, pg_core_1.text)('description')
});
exports.skills = (0, pg_core_1.pgTable)('skills', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    candidateId: (0, pg_core_1.integer)('candidateId')
        .notNull()
        .references(() => exports.candidates.id, { onDelete: 'cascade' }),
    skillName: (0, pg_core_1.varchar)('skillName', { length: 255 }),
    category: (0, pg_core_1.integer)('category'),
    level: (0, pg_core_1.integer)('level'),
    description: (0, pg_core_1.text)('description')
});
exports.projects = (0, pg_core_1.pgTable)('projects', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    candidateId: (0, pg_core_1.integer)('candidateId')
        .notNull()
        .references(() => exports.candidates.id, { onDelete: 'cascade' }),
    projectTitle: (0, pg_core_1.varchar)('projectTitle', { length: 255 }),
    description: (0, pg_core_1.text)('description'),
    techStack: (0, pg_core_1.text)('techStack'),
    gitHubURL: (0, pg_core_1.varchar)('gitHubURL', { length: 512 }),
    liveURL: (0, pg_core_1.varchar)('liveURL', { length: 512 })
});
exports.certifications = (0, pg_core_1.pgTable)('certifications', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    candidateId: (0, pg_core_1.integer)('candidateId')
        .notNull()
        .references(() => exports.candidates.id, { onDelete: 'cascade' }),
    certificationName: (0, pg_core_1.varchar)('certificationName', { length: 255 }),
    issuer: (0, pg_core_1.text)('issuer'),
    date: (0, pg_core_1.timestamp)('Date', { withTimezone: false }),
    credentialURL: (0, pg_core_1.varchar)('credentianlURL', { length: 512 })
});
exports.recommendations = (0, pg_core_1.pgTable)('recommendations', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedByDefaultAsIdentity(),
    candidateId: (0, pg_core_1.integer)('candidateId')
        .notNull()
        .references(() => exports.candidates.id, { onDelete: 'cascade' }),
    name: (0, pg_core_1.varchar)('name', { length: 255 }),
    role: (0, pg_core_1.text)('role'),
    recommendation: (0, pg_core_1.text)('recommendation')
});
