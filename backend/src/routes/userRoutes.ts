import { Router } from 'express';
import { deleteUserController, getUserController, postUserController, putUserController } from '../controlles/userController';

const router = Router();

router.get('/', getUserController);
router.post('/', postUserController);
router.put('/', putUserController);
router.delete('/', deleteUserController);

export default router;
