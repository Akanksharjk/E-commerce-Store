import express from 'express'
import { getProduct, getProductById, seedProduct } from '../controllers/productController.js'

const router = express.Router()

router.get('/', getProduct)
router.get('/seed', seedProduct)
router.get('/:id', getProductById)
 
export default router