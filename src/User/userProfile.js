import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'


import './userProfile.css'

import { 
    Col, Row, Card, CardText, CardBody, CardLink, CardTitle, 
    CardSubtitle}  from 'reactstrap'


import UserPosts from './UserPosts'

import SpoonacularApi from '../API/ThirdParty-API'
import { useHistory } from 'react-router-dom'


const UserProfile = () => {

    const history = useHistory()

    const userValues = useSelector(store => store.user)

    const token = useSelector(store => store.token)

    if(!token) history.push('/')

    const [userInfo, setUserInfo] = useState({})

    // gorceryList collection of children in array. element order: product_name, product_id, username
    const [groceryList, setGroceryList] = useState()

    const [recipeList, setRecipeList] = useState()

    useLayoutEffect(() => {
        setUserInfo(userValues)

        async function getGroceryList(){
            let username = userValues.username
            let response = await SpoonacularApi.getGroceryList(username)
            setGroceryList(response)
        }

        async function getFavoriteRecipes(){
            let username = userValues.username
            let response = await SpoonacularApi.getFavoriteRecipes(username)
            setRecipeList(response)
        }

        getGroceryList()
        getFavoriteRecipes()
        
    }, [])

    const ListItems = ({el}) => {
        return (
            <li id="grocery-list-items">{el[0]}</li>
        )
    }

    
    

    return (
        <div>
            <Row>
                <Col sm={0} lg={2}></Col>

                <Col sm={12} lg={8}>
                    <Row>
                        <Col sm={12} lg={6}>
                            <Row>
                                <Card className="user-info-card">
                                    <CardBody>
                                        <CardTitle tag="h5">{userInfo.username}</CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">Welcome back, {userInfo.first_name} {userInfo.last_name}!</CardSubtitle>
                                    </CardBody>
                                    <CardBody>
                                        <CardLink href="/Edit">Edit Profile</CardLink>
                                        <CardLink href="/LiveFeed">Live Feed</CardLink>
                                    </CardBody>
                                </Card>
                            </Row>
                            <Row>
                                <Card className="recipe-list-card">
                                    <CardBody>
                                        <CardTitle tag="h5" style={{textAlign : 'center'}}>Favorite Recipes</CardTitle>
                                    </CardBody>
                                    <CardBody>
                                        {recipeList ? (
                                            <ul>
                                                {recipeList.map(el => (
                                                    <ListItems el={el} />
                                                ))}
                                            </ul>
                                        ) : null}
                                    </CardBody>
                                </Card>
                            </Row>
                        </Col>
                        <Col sm={12} lg={6}>
                            <Card className="grocery-list-card">
                                <CardBody>
                                    <CardTitle tag="h5" style={{textAlign : 'center'}}>Grocery List</CardTitle>
                                </CardBody>
                                <CardBody>
                                    {groceryList ? (
                                        <ul>
                                            {groceryList.map(el => (
                                                <ListItems el={el} />
                                            ))}
                                        </ul>
                                    ) : null}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col sm={0} lg={2}></Col>
            </Row>

            <Row>
                <Col sm={0} lg={2}></Col>

                <Col sm={12} lg={8}>
                    <UserPosts userInformation={{userValues, recipeList}}/>
                </Col>                            

                <Col sm={0} lg={2}></Col>
                
            </Row>
        </div>
    )
}

export default UserProfile