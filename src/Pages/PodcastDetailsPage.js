import React, { useEffect, useState } from 'react'
import Header from '../Components/Common/Header'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { QuerySnapshot, collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Button from "../Components/Common/Button"
import EpisodeDetails from '../Components/Podcasts/EpisodeDetails';
import AudioPlayer from '../Components/Podcasts/AudioPlayer';
const PodcastDetailsPage = () => {
    const {id} = useParams();
    const [podcast,setPodcast]=useState({});
    const [episodes,setEpisodes]=useState([]);
    const [playingFile,setPlayingFile]=useState('');

    const navigate=useNavigate();
    console.log("id", id)

    useEffect(() => {
        if(id){
            getData();
        }
    }, [id])

    const getData = async () => {
        try{
            const docRef = doc(db, "podcasts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setPodcast({id:id,...docSnap.data()})

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            toast.error("No such document!")
            navigate("/podcasts")
        }
        }
        catch(e){
            toast.error(e.message)
        }
    }
    useEffect(()=>{
        const unSubscribed=onSnapshot(
            query(collection(db,"podcasts",id,"episodes")),
            (querySnapshot)=>{
                const episodeData=[];
                querySnapshot.forEach((doc)=>{
                    episodeData.push({id:doc.id,...doc.data()});
                })
                setEpisodes(episodeData);
            }
        )
        return ()=>{
            unSubscribed();
        }
    },[id])
    return (
        <div>
            <Header />
            <div className='input-wrapper'>
                {podcast.id && (
                <>
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center" , width:"100%"}}>
                    <h1 className='podcast-title-heading'>{podcast.title}</h1>
                    {
                        podcast.createdBy==auth.currentUser.uid && (
                            <Button 
                    width={"300px"}
                    text={"Create Episode"} 
                    onClick={()=>{navigate(`/podcast/${id}/create-episode`)}}
                    
                    />
                        )
                    }
                    </div>
                    <div className='banner-wrapper'>         
                        <img src={podcast.bannerImage} alt={podcast.title}/>
                    </div>
                    <p className='podcast-desc'>{podcast.description}</p>
                    <h1 className='podcast-title-heading'>Episodes</h1>
                    {episodes?<ol>{
                    episodes.map((episode,index)=>{
                        return <EpisodeDetails
                        key={index}
                        index={index+1}
                         title={episode.title}
                         desc={episode.description}
                         audioFile={episode.audio}
                         onClick={(file)=>setPlayingFile(file)}
                        />
                        
                    })}</ol>:<p>No Episodes Found</p>}
                    </>
                    )}
            </div>
            {playingFile &&  <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />
                }
        </div>
    )
}

export default PodcastDetailsPage