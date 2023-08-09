import React, { useEffect, useState } from 'react'
import Header from "../Components/Common/Header"
import { useDispatch, useSelector } from 'react-redux'
import { QuerySnapshot, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { setPodcasts } from '../Slices/podcastsSlice';
import PodcastCard from '../Components/Podcasts/PodcastCard';
import InputComponent from '../Components/Common/Input';
const PodcastsPage = () => {
    const dispatch=useDispatch();
    const   podcasts=useSelector((state)=>(state.podcasts.podcasts));
    const [search,setSearch]=useState("");


useEffect(()=>{
    const unSubscribed=onSnapshot(
        query(collection(db,"podcasts")),
        (querySnapshot)=>{
            const podcastData=[];
            querySnapshot.forEach((doc)=>{
                podcastData.push({id:doc.id, ...doc.data()});
            });
            dispatch(setPodcasts(podcastData));
        },
        (error)=>{
                console.error("Error in Fetching Podcast: " ,error)
        }

    );
    return()=>{
        unSubscribed();
    }
},[dispatch])
    var filterPodcasts=podcasts.filter((item)=>item.title.trim().toLowerCase().includes(search.trim().toLowerCase()));
    console.log(filterPodcasts)
  return (
    <div>
        <Header  />
        <div className='input-wrapper'>
            <h1>Discover Podcasts</h1>
            <InputComponent 
          type={"text"}
          state={search}
          setState={setSearch}
          placeholder={"Search By Title"}
          
        />
            {podcasts ? (
            <div className='podcasts-flex'>{filterPodcasts.map((item)=>{
                return (
                    <PodcastCard
                    key={item.id}
                    id={item.id} 
                    displayImage={item.displayImage}
                    title={item.title}
                    />
                )
            })}</div>
            ):   (<p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>)
            }
        </div>
    </div>
  )
}

export default PodcastsPage