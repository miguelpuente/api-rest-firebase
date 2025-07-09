import * as UserModel from '../models/users.model.js';

export const getAll = () => UserModel.getAll();

export const getById = (id) => UserModel.getById(id);

export const create = (data) => UserModel.create(data);

export const update = (id, data) => UserModel.update(id, data);

export const remove = (id) => UserModel.remove(id);

export const getByUsername = (username) => UserModel.getByUsername(username);
