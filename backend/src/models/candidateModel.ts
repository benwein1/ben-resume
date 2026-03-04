import { db } from './db';
import { candidates } from './schema';
import { eq } from 'drizzle-orm';
import type { CandidateCreateInput, CandidateUpdateInput } from '../schemas/candidateSchema';

export async function findAllCandidates() {
  return db.select().from(candidates);
}

export async function findCandidateById(id: number) {
  const [candidate] = await db
    .select()
    .from(candidates)
    .where(eq(candidates.id, id));

  return candidate ?? null;
}

export async function createCandidate(data: CandidateCreateInput) {
  const insertData: any = { ...data };

  const [created] = await db
    .insert(candidates)
    .values(insertData)
    .returning();

  return created;
}

export async function updateCandidate(id: number, data: CandidateUpdateInput) {
  const [updated] = await db
    .update(candidates)
    .set(data)
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

