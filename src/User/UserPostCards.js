import React from 'react'

import './UserPostCards.css'

import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'


const PostCard = ({recipeName, likes, dislikes, postId, postText, postTitle, recipeUrl, username}) => {


    return (
        <div>
            <Card id={postId} className="posts-card">
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
            </Card>
        </div>
    )
}

export default PostCard