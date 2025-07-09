import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as UserModel from '../models/users.model.js';

export const login = async ({ username, password }) => {
  const user = await UserModel.getByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  return token;
};
