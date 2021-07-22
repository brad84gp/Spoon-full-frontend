import React, { useLayoutEffect, useState} from 'react'

import { Col, Row, Button, Form, FormGroup, Label, Input, CardColumns} from 'reactstrap';


import SpoonacularApi from '../API/ThirdParty-API';
import axios from 'axios';
import PostCard from './UserPostCards';

const ApiRoutes = require('../API/API-info')

const UserPosts = ({userInformation}) => {

    const [userPosts, setUserPosts] = useState()

    useLayoutEffect(() => {
        async function getUserPosts(){
            const username = userInformation.userValues.username
            const response = await SpoonacularApi.getUserPosts(username)
            setUserPosts(response)
        }
        getUserPosts()
    }, [])

    async function addNewPost(evt){
        evt.preventDefault()
        const formData = document.querySelector('.post-form')
        const post_title = formData.post_title.value
        const post_text = formData.post_text.value
        const recipeToShare = formData.recipe_to_share.value 
        const username = userInformation.userValues.username
        if(recipeToShare){
            const recipe_id = await SpoonacularApi.getRecipeId(recipeToShare)
            const recipe_url = await (await axios.get(`${ApiRoutes.recipeInformation}${recipe_id}/information?apiKey=${ApiRoutes.apiKey}`)).data.sourceUrl
            let response = await SpoonacularApi.addNewPost({username, post_title, post_text, recipeToShare, recipe_url})
        }else{
            let response = await SpoonacularApi.addNewPost({username, post_title, post_text})
        }
        
    }

    const ShareOptions = ({id, el}) => {
        return <option id={id}>{el}</option>
    }

    return (
        <div>
            <Row>
                <Col sm="12">
                    <Form className="post-form">
                        <FormGroup style={{marginBottom : '3em'}}>
                            <Label style={{marginBottom : '1em'}}>Post Title</Label>
                            <Input type="text" name="post_title" />
                        </FormGroup>
                        <FormGroup style={{marginBottom : '3em'}}>
                            <Label for="exampleSelectMulti" style={{marginBottom : '1em'}}>Select Favortie Recipe to Share</Label>
                                {userInformation.recipeList ? (
                                    <Input type="select" name="recipe_to_share" id="exampleSelectMulti" multiple>
                                            {userInformation.recipeList.map(el => (
                                                <ShareOptions
                                                    key = {el[1]}
                                                    id={el[1]}
                                                    el = {el[0]} />
                                            ))}
                                    </Input>
                                ) : null}
                        </FormGroup>
                        <FormGroup style={{marginBottom : '3em'}}>
                            <Label style={{marginBottom : '1em'}}>Text Area</Label>
                            <Input type="textarea" name="post_text" placeholder="Say something about your favorite recipe"/>
                        </FormGroup>
                        <Button color="primary" id="post-form-btn" onClick={addNewPost}>Share Post</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    {userPosts ? (
                        <CardColumns className="post-card-column">
                            {userPosts.map(el => (
                                <PostCard 
                                    key={el.id}
                                    recipeName={el.recipe_name} 
                                    likes={el.post_liked} 
                                    dislikes={el.post_disliked}
                                    postId={el.post_id} 
                                    postText={el.post_text}
                                    postTitle={el.post_title}
                                    recipeUrl={el.recipe_url}
                                    username={el.username} 
                                />
                            ))}
                        </CardColumns>
                    ) : null}
                   
                </Col>
            </Row>
        </div>
    )
}

export default UserPosts