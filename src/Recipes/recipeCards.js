import React, { useContext, useState } from 'react'
import axios from 'axios'

import './recipeCard.css'

import {
    Card, Button, CardImg, CardTitle, CardBody, Col
  } from 'reactstrap';


import RecipeContext from '../ReactContext/ReactContext';
import { useSelector } from 'react-redux';
import SpoonacularApi from '../API/ThirdParty-API';


const ApiRoutes = require('../API/API-info')


  

const RecipeCard = ({id, title, image, sourceUrl}) => {

    const userValue = useSelector(store => store.user)

    const {setRecipeDetails} = useContext(RecipeContext);

    const [card, setCard] = useState({
        id : id,
        title : title,
        sourceUrl : sourceUrl,
        image : image
    });

    async function getDetails(evt){
        evt.preventDefault()
        let id = card.id
        let response = await axios.get(`${ApiRoutes.recipeInformation}${id}/information?apiKey=${ApiRoutes.apiKey}&includeNutrition=true`)
        let data = response.data
        setRecipeDetails({
            boolean : true,
            data : data
        })
    }

    async function addRecipe(){
        let username = userValue.username
        let recipe_id = card.id
        let recipe_name = card.title
        try{
            await SpoonacularApi.addFavoriteRecipe({username, recipe_id, recipe_name})
        }catch{
            return null
        }
    }

    return (
        <Col sm={12} lg={6} xl={4} style={{marginTop : '1em'}}>
            <Card className="recipe-card">
                <CardImg id="card-img" top width="100%" src={card.image} alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5"><b>Title: </b>{card.title}</CardTitle>
                    <Button id="card-btn" color="primary" onClick={getDetails}>Details</Button>
                    {userValue ? 
                            <Button id="favorite-recipe" color="success" onClick={addRecipe} style={{marginLeft : '2%'}}>Favorite Recipe!</Button>
                     : null }
                </CardBody>
            </Card>
        </Col>
       
        
    );
}

export default RecipeCard;