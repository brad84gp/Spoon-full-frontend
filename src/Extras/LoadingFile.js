import React from 'react'

import './LoadingFile.css'

import spoonLoading from '../Images/loadingSpoon.png'

function LoadingFile(){
    return(
        <div className="loading">
            <img id="loading-img"src={spoonLoading} alt=""/>
        </div>
    )
}

export default LoadingFile