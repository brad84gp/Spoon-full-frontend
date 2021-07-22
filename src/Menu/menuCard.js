import React, { useLayoutEffect, useState } from 'react'

import './menuCard.css'

import { Card, CardImg, CardTitle, CardSubtitle, Col
    } from 'reactstrap';

import axios from 'axios';

const ApiRoutes = require('../API/API-info')

function MenuCard({id, title, image, chain}) {

    const [restaurantInfo, setRestaurantInfo] = useState({
        id : id,
        title : title,
        image : image,
        chain : chain
    })

    const [nutritionData, setNutritionData] = useState()

    useLayoutEffect(() => {
        async function details(){
            let response = await axios.get(`${ApiRoutes.menuFoodInfo}${restaurantInfo.id}?apiKey=${ApiRoutes.apiKey}`)
            let resInfo = response.data.nutrition
            setNutritionData(resInfo)
        }
        details()
    }, [])

    return (
        <Col sm={12} lg={6} xl={4} style={{marginTop : '2em'}}>
            <Card className="menu-card">
                <CardImg id="menu-card-img" src={image} alt=""/>
                <CardTitle id="menu-card-title">Food Title: {restaurantInfo.title}</CardTitle>
                <CardSubtitle id="menu-card-chain">Resturant Chain: {restaurantInfo.chain}</CardSubtitle>
                {nutritionData ? (
                    <div className="menu-card-table-div">
                        <table id="menu-table">
                            <tbody>
                                <tr>
                                    <th>Protein</th>
                                    <td>{nutritionData.protein}</td>
                                </tr>
                                <tr>
                                    <th>Carbs</th>
                                    <td>{nutritionData.carbs}</td>
                                </tr>
                                <tr>
                                    <th>Fat</th>
                                    <td>{nutritionData.fat}</td>
                                </tr>
                                <tr>
                                    <th>Calories</th>
                                    <td>{nutritionData.calories}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </Card>
        </Col>

    )
}

export default MenuCard