const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Product Name."]
  },
  description: {
    type: String,
    required: [true, "Enter enter Description."]
  },
  price: {
    type: Number,
    required: [true, "Please enter a valid product price."]
  },
  stock: {
    type: Number,
    required: [true, "Please enter a valid stock quantity."]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please select a category."]
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
