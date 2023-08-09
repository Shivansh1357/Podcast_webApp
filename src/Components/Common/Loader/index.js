import React from 'react'
import "./styles.css"
const Loader = () => {
  return (
    <div className='loader-wrapper' >
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader