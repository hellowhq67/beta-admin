import mongoose from 'mongoose';

const contactSchema= new mongoose.Schema({
  email:String,
  listingUrl:String,
  heplTopic:String,
  reson:String,
  screenShot:String,
  description:String,

});

const Contact= mongoose.models.Contact|| mongoose.model('Contact', contactSchema);

export default Contact;