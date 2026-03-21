import { NextFunction, Request, Response } from 'express';
import { deleteUserService, getUserService, postUserService, putUserService } from '../services/userService';

export async function getUserController(_req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUserService();
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function postUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const created = await postUserService(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function putUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await putUserService(req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteUserController(_req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await deleteUserService();
    res.json(deleted);
  } catch (err) {
    next(err);
  }
}
