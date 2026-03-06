import {
  createCandidateWithRelations,
  deleteCandidateWithRelations,
  findAllCandidatesWithRelations,
  findCandidateWithRelationsById,
  updateCandidateWithRelations
} from '../models/candidateModel';
import {
  createCandidateSchema,
  updateCandidateSchema,
  type CandidateCreateInput,
  type CandidateUpdateInput
} from '../schemas/candidateSchema';

export async function getCandidatesService() {
  return findAllCandidatesWithRelations();
}

export async function getCandidateByIdService(id: number) {
  const candidate = await findCandidateWithRelationsById(id);
  if (!candidate) {
    const error = new Error('Candidate not found');
    (error as any).status = 404;
    throw error;
  }
  return candidate;
}

export async function createCandidateService(payload: unknown) {
  const data: CandidateCreateInput = createCandidateSchema.parse(payload);
  return createCandidateWithRelations(data);
}

export async function updateCandidateService(id: number, payload: unknown) {
  const data: CandidateUpdateInput = updateCandidateSchema.parse(payload);
  const updated = await updateCandidateWithRelations(id, data);
  if (!updated) {
    const error = new Error('Candidate not found');
    (error as any).status = 404;
    throw error;
  }
  return updated;
}

export async function deleteCandidateService(id: number) {
  const deleted = await deleteCandidateWithRelations(id);
  if (!deleted) {
    const error = new Error('Candidate not found');
    (error as any).status = 404;
    throw error;
  }
  return deleted;
}

