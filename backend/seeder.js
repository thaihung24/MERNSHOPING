import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import manufacturers from './data/manufacturer.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModal.js'
import Manufacturer from './models/manufacturer.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Manufacturer.deleteMany()
    const createUser = await User.insertMany(users)
    const adminUser = createUser[0]._id
    const sampleManufacturer = manufacturers.map((manufacturer) => {
      return { ...manufacturer, user: adminUser }
    })
    const createManufacturer = await Manufacturer.insertMany(sampleManufacturer)
    const manufacturerId = createManufacturer[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser, manufacturer: manufacturerId }
    })
    console.log(sampleProducts, sampleManufacturer)
    await Product.insertMany(sampleProducts)

    console.log('Data Imported successfully'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log('Data destroy successfully'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
