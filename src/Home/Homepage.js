import React from 'react';

import './HomePage.css'
import './HomePageMediaQueries.css'

import { Row, Col } from 'reactstrap';

import recipe from '../Images/recipe-homepage.jpg'
import menu from '../Images/menu-homepage.jpg'
import ingredients from '../Images/ingredients-homepage.jpg'
import products from '../Images/products-homepage.jpg'


const HomePage = () => {


    return(
        <div>

            <Row>
                <Col md={2} lg={1}></Col>
                

                <Col xs={12} md={8} lg={10}>

                    <Row style={{height : '500px'}}>
                        <Col xs={12} lg={6}>
                            <a href="/recipes">
                                <img id="div-img" src={recipe} alt=""/>
                                <div id="h1-top-left">
                                    <h1 id="recipe">Recipes</h1>
                                </div>
                            </a>
                        </Col>
                        <Col xs={12} lg={6}>
                            <a href="/Menu">
                                <img id="div-img"  src={menu} alt=""/>
                                <div id="h1-top-right">
                                    <h1 id="menu" >Menu</h1>
                                </div>
                            </a>
                        </Col>
                    </Row>

                    <Row style={{height : '500px'}}>
                        <Col xs={12} lg={6}>
                            <a href="/Ingredients">
                                <img id="div-img"  src={ingredients} alt="" />
                                <div id="h1-bottom-left">
                                    <h1 id="ingredients" >Ingredients</h1>
                                </div>
                            </a>
                        </Col>
                        <Col xs={12} lg={6}>
                            <a href="/Products">
                                <img id="div-img"  src={products} alt=""/>
                                <div id="h1-bottom-right">
                                    <h1 id="products">Products</h1>
                                </div>
                            </a>
                        </Col>
                    </Row>

                </Col>

            <Col md={2} lg={1}></Col>

        </Row>

        <Row>
            <Col>
                <div className="slogan">
                    <p>Sometimes all you need to do is add a <b>SpoonFUll</b></p>
                </div>
            </Col>
            
           
        </Row>
            
        </div>
    )
}


export default HomePage