const mongoose = require('mongoose'),
     Schema = mongoose.Schema

const answerScheme = new Schema(
  {
    owner: {
      required: [true, 'owner is required'],
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    answer: {
      type: String,
      required: true
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
    votersUpId: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    votersDownId: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    vote: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const Answer = mongoose.model('Answer', answerScheme)
module.exports = Answer