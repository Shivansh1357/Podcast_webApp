import React from 'react'
import { Link } from 'react-router-dom'
import "./styles.css"
const PodcastCard = ({id,title,displayImage}) => {

  return (
    <Link to={`/podcasts/${id}`}>
    <div className='podcast-card'>
        <img className='display-image-podcast' src={displayImage} alt={title}/>
        <p className='title-podcast'>{title}</p>
    </div>
    </Link>
  )
}

export default PodcastCard