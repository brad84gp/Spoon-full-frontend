import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import './liveFeedCard.css'

import { 
    Card, CardBody, CardSubtitle, CardText, CardTitle,
    InputGroup, Input, Button, Collapse, InputGroupAddon, InputGroupText, CardColumns } from 'reactstrap'


import SpoonacularApi from '../API/ThirdParty-API';

import LiveFeedComments from './liveFeedComments';


const LiveFeedCard = ({recipeName, likes, dislikes, postId, postText, postTitle, recipeUrl, username}) => {

    const userValues = useSelector(store=>store.user)

    const [isOpen, setIsOpen] = useState(false);

    const[userPostInfo, setUserPostInfo] = useState({
        like : likes,
        dislikes : dislikes,
        postId : postId,
        postText : postText,
        postTitle : postTitle,
        postingUser : username,
        comments : []
    })

    useLayoutEffect(() => {
        async function getComments(){
            try{
                let response = await SpoonacularApi.getPostComments(userPostInfo.postId)
                setUserPostInfo(data => ({...data, comments : response}))
            }catch{
                return null
            }
            
        }
        getComments()
    }, [])



    const toggle = () => setIsOpen(!isOpen);

    async function handleClick(evt){
        evt.preventDefault()
        try{
            let comment = document.getElementById(`${userPostInfo.postId}`).value
            let postId = userPostInfo.postId
            let username = userValues.username
            await SpoonacularApi.addComment({username, comment, postId})
        }catch{
            return null
        }
        
    }

    return (
        <div>
            <Card className="posts-card">
                <CardBody>
                    <CardTitle id="posts-card-title">{postTitle}</CardTitle>
                    <CardSubtitle><a href={recipeUrl} target="_blank" style={{textDecoration : 'none'}}>Recipe Name: {recipeName}</a></CardSubtitle>
                    <CardSubtitle>Shared by: {username}</CardSubtitle>
                    <CardText id="posts-card-text">
                        {postText}
                    </CardText>
                    <i class="fa-solid fa-thumbs-up"></i>
                    <i class="fa-solid fa-thumbs-down"></i>
                </CardBody>
                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Show Comments</Button>
                <Collapse isOpen={isOpen}>
                    {userPostInfo.comments ? (
                        <CardColumns>
                            {userPostInfo.comments.map(el => (
                                <LiveFeedComments 
                                    key={el.comment_id}
                                    id={el.comment_id}
                                    commentingUser={el.username}
                                    comment={el.comment_text}
                                    />
                            ))}
                        </CardColumns>
                    ) : null}
                    <InputGroup>
                        <Input type="textarea" id={userPostInfo.postId} name={userPostInfo.postId} placeholder="Comment Here" />
                        <InputGroupAddon addonType="append">
                            <Button color="success" style={{height : '100%'}} onClick={handleClick}>Submit</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Collapse>
            </Card>
        </div>
    )
}

export default LiveFeedCard