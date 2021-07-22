import React, { useState } from 'react'

import './productPage.css'

import productImage from '../Images/products-homepage.jpg'

import { Button, InputGroupAddon, InputGroup, Input, Row, Col, Table } from 'reactstrap'

import axios from 'axios'

import ProductCard from './productCard'
import ProductContext from '../ReactContext/ProductContext'

const ApiRoutes = require('../API/API-info')

const ProductPage = () => {

    const [products, setProducts] = useState()

    const [productDetails, setProductDetails] = useState()

    const [noValueFound, setNoValueFound] = useState(true)

    async function searchProducts(){
        try{
            if(!noValueFound) setNoValueFound(true)
            const queryTag = document.querySelector('.query-input').value
            let response = await axios.get(`${ApiRoutes.productRoute}${queryTag}`)
            setProducts(response.data.products)
        }catch{
            setNoValueFound(false)
            return null
        }
    }


    return (
        <div>
            <Row>

                <Col lg={2} xl={1}></Col>

                <Col sm={12} lg={8} xl={10}>

                    <Row>
                        <Col sm={12}>
                            <div>
                                <img id="products-img" src={productImage} alt="" />
                            </div>
                        </Col>
                    </Row>
                    
                    <Row style={{marginTop : '2em'}}>

                        <Col md={6}>
                            <div className="products-page">
                                <InputGroup id="product-input">
                                    <Input className="query-input" type="text" placeholder="ex. Italian"/>
                                    <InputGroupAddon  addonType="append"><Button color="success" onClick={searchProducts}>Search Products</Button></InputGroupAddon>
                                </InputGroup>
                                <br></br>
                                {noValueFound ? null : <h2 style={{textAlign : 'center', marginTop : '.5em'}}>No results were found, please try again!</h2>}
                                {products ? (
                                    <div>
                                        {products.map(el => (
                                            <ProductContext.Provider value={{setProductDetails}}>
                                                <ProductCard
                                                    key={el.id}
                                                    id={el.id}
                                                    title={el.title}
                                                    image={el.image}
                                                    />
                                            </ProductContext.Provider>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="product-details-list">
                                <h1 style={{textAlign : 'center', marginTop : '.5em'}}>Product Details</h1>
                                {productDetails ? 
                                    <div className="product-info-table">
                                        <Table bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Category</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Price</th>
                                                    <td>{productDetails.price}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Aisle</th>
                                                    <td>{productDetails.aisle}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Badges</th>
                                                    <td>{productDetails.importantBadges}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Ingredients</th>
                                                    <td>{productDetails.ingredientList}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Servings</th>
                                                    <td>
                                                        <li>Servings: {productDetails.servings.number}</li>
                                                        <li>Size: {productDetails.servings.size}</li>
                                                        <li>Units: {productDetails.servings.unit}</li>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Description</th>
                                                    <td>{productDetails.description}</td>
                                                </tr>
                                            </tbody>
                                        </Table> 
                                    </div>
                                : null }
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col lg={2} xl={1}></Col>

            </Row>
        </div>
    )
}

export default ProductPage