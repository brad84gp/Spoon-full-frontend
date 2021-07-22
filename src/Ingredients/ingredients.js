import React, { useState } from 'react'
import axios from 'axios'


import './ingredients.css'

import { Button, InputGroupAddon, InputGroup, Input, Row, Col } from 'reactstrap'

import ingredientsPicture from '../Images/ingredients-homepage.jpg'
import IngredientCard from './ingredientCard'

const ApiRoutes = require('../API/API-info')

const IngredientPage = () => {

    const [ingredientsList, setIngredientsList] = useState({
        message : '',
        data : []
    })

    const [substitutes, setSubstitutes] = useState({
        message : '',
        data : ''
    })

    async function searchRecipes(){
        try{
            let queryTag = document.querySelector('.query-input').value
            let response = await axios.get(`${ApiRoutes.ingredientSearch}${queryTag}`)
            console.log(response)
            setIngredientsList({
                message : 'No results were found for your search, Please try again',
                data : response.data.results
            })
        }catch{
            return null
        }
    }

    async function findSubstitue(){
        try{
            let queryTag = document.querySelector('.query-sub-input').value
            let response = await axios.get(`${ApiRoutes.ingredientSubstitute}${queryTag}`)
            setSubstitutes({
                message : response.data.message,
                data : response.data.substitutes
            })

        }catch{
           return null
        }
    }



    const ListItems = ({el}) => {
        return (
            <li style={{ listStyleType : 'none', marginTop : '15px'}}>{el}</li>
        )
    }

    console.log(ingredientsList)

    return (
        <div>
            <Row>
                <Col lg={2} xl={1}></Col>

                <Col sm={12} lg={8} xl={10}>

                    <Row style={{height : '500px'}}>
                        <Col sm={12}>
                            <di>
                                <img id="ingredients-card-img" src={ingredientsPicture} alt="" />
                            </di>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6} >
                            
                            <div className='ingredients-page'>
                                <InputGroup id="ingredient-input">
                                    <Input className="query-input" type="text" placeholder="ex. Italian"/>
                                    <InputGroupAddon  addonType="append"><Button color="success" onClick={searchRecipes}>Search Ingredients</Button></InputGroupAddon>
                                </InputGroup>
                                <br></br>
                                <h3 style={{textAlign : 'center'}}>{ingredientsList.message}</h3>
                                {ingredientsList ? (
                                    <Row>
                                        {ingredientsList.data.map(el => (
                                            <IngredientCard
                                                key={el.id}
                                                id={el.id}
                                                name={el.name}
                                                image={el.image}
                                                />
                                        ))}
                                    </Row>
                                ) :  null}
                            </div>
                        </Col>
                        
                        <Col sm={6} >
                            <div className='find-substitutes'>
                                <InputGroup id="ingredient-input">
                                        <Input className="query-sub-input" type="text" placeholder="ex. butter"/>
                                    <InputGroupAddon  addonType="append"><Button color="success" onClick={findSubstitue}>Find Substitute</Button></InputGroupAddon>
                                </InputGroup>
                                <br></br>
                                <h3>{substitutes.message}</h3>
                                {substitutes.data ? (
                                    <ul id='ingredient-sub-data'>
                                        {substitutes.data.map(el => (
                                            <ListItems el={el}/>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col lg={2} xl={1}></Col>
            </Row>
        </div>
    )
}

export default IngredientPage