import mongoose from 'mongoose'

const manufacturerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema)
export default Manufacturer
