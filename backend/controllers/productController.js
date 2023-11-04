const Product = require('../models/product');
const mongoose = require('mongoose');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary')

exports.newProduct = async (req, res, next) => {

	let imagesLinks = [];
	let images = []
	
	if (req.files.length > 0) {
		req.files.forEach(image => {
			images.push(image.path)
		})
	}

	if (req.file) {
		images.push(req.file.path);
	}

	if (req.body.images) {
		if (typeof req.body.images === 'string') {
			images.push(req.body.images)
		} else {
			images = req.body.images
		}
	}

	for (let i = 0; i < images.length; i++) {
		let imageDataUri = images[i]
		try {
			const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
				folder: 'products-jbrew',
				width: 150,
				crop: "scale",
			});

			imagesLinks.push({
				public_id: result.public_id,
				url: result.secure_url
			})

		} catch (error) {
			console.log(error)
		}

	}

	req.body.images = imagesLinks
	//req.body.user = req.user.id;

	const product = await Product.create(req.body);
	if (!product)
		return res.status(400).json({
			success: false,
			message: 'Product not created'
		})


	res.status(201).json({
		success: true,
		product
	})
}

exports.updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedProduct = req.body;

		const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		return res.json(product);
	} catch (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		return res.json({ message: 'Product deleted successfully' });
	} catch (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
};

exports.getProducts = async (req, res, next) => {
	try {
	  const products = await Product.find();
	  res.status(200).json({
		success: true,
		products: products,
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ success: false, message: 'Failed to get products' });
	}
  };
  
  

exports.getSingleProduct = async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(404).json({
			success: false,
			message: 'Product not found'
		})
	}
	res.status(200).json({
		success: true,
		product
	})
}

exports.getProductById = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  const product = await Product.findById(id);
  
	  if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	  }
  
	  return res.json(product);
	} catch (error) {
	  return res.status(500).json({ error: 'Internal server error' });
	}
  };
  

exports.getAdminProduct = async (req, res, next) => {

	const products = await Product.find();

	res.status(200).json({
		success: true,
		products
	})

}






