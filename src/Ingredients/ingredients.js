import React, { useState } from 'react'
import axios from 'axios'


import './ingredients.css'

import { Button, InputGroupAddon, InputGroup, Input, Row, Col } from 'reactstrap'

import ingredientsPicture from '../Images/ingredients-homepage.jpg'
import IngredientCard from './ingredientCard'

const ApiRoutes = require('../API/API-info')

const IngredientPage = () => {

    const [ingredientsList, setIngredientsList] = useState({
        message : false,
        data : []
    })

    const [substitutes, setSubstitutes] = useState({
        message : '',
        data : ''
    })

    async function searchRecipes(evt){
        evt.preventDefault()
        try{
            let queryTag = document.querySelector('.query-input').value
            let response = await axios.get(`${ApiRoutes.ingredientSearch}${queryTag}`)
            if(response.data.results.length == 0) return setIngredientsList({ message : true, data : []})
            setIngredientsList({
                message : false,
                data : response.data.results
            })
        }catch{
            return null
        }
    }

    async function findSubstitue(evt){
        evt.preventDefault()
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
                                <div id="ingredient-img-h1-div">
                                    <h1 id="img-h1">NOT SURE WHAT INGREDIENTS TO ADD? LET US HELP YOU DECIDE!</h1>
                                </div>
                            </di>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6} >
                            
                            <div className='ingredients-page'>
                                <form onSubmit={searchRecipes}>
                                    <InputGroup id="ingredient-input">
                                        <Input className="query-input" type="text" placeholder="ex. Italian"/>
                                        <InputGroupAddon  addonType="append"><Button color="success">Search Ingredients</Button></InputGroupAddon>
                                    </InputGroup>
                                </form>
                                <br></br>
                                {ingredientsList.message ? <h3 style={{textAlign : 'center'}}>No results were found, please try a different search!</h3> : null}
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
                                <form onSubmit={findSubstitue}>
                                    <InputGroup id="ingredient-input">
                                            <Input className="query-sub-input" type="text" placeholder="ex. butter"/>
                                        <InputGroupAddon  addonType="append"><Button color="success" >Find Substitute</Button></InputGroupAddon>
                                    </InputGroup>
                                </form>
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