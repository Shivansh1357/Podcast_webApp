import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../Components/Common/Header';
import Button from '../Components/Common/Button';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Loader from '../Components/Common/Loader';

const ProfilePage = () => {
    const user=useSelector((state)=>state.user.user)
    console.log("User data for profile page", user);
    if(!user){
        return (
            <Loader/>
        )
    }
    function handleLogout(){
        signOut(auth)
        .then(()=>{
            toast.success("User Logged out");
        })
        .catch((error)=>{
            toast.error(error.message);
        })
    }
    function handleReset(){
         
    }
  return (
    <div>
        <Header/>
        <div style={{ alignItems:'baseline' , justifyContent:"center", marginTop:"4rem"}} className='input-wrapper' >
        <h1>Full Name : {user.name}</h1>
        <h1>Email : {user.email}</h1>
        <Button text={"Logout"} onClick={handleLogout}/>
        </div>
    </div>
  )
}

export default ProfilePage