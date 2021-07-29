const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  author: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.ObjectId,
    required: true,
    index: true
  },
  rating: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    index: true
  }, 
  notes: {
    type: String,
    required: false
  },
  priority: {
    type: Number,
    required: false,
    index: true
  }
}, { timestamps: true });

module.exports = Book = mongoose.model('Book', BookSchema);
