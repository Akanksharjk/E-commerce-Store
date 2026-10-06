import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import { connectDB } from './src/config/db.js'

import authRoutes from './src/routes/authRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import orderRoutes from './src/routes/orderRouter.js'

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'DevStore API is running'
    })
})

const PORT = process.env.PORT || 5000
const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server',
            error.message
        )

        process.exit(1)
    }
}

startServer()