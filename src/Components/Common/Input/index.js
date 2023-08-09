import React from 'react'
import "./style.css"
const InputComponent = ({
    type,placeholder,state,setState,required
}) => {
  return (
    <div>
        <input 
        type={type} 
        placeholder={placeholder}
        value={state}
        onChange={(e)=>setState(e.target.value)}
        required={required}
        className="custom-input"
        />
    </div>
  )
}

export default InputComponent