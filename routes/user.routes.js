import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';

import { getUsers, getUser } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id',authMiddleware, getUser);

userRouter.post('/', (req, res) => res.send({ title: 'CREATE new user' }));

userRouter.put('/', (req, res) => res.send({ title: 'UPDATE user' }));

userRouter.delete('/', (req, res) => res.send({ title: 'DELETE user' }));

export default userRouter;