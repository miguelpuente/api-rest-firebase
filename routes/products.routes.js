import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { productSchema } from '../validators/product.validator.js';

const router = Router();

router.get('/', authMiddleware, getAllProducts);
router.get('/:id', authMiddleware, getProductById);
router.post('/create', authMiddleware, validateBody(productSchema), createProduct);
router.put('/:id', authMiddleware, validateBody(productSchema), updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
