const Category = require('../models/categories')

module.exports = {
  addCat: (req, res) => {
    console.log('masuk controllers/categories -> add')
    Category.create({
      name: req.body.name
    })
      .then(() => {
        res.status(200).json({
          message: 'create category success'
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  getAllCat: (req, res) => {
    console.log('masuk controllers/categories -> all')
    Category.find()
      .then(categories => {
        res.status(200).json({
          categories
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  getOneCat: (req, res) => {
    console.log('masuk controllers/categories -> get one')
    Category.findOne({
      _id: req.params.id
    })
      .then(category => {
        res.status(200).json({
          category
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  updCat: (req, res) => {
    console.log('masuk controllers/categories -> update')
    Category.findOne({
      _id: req.params.id
    },{
      name: req.body.name
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
  },

  delCat: (req, res) => {
    console.log('masuk controllers/categories -> delete')
    Question.findOne({
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
  }
  
}