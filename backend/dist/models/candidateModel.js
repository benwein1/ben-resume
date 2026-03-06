"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllCandidates = findAllCandidates;
exports.findAllCandidatesWithRelations = findAllCandidatesWithRelations;
exports.findCandidateById = findCandidateById;
exports.createCandidate = createCandidate;
exports.updateCandidate = updateCandidate;
exports.deleteCandidate = deleteCandidate;
exports.findCandidateWithRelationsById = findCandidateWithRelationsById;
exports.createCandidateWithRelations = createCandidateWithRelations;
exports.updateCandidateWithRelations = updateCandidateWithRelations;
exports.deleteCandidateWithRelations = deleteCandidateWithRelations;
const db_1 = require("./db");
const schema_1 = require("./schema");
const drizzle_orm_1 = require("drizzle-orm");
async function findAllCandidates() {
    return db_1.db.select().from(schema_1.candidates);
}
async function findAllCandidatesWithRelations() {
    const [cands, exps, edus, sks, projs, certs, recs] = await Promise.all([
        db_1.db.select().from(schema_1.candidates),
        db_1.db.select().from(schema_1.experiences),
        db_1.db.select().from(schema_1.education),
        db_1.db.select().from(schema_1.skills),
        db_1.db.select().from(schema_1.projects),
        db_1.db.select().from(schema_1.certifications),
        db_1.db.select().from(schema_1.recommendations)
    ]);
    const byCandidateId = (rows) => {
        const map = new Map();
        for (const row of rows) {
            const arr = map.get(row.candidateId);
            if (arr)
                arr.push(row);
            else
                map.set(row.candidateId, [row]);
        }
        return map;
    };
    const expMap = byCandidateId(exps);
    const eduMap = byCandidateId(edus);
    const skillMap = byCandidateId(sks);
    const projMap = byCandidateId(projs);
    const certMap = byCandidateId(certs);
    const recMap = byCandidateId(recs);
    return cands.map((c) => ({
        ...c,
        experiences: expMap.get(c.id) ?? [],
        education: eduMap.get(c.id) ?? [],
        skills: skillMap.get(c.id) ?? [],
        projects: projMap.get(c.id) ?? [],
        certifications: certMap.get(c.id) ?? [],
        recommendations: recMap.get(c.id) ?? []
    }));
}
async function findCandidateById(id) {
    const [candidate] = await db_1.db
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_1.eq)(schema_1.candidates.id, id));
    return candidate ?? null;
}
async function createCandidate(data) {
    const { experiences: exps, education, skills, projects, certifications, recommendations, ...candidateData } = data;
    const insertData = { ...candidateData };
    const [created] = await db_1.db
        .insert(schema_1.candidates)
        .values(insertData)
        .returning();
    return created;
}
async function updateCandidate(id, data) {
    const { experiences: exps, education, skills, projects, certifications, recommendations, ...candidateData } = data;
    const [updated] = await db_1.db
        .update(schema_1.candidates)
        .set(candidateData)
        .where((0, drizzle_orm_1.eq)(schema_1.candidates.id, id))
        .returning();
    return updated ?? null;
}
async function deleteCandidate(id) {
    const [deleted] = await db_1.db
        .delete(schema_1.candidates)
        .where((0, drizzle_orm_1.eq)(schema_1.candidates.id, id))
        .returning();
    return deleted ?? null;
}
async function findCandidateWithRelationsById(id) {
    const candidate = await findCandidateById(id);
    if (!candidate)
        return null;
    const [exps, edus, sks, projs, certs, recs] = await Promise.all([
        db_1.db.select().from(schema_1.experiences).where((0, drizzle_orm_1.eq)(schema_1.experiences.candidateId, id)),
        db_1.db.select().from(schema_1.education).where((0, drizzle_orm_1.eq)(schema_1.education.candidateId, id)),
        db_1.db.select().from(schema_1.skills).where((0, drizzle_orm_1.eq)(schema_1.skills.candidateId, id)),
        db_1.db.select().from(schema_1.projects).where((0, drizzle_orm_1.eq)(schema_1.projects.candidateId, id)),
        db_1.db.select().from(schema_1.certifications).where((0, drizzle_orm_1.eq)(schema_1.certifications.candidateId, id)),
        db_1.db.select().from(schema_1.recommendations).where((0, drizzle_orm_1.eq)(schema_1.recommendations.candidateId, id))
    ]);
    return {
        ...candidate,
        experiences: exps,
        education: edus,
        skills: sks,
        projects: projs,
        certifications: certs,
        recommendations: recs
    };
}
async function createCandidateWithRelations(data) {
    return db_1.db.transaction(async (tx) => {
        const { experiences: exps, education: educationInput, skills: skillsInput, projects: projectsInput, certifications: certificationsInput, recommendations: recommendationsInput, ...candidateData } = data;
        const [created] = await tx.insert(schema_1.candidates).values(candidateData).returning();
        const candidateId = created.id;
        if (Array.isArray(exps) && exps.length) {
            await tx.insert(schema_1.experiences).values(exps.map((e) => ({ ...e, candidateId })));
        }
        if (Array.isArray(educationInput) && educationInput.length) {
            await tx.insert(schema_1.education).values(educationInput.map((e) => ({ ...e, candidateId })));
        }
        if (Array.isArray(skillsInput) && skillsInput.length) {
            await tx.insert(schema_1.skills).values(skillsInput.map((s) => ({ ...s, candidateId })));
        }
        if (Array.isArray(projectsInput) && projectsInput.length) {
            await tx.insert(schema_1.projects).values(projectsInput.map((p) => ({ ...p, candidateId })));
        }
        if (Array.isArray(certificationsInput) && certificationsInput.length) {
            await tx
                .insert(schema_1.certifications)
                .values(certificationsInput.map((c) => ({ ...c, candidateId })));
        }
        if (Array.isArray(recommendationsInput) && recommendationsInput.length) {
            await tx
                .insert(schema_1.recommendations)
                .values(recommendationsInput.map((r) => ({ ...r, candidateId })));
        }
        const [createdExps, createdEdus, createdSkills, createdProjects, createdCerts, createdRecs] = await Promise.all([
            tx.select().from(schema_1.experiences).where((0, drizzle_orm_1.eq)(schema_1.experiences.candidateId, candidateId)),
            tx.select().from(schema_1.education).where((0, drizzle_orm_1.eq)(schema_1.education.candidateId, candidateId)),
            tx.select().from(schema_1.skills).where((0, drizzle_orm_1.eq)(schema_1.skills.candidateId, candidateId)),
            tx.select().from(schema_1.projects).where((0, drizzle_orm_1.eq)(schema_1.projects.candidateId, candidateId)),
            tx.select().from(schema_1.certifications).where((0, drizzle_orm_1.eq)(schema_1.certifications.candidateId, candidateId)),
            tx.select().from(schema_1.recommendations).where((0, drizzle_orm_1.eq)(schema_1.recommendations.candidateId, candidateId))
        ]);
        return {
            ...created,
            experiences: createdExps,
            education: createdEdus,
            skills: createdSkills,
            projects: createdProjects,
            certifications: createdCerts,
            recommendations: createdRecs
        };
    });
}
async function updateCandidateWithRelations(id, data) {
    return db_1.db.transaction(async (tx) => {
        const { experiences: exps, education: educationInput, skills: skillsInput, projects: projectsInput, certifications: certificationsInput, recommendations: recommendationsInput, ...candidateData } = data;
        const [updatedCandidate] = await tx
            .update(schema_1.candidates)
            .set(candidateData)
            .where((0, drizzle_orm_1.eq)(schema_1.candidates.id, id))
            .returning();
        if (!updatedCandidate)
            return null;
        // "sync" semantics per relation: if field exists on payload, replace rows
        if ('experiences' in data) {
            await tx.delete(schema_1.experiences).where((0, drizzle_orm_1.eq)(schema_1.experiences.candidateId, id));
            if (Array.isArray(exps) && exps.length) {
                await tx.insert(schema_1.experiences).values(exps.map((e) => ({ ...e, candidateId: id })));
            }
        }
        if ('education' in data) {
            await tx.delete(schema_1.education).where((0, drizzle_orm_1.eq)(schema_1.education.candidateId, id));
            if (Array.isArray(educationInput) && educationInput.length) {
                await tx
                    .insert(schema_1.education)
                    .values(educationInput.map((e) => ({ ...e, candidateId: id })));
            }
        }
        if ('skills' in data) {
            await tx.delete(schema_1.skills).where((0, drizzle_orm_1.eq)(schema_1.skills.candidateId, id));
            if (Array.isArray(skillsInput) && skillsInput.length) {
                await tx.insert(schema_1.skills).values(skillsInput.map((s) => ({ ...s, candidateId: id })));
            }
        }
        if ('projects' in data) {
            await tx.delete(schema_1.projects).where((0, drizzle_orm_1.eq)(schema_1.projects.candidateId, id));
            if (Array.isArray(projectsInput) && projectsInput.length) {
                await tx.insert(schema_1.projects).values(projectsInput.map((p) => ({ ...p, candidateId: id })));
            }
        }
        if ('certifications' in data) {
            await tx.delete(schema_1.certifications).where((0, drizzle_orm_1.eq)(schema_1.certifications.candidateId, id));
            if (Array.isArray(certificationsInput) && certificationsInput.length) {
                await tx
                    .insert(schema_1.certifications)
                    .values(certificationsInput.map((c) => ({ ...c, candidateId: id })));
            }
        }
        if ('recommendations' in data) {
            await tx.delete(schema_1.recommendations).where((0, drizzle_orm_1.eq)(schema_1.recommendations.candidateId, id));
            if (Array.isArray(recommendationsInput) && recommendationsInput.length) {
                await tx
                    .insert(schema_1.recommendations)
                    .values(recommendationsInput.map((r) => ({ ...r, candidateId: id })));
            }
        }
        const [updatedExps, updatedEdus, updatedSkills, updatedProjects, updatedCerts, updatedRecs] = await Promise.all([
            tx.select().from(schema_1.experiences).where((0, drizzle_orm_1.eq)(schema_1.experiences.candidateId, id)),
            tx.select().from(schema_1.education).where((0, drizzle_orm_1.eq)(schema_1.education.candidateId, id)),
            tx.select().from(schema_1.skills).where((0, drizzle_orm_1.eq)(schema_1.skills.candidateId, id)),
            tx.select().from(schema_1.projects).where((0, drizzle_orm_1.eq)(schema_1.projects.candidateId, id)),
            tx.select().from(schema_1.certifications).where((0, drizzle_orm_1.eq)(schema_1.certifications.candidateId, id)),
            tx.select().from(schema_1.recommendations).where((0, drizzle_orm_1.eq)(schema_1.recommendations.candidateId, id))
        ]);
        return {
            ...updatedCandidate,
            experiences: updatedExps,
            education: updatedEdus,
            skills: updatedSkills,
            projects: updatedProjects,
            certifications: updatedCerts,
            recommendations: updatedRecs
        };
    });
}
async function deleteCandidateWithRelations(id) {
    // with ON DELETE CASCADE in schema/migrations this becomes simple,
    // but we still return the deleted candidate row.
    return db_1.db.transaction(async (tx) => {
        const [deleted] = await tx.delete(schema_1.candidates).where((0, drizzle_orm_1.eq)(schema_1.candidates.id, id)).returning();
        return deleted ?? null;
    });
}
