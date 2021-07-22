import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux';

import './productCard.css'

import { Card, Button, CardImg, CardTitle, CardBody } from 'reactstrap';

import axios from 'axios';
import ProductContext from '../ReactContext/ProductContext';

import SpoonacularApi from '../API/ThirdParty-API'

const ApiRoutes = require('../API/API-info')


function ProductCard({id, title, image}){

    const userValue = useSelector(store => store.user)

    const {setProductDetails} = useContext(ProductContext);

    const [productCardDetails, setProductCardDetails] = useState({
        id : id,
        title : title,
        image : image
    })

    async function getDetails(){
        try{
            const productId = productCardDetails.id
            let response = await axios.get(`${ApiRoutes.specificProductInfo}${productId}?apiKey=${ApiRoutes.apiKey}`)
            setProductDetails(response.data)
        }catch{
            return null
        }
    }

    async function addProduct(){
        try{
            const username = userValue.username
            const item_id = productCardDetails.id
            const title = productCardDetails.title
            let response = await SpoonacularApi.addToGroceryList({username, title, item_id})
        }catch (err){
            return null
        }
    }


    return (
        <div className="product-card">
            <Card className="product-card-group">
                <CardImg id="product-card-img" top width="100%" src={productCardDetails.image} alt="Card image cap" />
                <CardBody>
                    <CardTitle id="product-card-title" tag="h5">{productCardDetails.title}</CardTitle>
                    <Button id="product-card-btn" color="primary" onClick={getDetails}>Details</Button>
                    <Button  color="success" onClick={addProduct}>Add to Grocery List</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default ProductCard