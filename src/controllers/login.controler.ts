// login.controller.ts

import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: '"username" and "password" are required' });
    }

    const serviceResponse = await loginService.loginUser({ username, password });

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default {
  login,
};
