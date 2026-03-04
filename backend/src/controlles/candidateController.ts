import { Request, Response, NextFunction } from 'express';
import {
  getCandidatesService,
  getCandidateByIdService,
  createCandidateService,
  updateCandidateService,
  deleteCandidateService
} from '../services/candidateService';

export async function getCandidatesController(req: Request, res: Response, next: NextFunction) {
  try {
    const candidates = await getCandidatesService();
    res.json(candidates);
  } catch (err) {
    next(err);
  }
}

export async function getCandidateByIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const candidate = await getCandidateByIdService(id);
    res.json(candidate);
  } catch (err) {
    next(err);
  }
}

export async function createCandidateController(req: Request, res: Response, next: NextFunction) {
  try {
    const created = await createCandidateService(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateCandidateController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const updated = await updateCandidateService(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteCandidateController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteCandidateService(id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
}

