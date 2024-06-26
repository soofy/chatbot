import mongoose, { Schema } from 'mongoose'
 
const reply = new Schema({
  questionId: String,
  question:  { type: String, index: true },
  answer : String,
  timeStamp : Date,
  user : String
}) 

 
export default mongoose.model ('Reply', reply);