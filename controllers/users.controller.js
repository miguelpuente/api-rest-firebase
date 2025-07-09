import * as UserService from '../services/users.service.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.json(users.map(u => ({ id: u.id, username: u.username })));
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await UserService.getById(req.params.id);
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }
    res.json({ id: user.id, username: user.username });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const newUser = await UserService.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const result = await UserService.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const result = await UserService.remove(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
