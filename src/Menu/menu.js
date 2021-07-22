import React, { useState } from 'react'
import axios from 'axios'

import './menu.css'

import { Button, InputGroupAddon, InputGroup, Input, Row, Col } from 'reactstrap'

import MenuCard from './menuCard'

import menu from '../Images/menu-homepage.jpg'

const ApiRoutes = require('../API/API-info')



const MenuPage = () => {

    const [menuInfo, setMenuInfo] = useState({})

    
    async function getMenuInfo(){
        let tagQuery = document.querySelector('.query-input').value
        let response = await axios.get(`${ApiRoutes.menuSearch}${tagQuery}`)
        let menuItems = response.data.menuItems
        setMenuInfo(menuItems)
    }


    return (
        <div>
            <Row>
                <Col lg={2} xl={1}></Col>

                <Col sm={12} lg={8} xl={10}>

                    <Row style={{height : '500px'}}>
                        <Col sm={12}>
                            <div className="menu-img-div">
                                <img id="menu-img" src={menu} alt="" />
                            </div>
                        </Col>
                    </Row>
                    
                    <Row>
                        <div className="menu-page">
                            <InputGroup id="recipe-input">
                                <Input className="query-input" type="text" placeholder="ex. Pizza"/>
                                <InputGroupAddon  addonType="append"><Button color="success" onClick={getMenuInfo}>Search Recipes</Button></InputGroupAddon>
                            </InputGroup>
                            {menuInfo.length ? (
                                <div>
                                    <Row>
                                        {menuInfo.map(el => (
                                            <MenuCard
                                                key={el.id}
                                                id={el.id}
                                                title={el.title}
                                                image={el.image}
                                                chain={el.restaurantChain}
                                                />
                                        ))}
                                    </Row> 
                                </div>      
                            ) : null}
                        </div>
                    </Row>
                </Col>                   

                <Col lg={2} xl={1}></Col>
            </Row>
        </div>
    )
}

export default MenuPage;