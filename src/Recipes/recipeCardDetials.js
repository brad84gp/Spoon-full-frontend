import React, { useContext, useState } from 'react'
import RecipeContext from '../ReactContext/ReactContext'

import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button } from 'reactstrap';
import classnames from 'classnames'
import './recipeCardDetails.css'
import './recipeCardDetailsMediaQueries.css'


const RecipeDetails = ({details}) => {
    
    const {setRecipeDetails} = useContext(RecipeContext)
    console.log(details)

    const TableData = ({name, amount, unit}) => {
        return(
            <tr>
            <th scope="row"></th>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{unit}</td>
            </tr>
        )
    }

    function exitWindow(evt){
        evt.preventDefault()
        setRecipeDetails({
            boolen : false,
            data : ''
        })
    }

    const ListInfo = ({el}) => {
        console.log({el})
        return (
            <li>{el}</li>
        )
    }

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
    if(details.boolean){
        return (
        <div className="card-details">
            <Nav tabs >
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { toggle('1'); }}
                    >
                    Tab1
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}
                    >
                    Ingredients
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => { toggle('3'); }}
                    >
                    Caloric Breakdown
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '4' })}
                    onClick={() => { toggle('4'); }}
                    >
                    Wine Pairings
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                    <Col sm="12">
                            <img id="card-details-img" src={details.data.image} alt="" />
                            <div id="title-cuisine">
                                <h2 id="card-details-title">Title: {details.data.title}</h2>
                                <h3 id="card-details-cuisines">Cuising Types: </h3>
                                {details.data.cuisines
                                    ? (
                                        <ul id="cuisine-ul">
                                            {details.data.cuisines.map(el => (
                                                <ListInfo el={el} />
                                            ))}
                                        </ul>
                                    ) : null} 
                            </div>
                    </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                    <Col sm="12">
                        <Table style={{height : 'max-content'}}>
                            <thead>
                                <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Unit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.data.nutrition.ingredients.map(el => (
                                    <TableData 
                                        name={el.name}
                                        amount={el.amount}
                                        unit={el.unit}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                    <Col sm="12">
                        <Table>
                            <thead>
                                <tr>
                                <th></th>
                                <th>Proeien</th>
                                <th>Carbs</th>
                                <th>Fat</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row"></th>
                                <td>{details.data.nutrition.caloricBreakdown.percentProtein} %</td>
                                <td>{details.data.nutrition.caloricBreakdown.percentCarbs} %</td>
                                <td>{details.data.nutrition.caloricBreakdown.percentFat} %</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="4">
                    <Row>
                    <Col sm="12">
                        <h2 style={{textAlign : 'center'}}>Wine Pairings: </h2>
                        {details.data.winePairing.pairedWines
                                    ? (
                                        <ul id="wine-ul">
                                            {details.data.winePairing.pairedWines.map(el => (
                                                <ListInfo el={el} />
                                            ))}
                                        </ul>
                                    ) : null} 
                        <p id="wine-p">{details.data.winePairing.pairingText}</p>           
                    </Col>
                    </Row>
                </TabPane>
            </TabContent>
            <Button id="exit-btn" color='danger' onClick={exitWindow}>X</Button>
        </div>
        );
    }else{
        return null
    }
}

export default RecipeDetails