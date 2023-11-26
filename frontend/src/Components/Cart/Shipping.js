import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { countries } from 'countries-list'
import MetaData from '../Layouts/Metadata'
import CheckoutSteps from './CheckoutSteps'

const Shipping = ({ shipping, saveShippingInfo }) => {

    const countriesList = Object.values(countries)
    const [address, setAddress] = useState(shipping.address)
    const [city, setCity] = useState(shipping.city)
    const [postalCode, setPostalCode] = useState(shipping.postalCode)
    const [phoneNo, setPhoneNo] = useState(shipping.phoneNo)
    const [country, setCountry] = useState(shipping.country)
    let navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault()

        saveShippingInfo({ address, city, phoneNo, postalCode, country })
        navigate('/confirm')
    }

    return (
        <Fragment>
            <MetaData title={'Shipping Info'} />
            <CheckoutSteps shipping />
            <div  style={{backgroundColor: 'white !important',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10',
            fontWeight: '700',
            padding: '1px',
            height: '120vh'
           }}>
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow-lg"
                        style={{borderRadius: '10px',  
                        width: '500px', 
                        padding: '20px', 
                        border: '3px solid #b38269'}}
                        onSubmit={submitHandler}
                        
                    >
                        <h2 className="mb-4"
                        style={{ fontFamily: 
                        'Hammersmith One, sans-serif',
                        color: '#8e5f47',
                        textTransform: 'uppercase',
                        fontWeight: '450px',
                        textAlign: 'center'
                        }}>Shipping 
                        <br/>Information</h2>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone Number</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div> */}

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="text"  
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                inputMode="numeric"  
                                pattern="[0-9]*" 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >

                                {countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                            style={{ backgroundColor: '#8B4513 !important', color: 'white', fontFamily: 'Open Sans, sans serif' }}
                        >
                            PROCEED
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping