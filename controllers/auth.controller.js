import * as AuthService from '../services/auth.service.js';

export const loginUser = async (req, res, next) => {
  try {
    const token = await AuthService.login(req.body);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};
