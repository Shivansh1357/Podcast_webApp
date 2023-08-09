import React, { useState } from 'react'
import "./styles.css"
import InputComponent from '../../Common/Input'
import Button from '../../Common/Button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import  {auth,db,storage} from "../../../firebase"
import { setUser } from '../../../Slices/userSlice'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const LoginForm = () => {
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    async function handleLogin(){
            setLoading(true);
            if(email && password){
                try{    
                    // creating users account 
                    const userCredential=await signInWithEmailAndPassword(
                      auth,email,password
                    );
                    const user=userCredential.user;
                    
                      //saving user account
                    const userDoc=await getDoc(doc(db,"users",user.uid));
                    const userData=userDoc.data();
                    console.log("userData",userData);
                    // save data in redux , call the redux action
                    dispatch(setUser({
                      name: userData.name,
                      email:user.email,
                      uid:user.uid,
                      profilePic:null,
                  })
                  );
                  setLoading(false);
                  toast.success("Login Successful")
                    navigate("/profile");
                  } 
                  catch(e){
                    console.log("error",e)
                    toast.error(e.message);
                  }
            }
            else{
                toast.error("Make sure email and password are not empty")
            }

       }
  return (
    <>
       
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
        <Button text={loading? "Loading...":"Submit"} onClick={handleLogin} disabled={loading}/>
    </>
  )
}

export default LoginForm