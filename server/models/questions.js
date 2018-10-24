const mongoose = require('mongoose'),
     Schema = mongoose.Schema

const questScheme = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required']
    },
    author: {
      required: [true, 'author is required'],
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    question: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    vote: {
      type: Number,
      default: 0, 
    },
    answer: [{
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }],
    votersUpId: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    votersDownId: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
)

const Question = mongoose.model('Question', questScheme)
module.exports = Question