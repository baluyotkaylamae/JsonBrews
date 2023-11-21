import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from './Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errMsg, successMsg } from '../../utils/helpers';
import { getToken } from '../../utils/helpers';
import axios from 'axios';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    // const [product, setProduct] = useState(true);
    const [product, setProduct] = useState({});

    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const { id } = useParams();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    }
    const onChange = e => {
        const files = Array.from(e.target.files)
        // setImagesPreview([]);
        // setImages([])
        // setOldImages([])
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }
    const getProductDetails = async (id) => {
      try {
          const { data } = await axios.get(`http://localhost:4001/api/products/${id}`, config);
          console.log(data);
          setProduct(data.product);
          setName(data.product.name);
           setDescription(data.product.description);
          setPrice(data.product.price);
          setStock(data.product.stock);
          setCategory(data.product.categories);
          setOldImages(data.product.images);
          setLoading(false);
      } catch (error) {
          if (error.response) {
              
              setError(error.response.data.message);
          } else if (error.request) {
             
              console.error('No response received from the server:', error.request);
          } else {
              
              console.error('Error setting up the request:', error.message);
          }
          setLoading(false);
      }
  };


    const updateProduct = async (id, productData) => {
        try {
            const { data } = await axios.put(`http://localhost:4001/api/product/update/${id}`, productData, config)
            setIsUpdated(data.success)
            setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
        }
    }

    useEffect(() => {
        // console.log(user && user._id !== userId);
        axios
            .get(`http://localhost:4001/api/categories`)
            .then((response) => {
                console.log('Categories data:', response.data);
                setCategories(response.data.categories);
            })
            .catch((error) => {
                console.error('Failed to fetch categories:', error);
            });
        if (product && product._id !== id) {
            getProductDetails(id)
        } else {
            setName(name);
            setPrice(price);
            setDescription(description);
            setCategory(category);
            setStock(stock);
            setOldImages(images)

        }
        if (error) {
            errMsg(error);
            setError('');
        }
        if (isUpdated) {
            successMsg('Product updated successfully')
            navigate('/product/list')

        }
    }, [error, isUpdated, id, product ])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', product.name);
        formData.set('price', product.price);
        formData.set('description', product.description);
        formData.set('stock', product.stock);
        formData.set('category', product.category);


        if (e.target.images.value) {
            images.forEach(image => {
                formData.append('images', image)
            })
        }
        updateProduct(product._id, formData)
    }
    console.log(images)
    console.log(categories)
    return (
        <Fragment>

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update Product</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={product.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={product.price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" onChange={(e) => setCategory(e.target.value)}>
                                        {categories && categories.map(category => (
                                            <option key={category.name} value={category._id} selected = {category.name === category} >{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={product.stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>


                                <div className="form-group px-4">
                                    <label htmlFor="image_upload" className='w-100' style={{ textAlign: "left" }}>Image</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='images'
                                            className='custom-file-input form-control'
                                            id='customFile'
                                            accept='image/*'
                                            onChange={onChange}
                                            multiple
                                        />

                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>

                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                </div>
                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProduct

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from './Sidebar';
// import { useParams, useNavigate } from 'react-router-dom';

// const UpdateProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const config = {
//             headers: {
//                 'Content-Type': 'application/json',
                
//             }
//         }


//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: 0,
//     category: '',
//     images: null,
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]);
//   const [imagesPreview, setImagesPreview] = useState([]);
//   const [oldImages, setOldImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isUpdated, setIsUpdated] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//   //   const { name, value, type } = e.target;

//   //   if (type === 'file') {
//   //     const files = Array.from(e.target.files);
//   //     const imagePreviews = [];
//   //     const selectedImages = [];

//   //     files.forEach((file) => {
//   //       const reader = new FileReader();
//   //       reader.onload = () => {
//   //         if (reader.readyState === 2) {
//   //           imagePreviews.push(reader.result);
//   //           selectedImages.push(file);
//   //         }
//   //       };

//   //       reader.readAsDataURL(file);
//   //     });

//   //     setImagesPreview(imagePreviews);
//   //     setImages(selectedImages);
//   //   } else {
//   //     setProduct({
//   //       ...product,
//   //       [name]: value,
//   //     });
//   //   }
//   // };
//   const files = Array.from(e.target.files)
//           // setImagesPreview([]);
//           // setImages([])
//           // setOldImages([])
//           files.forEach(file => {
//               const reader = new FileReader();
//               reader.onload = () => {
//                   if (reader.readyState === 2) {
//                       setImagesPreview(oldArray => [...oldArray, reader.result])
//                       setImages(oldArray => [...oldArray, reader.result])
//                   }
//               }
//               reader.readAsDataURL(file)
//           })
//       }

//        const updateProduct = async (id, productData) => {
//         try {
//             const { data } = await axios.put(`http://localhost:4001/api/product/update/${id}`, productData, config)
//             setIsUpdated(data.success)
//             setLoading(false)

//         } catch (error) {
//             setError(error.response.data.message)
//         }
//     }

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4001/api/product/${id}`)
//       .then((res) => {
//         const fetchedProduct = res.data;
//         setProduct(fetchedProduct);

//         if (fetchedProduct.images) {
//           const imagePreviews = fetchedProduct.images.map((image) =>
//             URL.createObjectURL(image)
//           );
//           setImagesPreview(imagePreviews);
//         } else {

//           setImagesPreview([]);
//         }
//       })
//       .catch((error) => {
//         console.error('Failed to fetch product:', error);
//       });

//     axios
//       .get('http://localhost:4001/api/categories')
//       .then((response) => {
//         setCategories(response.data.categories);
//       })
//       .catch((error) => {
//         console.error('Failed to fetch categories:', error);
//       });
//   }, [id]);

//   const submitForm = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', product.name);
//     formData.append('description', product.description);
//     formData.append('price', product.price);
//     formData.append('category', product.category);

//     // if (e.target.images.value) {
//     //               images.forEach(image => {
//     //                   formData.append('images', image)
//     //               })
//     //           }
//     //           updateProduct(product._id, formData)
//     //       }
//     //       console.log(images)
//     //       console.log(categories)

//     images.forEach((image) => {
//       formData.append('images', image);
//     });

//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       };
//       await axios.put(`http://localhost:4001/api/product/${id}`, formData, config);

//       alert('Product updated successfully');
//       navigate('/product/list');
//     } catch (error) {
//       alert('Failed to update product');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-3">
//           <Sidebar />
//         </div>
//         <div className="col-md-9">
//           <h2>Update Product</h2>
//           <form onSubmit={submitForm}>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 name="name"
//                 required
//                 value={product.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="description" className="form-label">
//                 Description
//               </label>
//               <textarea
//                 className="form-control"
//                 id="description"
//                 name="description"
//                 value={product.description}
//                 onChange={handleChange}
//               ></textarea>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="price" className="form-label">
//                 Price
//               </label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="price"
//                 name="price"
//                 required
//                 value={product.price}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="category" className="form-label">
//                 Category
//               </label>
//               <select
//                 className="form-control"
//                 id="category"
//                 name="category"
//                 required
//                 value={product.category}
//                 onChange={handleChange}
//               >
//                 {categories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* <div className="mb-3">
//               <label htmlFor="image" className="form-label">
//                 Image
//               </label>
//               <input
//                 type="file"
//                 className="form-control"
//                 id="image"
//                 accept="image/*"
//                 name="images"
//                 required
//                 onChange={handleChange}
//                 multiple
//               />
//               {imagesPreview.map((img) => (
//                 <img
//                   src={img}
//                   key={img}
//                   alt="Images Preview"
//                   className="mt-3 mr-2"
//                   width="55"
//                   height="52"
//                 />
//               ))}
//             </div> */}

//             <div className="form-group px-4">
//               <label htmlFor="image_upload" className='w-100' style={{ textAlign: "left" }}>Image</label>
//               <div className='custom-file'>
//                 <input
//                   type='file'
//                   name='images'
//                   className='custom-file-input form-control'
//                   id='customFile'
//                   accept='image/*'
//                   onChange={handleChange}
//                   multiple
//                 />

//                 <label className='custom-file-label' htmlFor='customFile'>
//                   Choose Images
//                 </label>
//               </div>

//               {oldImages && oldImages.map(img => (
//                 <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
//               ))}
//               {imagesPreview.map(img => (
//                 <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
//               ))}
//             </div>
//             <button type="submit" className="btn btn-primary">
//               Update Product
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProduct;
