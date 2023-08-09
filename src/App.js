import logo from './logo.svg';
import './App.css';
import Header from './Components/Common/Header';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import ProfilePage from './Pages/ProfilePage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from './Slices/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import RoutesPrivate from './RoutesPrivate';
import CreateAPodcastPage from './Pages/CreateAPodcastPage';
import PodcastsPage from './Pages/PodcastsPage';
import PodcastDetailsPage from './Pages/PodcastDetailsPage';
import CreateAnEpisodePage from './Pages/CreateAnEpisodePage';

function App() {
    const dispatch=useDispatch();
    useEffect(()=>{
      const unSubscribedAuth=onAuthStateChanged(auth,(user)=>{
        if(user){
          const unSubscribedSnapShot=onSnapshot(
            doc(db,"users",user.uid),
            (userDoc)=>{
              if(userDoc.exists()){
                const userData=userDoc.data();
                dispatch(
                  setUser({
                    name:userData.name,
                    email:userData.email,
                    uid:user.uid,
                    
                  })
                )
              }
            },
            (error)=>{console.log("Error fetching user data:",error);}
          );
          return ()=>{
            unSubscribedSnapShot();
          };
        }

      });
      return()=>{
          unSubscribedAuth();
      }
    },[])

  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/'  element={<Signup/>}/>
        <Route element={<RoutesPrivate/>}>
            <Route path='/profile'  element={<ProfilePage/>}/>
            <Route path='/create-a-podcast'  element={<CreateAPodcastPage/>}/>
            <Route path='/podcasts'  element={<PodcastsPage/>}/>
            <Route path='/podcasts/:id'  element={<PodcastDetailsPage/>}/>
            <Route path="/podcast/:id/create-episode"  element={<CreateAnEpisodePage/>}/>


        </Route>
      </Routes>
    </div>
  );
}

export default App;
