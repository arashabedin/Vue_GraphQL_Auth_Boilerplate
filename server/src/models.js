const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

function buildModel(name, schema) {
  return mongoose.model(name, new Schema(schema, {timestamps: true}))
}

module.exports.User = buildModel('User', {
  name: {
    type: String,
    default: ''
  },
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  }
})