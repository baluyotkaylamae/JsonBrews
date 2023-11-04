import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
   

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    images: null,
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4001/api/product/${id}`)
      .then((res) => {
        const fetchedProduct = res.data;
        setProduct(fetchedProduct);
  
        if (fetchedProduct.images) {
          const imagePreviews = fetchedProduct.images.map((image) =>
            URL.createObjectURL(image)
          );
          setImagesPreview(imagePreviews);
        } else {
         
          setImagesPreview([]);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch product:', error);
      });
  
    axios
      .get('http://localhost:4001/api/categories')
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      await axios.put(`http://localhost:4001/api/product/${id}`, formData, config);

      alert('Product updated successfully');
      navigate('/product/list'); 
    } catch (error) {
      alert('Failed to update product');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2>Update Product</h2>
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
                <img
                  src={img}
                  key={img}
                  alt="Images Preview"
                  className="mt-3 mr-2"
                  width="55"
                  height="52"
                />
              ))}
            </div>
            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
