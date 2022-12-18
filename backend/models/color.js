import mongoose from 'mongoose'

const colorSchema = mongoose.Schema(
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
const Color = mongoose.model('Color', colorSchema)
export default Color
