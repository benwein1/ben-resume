import { db } from './db';
import {
  candidates,
  experiences,
  education as educationTable,
  skills,
  projects,
  certifications,
  recommendations
} from './schema';
import { eq } from 'drizzle-orm';
import type { CandidateCreateInput, CandidateUpdateInput } from '../schemas/candidateSchema';

export async function findAllCandidates() {
  return db.select().from(candidates);
}

export async function findAllCandidatesWithRelations() {
  const [cands, exps, edus, sks, projs, certs, recs] = await Promise.all([
    db.select().from(candidates),
    db.select().from(experiences),
    db.select().from(educationTable),
    db.select().from(skills),
    db.select().from(projects),
    db.select().from(certifications),
    db.select().from(recommendations)
  ]);

  const byCandidateId = <T extends { candidateId: number }>(rows: T[]) => {
    const map = new Map<number, T[]>();
    for (const row of rows) {
      const arr = map.get(row.candidateId);
      if (arr) arr.push(row);
      else map.set(row.candidateId, [row]);
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

export async function findCandidateById(id: number) {
  const [candidate] = await db
    .select()
    .from(candidates)
    .where(eq(candidates.id, id));

  return candidate ?? null;
}

export async function createCandidate(data: CandidateCreateInput) {
  const { experiences: exps, education, skills, projects, certifications, recommendations, ...candidateData } =
    data as any;
  const insertData: any = { ...candidateData };

  const [created] = await db
    .insert(candidates)
    .values(insertData)
    .returning();

  return created;
}

export async function updateCandidate(id: number, data: CandidateUpdateInput) {
  const { experiences: exps, education, skills, projects, certifications, recommendations, ...candidateData } =
    data as any;

  const [updated] = await db
    .update(candidates)
    .set(candidateData)
    .where(eq(candidates.id, id))
    .returning();

  return updated ?? null;
}

export async function deleteCandidate(id: number) {
  const [deleted] = await db
    .delete(candidates)
    .where(eq(candidates.id, id))
    .returning();

  return deleted ?? null;
}

export async function findCandidateWithRelationsById(id: number) {
  const candidate = await findCandidateById(id);
  if (!candidate) return null;

  const [exps, edus, sks, projs, certs, recs] = await Promise.all([
    db.select().from(experiences).where(eq(experiences.candidateId, id)),
    db.select().from(educationTable).where(eq(educationTable.candidateId, id)),
    db.select().from(skills).where(eq(skills.candidateId, id)),
    db.select().from(projects).where(eq(projects.candidateId, id)),
    db.select().from(certifications).where(eq(certifications.candidateId, id)),
    db.select().from(recommendations).where(eq(recommendations.candidateId, id))
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

export async function createCandidateWithRelations(data: CandidateCreateInput) {
  return db.transaction(async (tx) => {
    const {
      experiences: exps,
      education: educationInput,
      skills: skillsInput,
      projects: projectsInput,
      certifications: certificationsInput,
      recommendations: recommendationsInput,
      ...candidateData
    } = data as any;

    const [created] = await tx.insert(candidates).values(candidateData).returning();
    const candidateId = created.id;

    if (Array.isArray(exps) && exps.length) {
      await tx.insert(experiences).values(exps.map((e: any) => ({ ...e, candidateId })));
    }
    if (Array.isArray(educationInput) && educationInput.length) {
      await tx.insert(educationTable).values(educationInput.map((e: any) => ({ ...e, candidateId })));
    }
    if (Array.isArray(skillsInput) && skillsInput.length) {
      await tx.insert(skills).values(skillsInput.map((s: any) => ({ ...s, candidateId })));
    }
    if (Array.isArray(projectsInput) && projectsInput.length) {
      await tx.insert(projects).values(projectsInput.map((p: any) => ({ ...p, candidateId })));
    }
    if (Array.isArray(certificationsInput) && certificationsInput.length) {
      await tx
        .insert(certifications)
        .values(certificationsInput.map((c: any) => ({ ...c, candidateId })));
    }
    if (Array.isArray(recommendationsInput) && recommendationsInput.length) {
      await tx
        .insert(recommendations)
        .values(recommendationsInput.map((r: any) => ({ ...r, candidateId })));
    }

    const [createdExps, createdEdus, createdSkills, createdProjects, createdCerts, createdRecs] = await Promise.all([
      tx.select().from(experiences).where(eq(experiences.candidateId, candidateId)),
      tx.select().from(educationTable).where(eq(educationTable.candidateId, candidateId)),
      tx.select().from(skills).where(eq(skills.candidateId, candidateId)),
      tx.select().from(projects).where(eq(projects.candidateId, candidateId)),
      tx.select().from(certifications).where(eq(certifications.candidateId, candidateId)),
      tx.select().from(recommendations).where(eq(recommendations.candidateId, candidateId))
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

export async function updateCandidateWithRelations(id: number, data: CandidateUpdateInput) {
  return db.transaction(async (tx) => {
    const {
      experiences: exps,
      education: educationInput,
      skills: skillsInput,
      projects: projectsInput,
      certifications: certificationsInput,
      recommendations: recommendationsInput,
      ...candidateData
    } = data as any;

    const [updatedCandidate] = await tx
      .update(candidates)
      .set(candidateData)
      .where(eq(candidates.id, id))
      .returning();

    if (!updatedCandidate) return null;

    // "sync" semantics per relation: if field exists on payload, replace rows
    if ('experiences' in (data as any)) {
      await tx.delete(experiences).where(eq(experiences.candidateId, id));
      if (Array.isArray(exps) && exps.length) {
        await tx.insert(experiences).values(exps.map((e: any) => ({ ...e, candidateId: id })));
      }
    }
    if ('education' in (data as any)) {
      await tx.delete(educationTable).where(eq(educationTable.candidateId, id));
      if (Array.isArray(educationInput) && educationInput.length) {
        await tx
          .insert(educationTable)
          .values(educationInput.map((e: any) => ({ ...e, candidateId: id })));
      }
    }
    if ('skills' in (data as any)) {
      await tx.delete(skills).where(eq(skills.candidateId, id));
      if (Array.isArray(skillsInput) && skillsInput.length) {
        await tx.insert(skills).values(skillsInput.map((s: any) => ({ ...s, candidateId: id })));
      }
    }
    if ('projects' in (data as any)) {
      await tx.delete(projects).where(eq(projects.candidateId, id));
      if (Array.isArray(projectsInput) && projectsInput.length) {
        await tx.insert(projects).values(projectsInput.map((p: any) => ({ ...p, candidateId: id })));
      }
    }
    if ('certifications' in (data as any)) {
      await tx.delete(certifications).where(eq(certifications.candidateId, id));
      if (Array.isArray(certificationsInput) && certificationsInput.length) {
        await tx
          .insert(certifications)
          .values(certificationsInput.map((c: any) => ({ ...c, candidateId: id })));
      }
    }
    if ('recommendations' in (data as any)) {
      await tx.delete(recommendations).where(eq(recommendations.candidateId, id));
      if (Array.isArray(recommendationsInput) && recommendationsInput.length) {
        await tx
          .insert(recommendations)
          .values(recommendationsInput.map((r: any) => ({ ...r, candidateId: id })));
      }
    }

    const [updatedExps, updatedEdus, updatedSkills, updatedProjects, updatedCerts, updatedRecs] = await Promise.all([
      tx.select().from(experiences).where(eq(experiences.candidateId, id)),
      tx.select().from(educationTable).where(eq(educationTable.candidateId, id)),
      tx.select().from(skills).where(eq(skills.candidateId, id)),
      tx.select().from(projects).where(eq(projects.candidateId, id)),
      tx.select().from(certifications).where(eq(certifications.candidateId, id)),
      tx.select().from(recommendations).where(eq(recommendations.candidateId, id))
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

export async function deleteCandidateWithRelations(id: number) {
  // with ON DELETE CASCADE in schema/migrations this becomes simple,
  // but we still return the deleted candidate row.
  return db.transaction(async (tx) => {
    const [deleted] = await tx.delete(candidates).where(eq(candidates.id, id)).returning();
    return deleted ?? null;
  });
}

