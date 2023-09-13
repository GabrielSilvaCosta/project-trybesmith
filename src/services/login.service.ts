import bcrypt from 'bcryptjs';
import jwtUtil from '../utils/jwt';
import { ServiceResponse } from '../types/ServiceResponse';
import UserModel from '../database/models/user.model';
import { Token } from '../types/Token';
import { Login } from '../types/Login';

async function loginUser(login: Login): Promise<ServiceResponse<Token>> {
  const { username, password } = login;

  if (!username || !password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }

  const found = await UserModel.findOne({ where: { username } });

  if (!found || !bcrypt.compareSync(password, found.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { id } = found.dataValues;
  const idNumber = parseInt(id, 10);

  const token = jwtUtil.createToken({ id: idNumber, username });

  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  loginUser,
};
