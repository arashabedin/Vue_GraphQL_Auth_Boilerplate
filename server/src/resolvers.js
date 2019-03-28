
const { GraphQLScalarType } = require('graphql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const nodeMailer = require('nodemailer')
const { welcomeEmail } = require('./emails')

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      
      /*Create a file ".env" in the same folder and write the following 
      (replacomg your own email and password):

      FROM_EMAIL= youremail@example.com 
      GMAIL_PASSWORD= YOUR_PASSWORD
      */

      user: process.env.FROM_EMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
})

const { User } = require('./models')

const JWT_SECRET = process.env.JWT_SECRET



const resolvers = {
  Mutation: {
    async signup (_, { email, firstname, lastname, password}) {
      const isEmailTaken = await User.findOne({email})
      if (isEmailTaken) {
        throw new Error('This email is already taken')
      }
      const common = {
        email,
        firstname,
        lastname,
        name: `${firstname} ${lastname}`,
        password: await bcrypt.hash(password, 10),
      }
        const user = await User.create(common)
      await user.save()

      //Sending email to user for confirmation
      transporter.sendMail(welcomeEmail(email, user))

      const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET)
      return {token, user}
    },
    async login (_, {email, password}) {
      const user = await User.findOne({email})
      if (!user) {
        throw new Error('No user with that email')
      }
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        throw new Error('Incorrect password')
      }
      const token = jwt.sign({id: user.id, email}, JWT_SECRET)
      return {token, user}
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: (value) => moment(value).toDate(), // value from the client
    serialize: (value) => value.getTime(), // value sent to the client
    parseLiteral: (ast) => ast
  })
}

module.exports = resolvers