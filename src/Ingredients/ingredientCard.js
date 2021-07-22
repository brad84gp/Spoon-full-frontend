import React, { useLayoutEffect, useState } from 'react'

import './ingredientCard.css'

import {
    Card, Button, CardImg, CardTitle, CardBody, Dropdown, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle
  } from 'reactstrap';
import axios from 'axios';


const ApiRoutes = require('../API/API-info')

function IngredientCard({id, name, image}){    

    const [ingredientDetails, setIngredientDetails] = useState({
        id : id,
        name : name,
        image : image,
        details : ''
    })

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useLayoutEffect(() => {
        async function getDetails(){
            const response = await axios.get(`${ApiRoutes.ingredientInformation}/${ingredientDetails.id}/information?apiKey=${ApiRoutes.apiKey}`)
            setIngredientDetails(data => ({...data, details : response.data}))   
        }
        getDetails()
    }, [])
    

    return (
        <div className='ingredient-card'>
            <Card >
                <CardImg id="ingredient-card-img" top width="100%" src={ingredientDetails.image} alt="Card image cap" />
                <CardBody>
                    <CardTitle id="ingredient-card-name" tag="h5"><b>Name: </b>{ingredientDetails.name}</CardTitle>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>
                            Details
                        </DropdownToggle>
                        <DropdownMenu right style={{width : '50px'}}>
                            <ul>
                                <li>Aisle: {ingredientDetails.details.aisle}</li>
                                <li>Category: {ingredientDetails.details.categoryPath}</li>
                                <li>Consistency: {ingredientDetails.details.consistency}</li>
                                <li>Units: {ingredientDetails.details.shoppingListUnits}</li>
                            </ul>
                        </DropdownMenu>
                    </Dropdown>
                </CardBody>
            </Card>
        </div>
    )
}

export default IngredientCard