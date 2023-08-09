import React from 'react'
import Button from '../../Common/Button'
import "./styles.css"
const EpisodeDetails = ({index,title,desc,onClick,audioFile}) => {
  return (
    <div style={{width:"100%"}}>
        <h1 style={{textAlign:"left",marginBottom:0}}>{index}.{title}</h1>
        <p style={{marginLeft:"1rem", margin:"1.3rem"}} className='podcast-desc'>{desc}</p>
        <Button text={"Play"} onClick={()=>onClick(audioFile)}/>
    </div>
  )
}

export default EpisodeDetails