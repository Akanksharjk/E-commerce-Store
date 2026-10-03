import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './src/config/db.js'

import  authRoutes  from './src/routes/authRoutes.js'
import  productRoutes  from './src/routes/productRoutes.js'
import  orderRoutes  from './src/routes/orderRouter.js'
const app = express()
connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/orders', orderRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running in development mode on http://localhost:${PORT}`)
})