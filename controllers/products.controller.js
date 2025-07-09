import * as ProductService from '../services/products.service.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductService.getAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await ProductService.getById(req.params.id);
    if (!product) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await ProductService.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const result = await ProductService.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const result = await ProductService.remove(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
