import { Router } from 'express';
import {
  getCandidatesController,
  getCandidateByIdController,
  createCandidateController,
  updateCandidateController,
  deleteCandidateController
} from '../controlles/candidateController';

const router = Router();

router.get('/', getCandidatesController);
router.get('/:id', getCandidateByIdController);
router.post('/', createCandidateController);
router.put('/:id', updateCandidateController);
router.delete('/:id', deleteCandidateController);

export default router;

