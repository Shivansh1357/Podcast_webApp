import React, { useState } from 'react'
import "./styles.css"
import InputComponent from '../../Common/Input'
import Button from '../../Common/Button'

import  {auth,db,storage} from "../../../firebase"
import { setUser } from '../../../Slices/userSlice'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
const SignupForm = () => {
    const [fullName,setFullName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    async function handleSignup(){
        if(password===confirmPassword &&  password.length>=6 && fullName && email){
          try{
            // creating users account
            setLoading(true) ;
            const userCredential=await createUserWithEmailAndPassword(
              auth,email,password
            );
            const user=userCredential.user;
            console.log("user",user);
              //saving user account
            await setDoc(doc(db,"users",user.uid),{
                name:fullName,
                email:user.email,
                uid:user.uid,
                profilePic:null,
            });
            // save data in redux , call the redux action
            dispatch(setUser({
              name:fullName,
              email:user.email,
              uid:user.uid,
              profilePic:null,
          })

          );
          toast.success("User has been created!");
          setLoading(false); 
            navigate("/profile");
          } 
          catch(e){
            console.log("error",e)
            toast.error(e.message);
          }
        }
        else{
          //thorw an error

          if(password!==confirmPassword){
            toast.error(" Your password does not match");
          }
          else if(password.length<6){
            toast.error("Password should be at least of 6 characters");
          }
          setLoading(false);
        }
      }
  return (
    <>
        <InputComponent
          type={"text"}
          state={fullName}
          setState={setFullName}
          placeholder={"Full Name"}
          required={true}
        />
        <InputComponent 
          type={"email"}
          state={email}
          setState={setEmail}
          placeholder={"Enter E-mail"}
          required={true}
        />
          <InputComponent 
          type={"password"}
          state={password}
          setState={setPassword}
          placeholder={"Password"}
          required={true}
        />
        <InputComponent 
          type={"password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Confirm Password"}
          required={true}
        />
        <Button text={loading?"Loading...":"Signup"} disabled={loading} onClick={handleSignup}/>
    </>
  )
}

export default SignupForm