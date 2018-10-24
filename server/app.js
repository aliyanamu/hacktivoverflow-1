require('dotenv').config()
const createError = require('http-errors'),
     express = require('express'),
     path = require('path'),
     cors = require('cors'),
     app = express(),
     cron = require("node-cron"),
     fs = require("fs"),
     nodemailer = require("nodemailer")

let User = require('./models/users')
let Question = require('./models/questions')
let Answer = require('./models/answers')

const indexRouter = require('./routes/index'),
      usersRouter = require('./routes/users'),
      questionsRouter = require('./routes/questions'),
      answersRouter = require('./routes/answers')

const mongoose   = require('mongoose'),
    urltest = `mongodb://localhost:27017/hackover`,
    url = `mongodb://illion01:illion01@ds213183.mlab.com:13183/hackover`

if (process.env.NODE_ENV === 'test') {
  console.log('ready to test our server')
    mongoose.connect(urltest,{ useNewUrlParser: true })
} else {
  console.log('ready to deploy our server')
    mongoose.connect(url,{ useNewUrlParser: true })
}

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('We are connected')
})

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors())

app
  .use('/', indexRouter)
  .use('/users', usersRouter)
  .use('/questions', questionsRouter)
  .use('/answers', answersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

// cron trial
User.find()
.then(users => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dum.marrie.anne@gmail.com",
      pass: "MarrieAnne134679"
    }
  })

  console.log("Running Cron Job")
  console.log("\t")
  users.forEach(user => {
    Question.aggregate([{
      $project: {
        day: {
          $month: "$createdAt",
          $year: "$createdAt"
        },
        author: user.id
      }
    }])
      .then(questions => {
        Answer.aggregate([{
          $project: {
            day: {
              $month: "$createdAt"
            },
            owner: user.id
          }
        }])
        .then(answers => {
        // sending emails at periodic intervals
          cron.schedule("0 0 1 * *", function(){
            let mailOptions = {
              from: "dum.marrie.anne@gmail.com",
              to: '${user.email}',
              subject: `Monthly Summary of Your Activity`,
              text: `
              Hi ${user.name}, this email is automatically sent by us!

              We want to inform your monthly activity at RedOverflow.
              Total Questions : ${questions.length}
              Total Answers   : ${answers.length}
              Thank you for your contribution. We would like to get more of your questions and answers for the community in the future.

              xoxo

              RedOverflow
              `
            }
            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                throw error
              } else {
                console.log(`Email successfully sent to ${user.email}!`)
                console.log("---------------------")
              }
            })
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
  })
})
.catch(err => {
  console.log(err)
})

module.exports = app
