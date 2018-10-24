require('dotenv').config()

const crypto = require('crypto')

const hashPass = (password) => {
  const hash = crypto.createHmac('sha256', process.env.Secret)
                    .update(password)
                    .digest('hex')
  return hash
}

module.exports = hashPass
