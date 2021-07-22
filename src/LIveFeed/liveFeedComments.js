import React, { useState } from 'react'
import { Card, CardBody, CardSubtitle } from 'reactstrap'

const LiveFeedComments = ({comment_id, commentingUser, comment}) => {

    const [commentInfo, setCommentInfo] = useState({
        id : comment_id,
        comment : comment,
        commentingUser : commentingUser
    })

    return (
        <div style={{margin : '1em'}}>
            <Card id={commentInfo.id}>
                <CardSubtitle style={{position : 'absolute', right : '0%', bottom : '0%'}}>{commentInfo.commentingUser}</CardSubtitle>
                <CardBody>{commentInfo.comment}</CardBody>
            </Card>
        </div>
    )
}

export default LiveFeedComments