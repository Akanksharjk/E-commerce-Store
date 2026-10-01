import express from 'express'
import { connectDB } from './src/config/db.js'
const app = express()
connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running in development mode on http://localhost:${PORT}`)
})