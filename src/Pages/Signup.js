import React, { useState } from 'react'
import Header from '../Components/Common/Header'
import InputComponent from '../Components/Common/Input'
import Button from '../Components/Common/Button';
import SignupForm from '../Components/SignupComponents/SignupForm';
import LoginForm from '../Components/SignupComponents/LoginForm';

const Signup = () => {
  const [flag,setFlag]=useState(false);
  return (
    <div>
        <Header />
        <div className='input-wrapper'>
          {!flag ? <h1>Sign Up</h1> :<h1 >Login</h1> }
          {!flag ? <SignupForm />: <LoginForm/>}
          {! flag ?<p  style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Click Here if you already have an Account. Login. </p >:
           <p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Don't Have an Account. Sign Up Here.</p>}

        </div>

    </div>
  )
}

export default Signup