const mongoose = require('mongoose'),
     Schema = mongoose.Schema

const catScheme = new Schema(
  {
    name: {
      type: String,
      required: [true, 'category is required']
    }
  }
)

const Category = mongoose.model('Category', catScheme)
module.exports = Category