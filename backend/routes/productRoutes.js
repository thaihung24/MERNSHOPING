import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getProductByOptions,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
//@desc Fetch single products
//@route GET /api/products/:id
//@access Public]]

router.route('/options').get(getProductByOptions)

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)
export default router
