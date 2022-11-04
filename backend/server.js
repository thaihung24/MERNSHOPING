import express from 'express'
import colors from 'colors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import productRoute from './routes/productRoutes.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.originalUrl)
  next()
})
app.get('/', (req, res) => {
  res.send('Api sending ....')
})
app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
      .yellow.bold
  )
})
