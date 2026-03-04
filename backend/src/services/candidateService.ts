import {
  createCandidate,
  deleteCandidate,
  findAllCandidates,
  findCandidateById,
  updateCandidate
} from '../models/candidateModel';
import {
  createCandidateSchema,
  updateCandidateSchema,
  type CandidateCreateInput,
  type CandidateUpdateInput
} from '../schemas/candidateSchema';

export async function getCandidatesService() {
  return findAllCandidates();
}

export async function getCandidateByIdService(id: number) {
  const candidate = await findCandidateById(id);
  if (!candidate) {
    const error = new Error('Candidate not found');
    (error as any).status = 404;
    throw error;
  }
  return candidate;
}

export async function createCandidateService(payload: unknown) {
  const data: CandidateCreateInput = createCandidateSchema.parse(payload);
  return createCandidate(data);
}

export async function updateCandidateService(id: number, payload: unknown) {
  const data: CandidateUpdateInput = updateCandidateSchema.parse(payload);
  const updated = await updateCandidate(id, data);
  if (!updated) {
    const error = new Error('Candidate not found');
    (error as any).status = 404;
    throw error;
  }
  return updated;
}

export async function deleteCandidateService(id: number) {
  const deleted = await deleteCandidate(id);
  if (!deleted) {
    const error = new Error('Candidate not found');
    (error as any).status = 404;
    throw error;
  }
  return deleted;
}

