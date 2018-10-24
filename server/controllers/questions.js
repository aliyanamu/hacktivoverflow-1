const Question = require('../models/questions')

module.exports = {
  report: function (req, res) {
    console.log('masuk controllers/questions -> report')
  },

  addQuest: (req, res) => {
    console.log('masuk controllers/questions -> add')
    Question.create({
      title: req.body.title,
      question: req.body.question,
      author: req.user.id
    })
      .then(() => {
        res.status(200).json({
          message: 'create question success'
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  getAllQuest: (req, res) => {
    console.log('masuk controllers/questions -> all')
    Question.find()
      .populate('author')
      .populate({
        path: 'answer', populate: [{ path: 'owner' }]
      })
      .then(questions => {
        res.status(200).json({
          questions
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  getOneQuest: (req, res) => {
    console.log('masuk controllers/questions -> get one')
    Question.findOne({
      _id: req.params.id
    })
      .populate('author')
      .populate({
        path: 'answer', populate: [{ path: 'owner' }]
      })
      .then(question => {
        res.status(200).json({
          question
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  updQuest: (req, res) => {
    console.log('masuk controllers/questions -> update')
    let user = req.user
    Question.findOne({
      _id: req.params.id
    })
      .then(data => {
        if ((data.author).toString() === (user.id).toString()) {
          Question.updateOne({
            _id: req.params.id
          }, {
              title: req.body.title,
              question: req.body.question,
            })
            .then(update => {
              res.status(201).json({
                update
              })
            })
            .catch(err => {
              res.status(500).json({
                message: err.message
              })
            })
        } else {
          res.status(500).json({
            message: 'you have no permission'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  delQuest: (req, res) => {
    console.log('masuk controllers/questions -> delete')
    let user = req.user
    Question.findOne({
      _id: req.params.id
    })
      .then(data => {
        if ((data.author).toString() === (user.id).toString()) {
          Question.deleteOne({
            _id: req.params.id
          })
            .then(remove => {
              res.status(200).json({
                remove
              })
            })
            .catch(err => {
              res.status(500).json({
                message: err.message
              })
            })
        } else {
          res.status(500).json({
            message: 'you have no permission'
          })
        }
      })
  },

  upvoteQuest: (req, res) => {
    console.log('masuk controllers/questions -> upvote')
    let voterId = req.user.id
    Question.findOne({
      _id: req.params.id
    })
      .then(data => {
        if ((data.author).toString() !== (voterId).toString()) {
          Question.findOne({
            _id: req.params.id,
            votersUpId: {
              $in: voterId
            }
          })
            .then(vote => {
              if (vote) {
                res.status(500).json({
                  message: 'you already voted this question'
                })
              } else {
                Question.findByIdAndUpdate({
                  _id: req.params.id
                }, {
                    $addToSet: { votersUpId: voterId },
                    $pull: { votersDownId: voterId },
                    $inc: { vote: 1 }
                  })
                  .then(upvote => {
                    res.status(200).json({
                      message: 'upvote success',
                      upvote
                    })
                  })
                  .catch(err => {
                    console.log('error upvote here', err)
                    res.status(500).json({
                      message: err.message
                    })
                  })
              }
            })
            .catch(err => {
              res.status(500).json({
                message: err.message
              })
            })
        } else {
          res.status(500).json({
            message: `you can't upvote on your question`
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  downvoteQuest: (req, res) => {
    console.log('masuk controllers/questions -> downvote')
    let voterId = req.user.id
    Question.findOne({
      _id: req.params.id
    })
      .then(data => {
        if ((data.author).toString() !== (voterId).toString()) {
          Question.findOne({
            _id: req.params.id,
            votersDownId: {
              $in: voterId
            }
          })
            .then(vote => {
              if (vote) {
                res.status(500).json({
                  message: 'you already voted this question'
                })
              } else {
                Question.findByIdAndUpdate({
                  _id: req.params.id
                }, {
                    $addToSet: { votersDownId: voterId },
                    $pull: { votersUpId: voterId },
                    $inc: { vote: -1 }
                  })
                  .then(downvote => {
                    res.status(200).json({
                      message: 'downvote success',
                      downvote
                    })
                  })
                  .catch(err => {
                    console.log('error downvote here', err)
                    res.status(500).json({
                      message: err.message
                    })
                  })
              }
            })
            .catch(err => {
              res.status(500).json({
                message: err.message
              })
            })
        } else {
          res.status(500).json({
            message: `you can't downvote on your question`
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}