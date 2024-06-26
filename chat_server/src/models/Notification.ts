import mongoose, { Schema } from 'mongoose'
//import mongooseFuzzySearching from 'mongoose-fuzzy-searching'

const notification = new Schema({
  question:  { type: String, index: true },
  answer : String,
  timeStamp : Date,
  user : String,
  rawMessage : String
}) 

 
//notification.plugin(mongooseFuzzySearching, { fields: ['message'] })

export default mongoose.model('Notification', notification)