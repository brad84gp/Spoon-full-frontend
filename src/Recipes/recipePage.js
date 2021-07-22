import React, { useState } from 'react'
import axios from 'axios'

import './recipePage.css'

import { Button, InputGroupAddon, InputGroup, Input, Row, Col } from 'reactstrap'

import RecipeContext from '../ReactContext/ReactContext'

import RecipeImage from '../Images/recipe-homepage.jpg'
import RecipeCard from './recipeCards'
import RecipeDetails from './recipeCardDetials'



const ApiRoutes = require('../API/API-info')




const RecipePage = () => {

    const [recipeData, setRecipeData] = useState({});

    const [recipeDetails, setRecipeDetails] = useState({
        boolean : false,
        data : ''
    })


   
    async function searchRecipes(evt){
        evt.preventDefault();
        let inputData = document.querySelector('.query-input')
        let response = await axios.get(`${ApiRoutes.recipeSearch}${inputData.value}`)
        setRecipeData(response.data.results)
    }


    return (
        <div>
            <Row id="recipe-page-img-row">
                <Col lg={1}></Col>

                <Col sm={12} lg={10}>
                    <img id="recipe-img" src={RecipeImage} alt="" />
                    <div id="recipe-img-h1-div">
                        <h1 id="img-h1">LET US HELP YOU FIND YOUR NEXT RECIPE!</h1>
                    </div>
                </Col>

                <Col lg={1}></Col>
            </Row>
                
            <Row>
                <Col lg={2} xl={1}></Col>

                <Col sm={12} lg={8} xl={10}>
                    <div className="recipe-page-info">
                        <InputGroup id="recipe-input">
                            <Input className="query-input" type="text" placeholder="ex. Italian"/>
                            <InputGroupAddon  addonType="append"><Button color="success" onClick={searchRecipes} style={{zIndex : '1'}}>Search Recipes</Button></InputGroupAddon>
                        </InputGroup>
                        <br></br>
                        <RecipeContext.Provider value={{setRecipeDetails, recipeDetails}}>
                            {recipeData.length 
                                    ? (
                                        <Row>
                                            {recipeData.map(data => (
                                                <RecipeCard
                                                    key={data.id}
                                                    id={data.id}
                                                    title={data.title}
                                                    image={data.image}
                                                />
                                            ))}
                                        </Row>
                                    ) : null}
                            <div id="recipe-card-details-div">
                                <RecipeDetails details={recipeDetails}/>
                            </div>
                        </RecipeContext.Provider>
                    </div>
                </Col>

                <Col lg={2} xl={1}></Col>
            </Row>
        </div>
    
    )
}

export default RecipePage