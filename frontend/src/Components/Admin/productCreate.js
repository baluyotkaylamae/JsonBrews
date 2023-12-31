import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import './CRUD.css';
import { getToken } from '../../utils/helpers';
import { toast, ToastContainer } from 'react-toastify';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    images: null,
  });
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const files = Array.from(e.target.files);
      const imagePreviews = [];
      const selectedImages = [];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            imagePreviews.push(reader.result);
            selectedImages.push(file);
          }
        };

        reader.readAsDataURL(file);
      });

      setImagesPreview(imagePreviews);
      setImages(selectedImages);
    } else if (name === 'cupSize') {
      let cupSizePrice = 0;
      if (value === 'medium') {
        cupSizePrice = 5;
      } else if (value === 'large') {
        cupSizePrice = 15;
      }
      setProduct({
        ...product,
        [name]: value,
        price: product.price + cupSizePrice,
      });
    } else if (name === 'price') {
      setProduct({
        ...product,
        [name]: parseFloat(value), 
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    console.log('Fetching categories...');
    axios
      .get('http://localhost:4001/api/categories', configs)
      .then((response) => {
        console.log('Categories data:', response.data);
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error);
      });
  }, []);

  const configs = {
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${getToken()}`
    }
  }

  const submitForm = async (e) => {
    e.preventDefault();

    const errors = {};
    let isValid = true;

    if (!product.name) {
      isValid = false;
      errors.name = 'Please enter a name.';
    }

    if (!product.description) {
      isValid = false;
      errors.description = 'Please enter a description.';
    }

    if (!product.price || isNaN(product.price) || product.price < 0) {
      isValid = false;
      errors.price = 'Please enter a valid price.';
    }

    if (!product.stock || isNaN(product.stock) || product.stock < 0) {
      isValid = false;
      errors.stock = 'Please enter a valid stock quantity.';
    }

    if (!product.category) {
      isValid = false;
      errors.category = 'Please select a valid category.';
    }

    if (!images || images.length === 0) {
      isValid = false;
      errors.images = 'Please select at least one image.';
    }

    if (!isValid) {
      
      toast.error('Please fill out all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('category', product.category);

    images.forEach((image) => {
      formData.append('images', image);
    });
    // console.log(e.target.images.value);
    console.log(images);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getToken()}`
        }
      };

      await axios.post('http://localhost:4001/api/admin/product/new', formData, config);

      alert('Product created successfully');
      setProduct({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        images: null,
      });
      setImages([]);
      setImagesPreview([]);
      navigate('/product/list');
    } catch (error) {
      alert('Failed to create product');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9 text-crud" style={{paddingBottom:'50px'}}>
          <h2 className='title-crud'>Create Product</h2>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                value={product.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                required
                value={product.price}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                required
                value={product.stock}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-control"
                id="category"
                name="category"
                required
                value={product.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                name="images"
                required
                onChange={handleChange}
                multiple
              />
              {imagesPreview.map((img) => (
                <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
              ))}
            </div>
            <button type="submit" className="btn btn-crud">
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
