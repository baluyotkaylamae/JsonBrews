// import React, { Fragment, useState, useEffect } from 'react';
// import MetaData from '../Layouts/Metadata';
// import Sidebar from './Sidebar';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { getToken } from '../../utils/helpers';

// const UpdateProduct = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [stock, setStock] = useState(0);
//   const [images, setImages] = useState([]);
//   const [oldImages, setOldImages] = useState([]);
//   const [imagesPreview, setImagesPreview] = useState([]);
//   const [error, setError] = useState('');
//   const [product, setProduct] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [updateError, setUpdateError] = useState('');
//   const [isUpdated, setIsUpdated] = useState(false);

//   let { id } = useParams();
//   let navigate = useNavigate();

//   const errMsg = (message = '') =>
//     toast.error(message, {
//       position: toast.POSITION.BOTTOM_CENTER,
//     });
//   const successMsg = (message = '') =>
//     toast.success(message, {
//       position: toast.POSITION.BOTTOM_CENTER,
//     });

//   const getCategories = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:4001/api/categories`);
//       setCategories(data.categories);
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     }
//   };

//   const getProductDetails = async (id) => {
//     try {
//       const { data } = await axios.get(`http://localhost:4001/api/product/${id}`);
//       setProduct(data.product);
//       setLoading(false);
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//   };

//   const updateProduct = async (id, productData) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${getToken()}`,
//         },
//       };
//       const { data } = await axios.put(`http://localhost:4001/api/admin/product/${id}`, productData, config);
//       setIsUpdated(data.success);
//     } catch (error) {
//       setUpdateError(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     getCategories();
//     getProductDetails(id);
//   }, [id]);

//   useEffect(() => {
//     if (product && product._id !== id) {
//       getProductDetails(id);
//     } else {
//       setName(product.name);
//       setPrice(product.price);
//       setDescription(product.description);
//       setCategories(product.categories);
//       setStock(product.stock);
//       setOldImages(product.images);
//     }
//     if (error) {
//       errMsg(error);
//     }
//     if (updateError) {
//       errMsg(updateError);
//     }
//     if (isUpdated) {
//       navigate('/admin/products');
//       successMsg('Product updated successfully');
//     }
//   }, [error, isUpdated, updateError, product, id]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.set('name', name);
//     formData.set('price', price);
//     formData.set('description', description);
//     formData.set('category', categories);
//     formData.set('stock', stock);
//     images.forEach((image) => {
//       formData.append('images', image);
//     });
//     updateProduct(product._id, formData);
//   };

//   const onChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImagesPreview([]);
//     setImages([]);
//     setOldImages([]);
//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setImagesPreview((oldArray) => [...oldArray, reader.result]);
//           setImages((oldArray) => [...oldArray, reader.result]);
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <Fragment>
//       <MetaData title={'Update Product'} />
//       <div className="row">
//         <div className="col-12 col-md-2">
//           <Sidebar />
//         </div>
//         <div className="col-12 col-md-10">
//           <Fragment>
//             <div className="wrapper my-5">
//               <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
//                 <h1 className="mb-4">Update Product</h1>
//                 <div className="form-group">
//                   <label htmlFor="name_field">Name</label>
//                   <input
//                     type="text"
//                     id="name_field"
//                     className="form-control"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="price_field">Price</label>
//                   <input
//                     type="text"
//                     id="price_field"
//                     className="form-control"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="description_field">Description</label>
//                   <textarea
//                     className="form-control"
//                     id="description_field"
//                     rows="8"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                   ></textarea>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="category">Category</label>
//                   <select
//                     className="form-control"
//                     id="category"
//                     value={categories}
//                     onChange={(e) => setCategories(e.target.value)}
//                   >
//                     {categories.map((category) => (
//                       <option key={category._id} value={category._id}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="stock_field">Stock</label>
//                   <input
//                     type="number"
//                     id="stock_field"
//                     className="form-control"
//                     value={stock}
//                     onChange={(e) => setStock(e.target.value)}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Images</label>
//                   <div className="custom-file">
//                     <input
//                       type="file"
//                       name="images"
//                       className="custom-file-input"
//                       id="customFile"
//                       onChange={onChange}
//                       multiple
//                     />
//                     <label className="custom-file-label" htmlFor="customFile">
//                       Choose Images
//                     </label>
//                   </div>
//                   {oldImages &&
//                     oldImages.map((img) => (
//                       <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
//                     ))}
//                   {imagesPreview.map((img) => (
//                     <img key={img} src={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
//                   ))}
//                 </div>
//                 <button
//                   id="login_button"
//                   type="submit"
//                   className="btn btn-block py-3"
//                   disabled={loading ? true : false}
//                 >
//                   UPDATE
//                 </button>
//               </form>
//             </div>
//           </Fragment>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default UpdateProduct;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useParams, useNavigate } from 'react-router-dom';
import './CRUD.css';

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

        if (fetchedProduct.images && fetchedProduct.images.length > 0) {
          const imagePreviews = fetchedProduct.images.map((image) =>
            URL.createObjectURL(image)
          );

          setImagesPreview(imagePreviews.map((img, index) => `${img}?${index}`));

        } else {
          setImagesPreview([]);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch product:', error);
        console.log(imagesPreview);

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
        <div className="col-md-9 text-crud" style={{ paddingBottom: '50px' }}>
          <h2 className='title-crud'>Update Product</h2>
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
              {imagesPreview.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  alt="Images Preview"
                  className="mt-3 mr-2"
                  width="55"
                  height="52"
                />
              ))}
            </div>
            <button type="submit" className="btn btn-crud">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
