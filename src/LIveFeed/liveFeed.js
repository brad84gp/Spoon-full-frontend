import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Row, Col, CardColumns } from 'reactstrap'


import SpoonacularApi from '../API/ThirdParty-API'
import LiveFeedCard from './liveFeedCards'


const LiveFeed = () => {

    const history = useHistory()

    const token = useSelector(store => store.token)

    if(!token) history.push("/")

    const [posts, setPosts] = useState()

    useLayoutEffect(()=>{
        async function getPosts(){
            let response = await SpoonacularApi.getAllPosts()
            setPosts(response.data)
        }
        getPosts()
    }, [])


    return (
        <div>
            <Row>
                <Col lg={2}></Col>

                <Col sm={12} lg={8}>
                    {posts ? (
                            <CardColumns className="post-card-column">
                                {posts.map(el => (
                                    <LiveFeedCard 
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

                <Col lg={2}></Col>
            </Row>
        </div>
    )
}

export default LiveFeed