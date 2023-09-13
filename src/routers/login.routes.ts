// login.router.ts

import express from 'express';
import { login } from '../controllers/login.controler';

const loginRouter = express.Router();

loginRouter.post('/', login);

export default loginRouter;
