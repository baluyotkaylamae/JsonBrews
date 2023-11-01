const mongoose = require('mongoose');

// Define a schema for the "Category" model
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Make sure the name is required
  },
  description: {
    type: String,
    required: true, // Make sure the description is required
  },
});

// Create the "Category" model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
