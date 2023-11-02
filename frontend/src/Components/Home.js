import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import MetaData from './Layouts/Metadata'
import axios from 'axios';

import Loader from './Layout/Loader'
import Header from './Layouts/Header';

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()


    const loadUser = async () => {
        try {
            
            const { data } = await axios.get('/api/v1/me')
    
        } catch (error) {
            console.log( error.response.data.message)
            
        }
    }
    
    return (
        <div>
            <h1>
                Home
            </h1>
        </div>
    )
}

export default Home
