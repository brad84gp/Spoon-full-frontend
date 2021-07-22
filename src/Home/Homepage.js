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
                

                <Col sm={12} md={8} lg={10}>

                    <Row style={{height : '500px'}}>
                        <Col sm={12} lg={6}>
                            <img id="div-img" src={recipe} alt=""/>
                            <div id="h1-top-left">
                                <a href="/recipes"><h1 id="recipe">Recipes</h1></a>
                            </div>
                        </Col>
                        <Col sm={12} lg={6}>
                            <img id="div-img"  src={menu} alt=""/>
                            <div id="h1-top-right">
                                <a href="/Menu"><h1 id="menu" >Menu</h1></a>
                            </div>
                        </Col>
                    </Row>

                    <Row style={{height : '500px'}}>
                        <Col sm={12} lg={6}>
                            <img id="div-img"  src={ingredients} alt="" />
                            <div id="h1-bottom-left">
                                <a href="/Ingredients"><h1 id="ingredients" >Ingredients</h1></a>
                            </div>
                        </Col>
                        <Col sm={12} lg={6}>
                            <img id="div-img"  src={products} alt=""/>
                            <div id="h1-bottom-right">
                                <a href="/Products"><h1 id="products">Products</h1></a>
                            </div>
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