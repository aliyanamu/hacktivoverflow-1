const Answer = require('../models/answers'),
     Question = require('../models/questions')

module.exports = {
  addAns: (req, res) => {
    console.log('masuk controllers/answers -> add') 
    Answer.create({
      answer: req.body.answer,
      owner: req.user.id,
      question: req.params.id
    })
    .then(response => {
        Question.findByIdAndUpdate({
          _id: req.params.id
        }, {
            $push: { answer: response.id }
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
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
    })
  },

  editAns: (req, res) => {
    console.log('masuk controllers/answers -> edit')
    let user = req.user
    Answer.findOne({
      _id: req.params.id
    })
      .then(answer => {
        if ((answer.owner).toString() === (user.id).toString()) {
          console.log(req.body)
          Answer.findByIdAndUpdate({
            _id: req.params.id
          }, {
              answer: req.body.answer
            })
            .then(question => {
              console.log(question)
              res.status(201).json({
                question
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

  upvoteAns: (req, res) => {
    console.log('masuk controllers/answers -> upvote')
    let voterId = req.user.id
    Answer.findOne({
      _id: req.params.id
    })
      .then(data => {
        if ((data.owner).toString() !== (voterId).toString()) {
          Answer.findOne({
            _id: req.params.id,
            votersUpId: {
              $in: voterId
            }
          })
            .then(vote => {
              if (vote) {
                res.status(500).json({
                  message: 'you already voted this answer'
                })
              } else {
                Answer.findByIdAndUpdate({
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
        } else {
          res.status(500).json({
            message: `you can't upvote on your answer`
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  downvoteAns: (req, res) => {
    console.log('masuk controllers/answers -> downvote')
    let voterId = req.user.id
    Answer.findOne({
      _id: req.params.id
    })
      .then(data => {
        if ((data.owner).toString() !== (voterId).toString()) {
          Answer.findOne({
            _id: req.params.id,
            votersDownId: {
              $in: voterId
            }
          })
            .then(vote => {
              if (vote) {
                res.status(500).json({
                  message: 'you already voted this answer'
                })
              } else {
                Answer.findByIdAndUpdate({
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
        } else {
          res.status(500).json({
            message: `you can't downvote on your answer`
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