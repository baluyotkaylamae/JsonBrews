import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import MetaData from '../Layouts/Metadata'
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
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(true);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [error, setError] = useState('');
    // const [validationErrors, setValidationErrors] = useState({});

    let navigate = useNavigate();

    const { id } = useParams();
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getToken()}`
        }
    }
    const onChange = e => {
        const files = Array.from(e.target.files)
        setImagesPreview([]);
        setImages([])
        setOldImages([])
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
            setCategory(data.product.category);
            setOldImages(data.product.images);
            setLoading(false);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
                console.error('Status Code:', error.response.status);
                console.error('Response Data:', error.response.data);
                console.error('Headers:', error.response.headers);
            } else if (error.request) {

                setError('No response received from the server');
                console.error('Request:', error.request);
            } else {

                setError('Error setting up the request');
                console.error('Error Message:', error.message);
            }
        }
    };

    const updateProduct = async (id, productData) => {
        for (const pair of productData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        try {
            const { data } = await axios.put(`http://localhost:4001/api/admin/update/product/${id}`, productData, config)
            setIsUpdated(data.success)
            setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
        }
    }

    useEffect(() => {
        // console.log(user && user._id !== userId);
        axios
            .get(`http://localhost:4001/api/categories`, config)
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
            setDescription(description);
            setPrice(price);
            setStock(stock);
            setCategories(categories);
            setCategory(category);
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
    }, [error, isUpdated, id])

    const submitHandler = (e) => {

        // const errors = {};
        // let isValid = true;

        // if (!product.name) {
        //   isValid = false;
        //   errors.name = 'Please enter a name.';
        // }

        // if (!product.description) {
        //   isValid = false;
        //   errors.description = 'Please enter a description.';
        // }

        // if (!product.price || isNaN(product.price) || product.price < 0) {
        //   isValid = false;
        //   errors.price = 'Please enter a valid price.';
        // }

        // if (!product.stock || isNaN(product.stock) || product.stock < 0) {
        //   isValid = false;
        //   errors.stock = 'Please enter a valid stock quantity.';
        // }

        // if (!product.category) {
        //   isValid = false;
        //   errors.category = 'Please select a valid category.';
        // }

        // if (!images || images.length === 0) {
        //   isValid = false;
        //   errors.images = 'Please select at least one image.';
        // }

        // if (!isValid) {

        //   toast.error('Please fill out all fields');
        //   return;
        // }

        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);

        if (e.target.images.value) {
            images.forEach(image => {
                formData.append('images', image)
            })
        }
        updateProduct(product._id, formData)
        console.log(formData)
    }
    console.log(images)
    console.log(categories)

    return (

        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9 text-crud" style={{ paddingBottom: '50px' }}>
                    <h2 className='title-crud'>Update Product</h2>
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description_field">Description</label>
                            <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="price_field">Price</label>
                            <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="stock_field">Stock</label>
                            <input
                                type="number"
                                id="stock_field"
                                className="form-control"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category_field">Category</label>
                            <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                {categories && categories.map(category => (
                                    <option key={category.name} value={category._id} selected={category.name === category} >{category.name}</option>
                                ))}
                            </select>
                        </div>


                        <div className="form-group px-4">
                            <label htmlFor="avatar_upload" className='w-100' style={{ textAlign: "left" }}>Image</label>
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
                        <button type="submit"
                            className="btn btn-crud"
                            style={{ marginTop: '20px' }}>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct