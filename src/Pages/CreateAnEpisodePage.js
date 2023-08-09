import React, { useState } from 'react'
import Header from '../Components/Common/Header'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../Components/Common/Button';
import InputComponent from '../Components/Common/Input';
import FileInput from '../Components/Common/Input/FileInput';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const CreateAnEpisodePage = () => {
    const {id}=useParams();
    const [title,setTitle]=useState('');
    const [desc,setDesc]=useState('');
    const [audio,setAudio]=useState(null);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    function audioFileHandleFnc(file){
        setAudio(file)
    }
    async function handleSubmit(){
        if(title && desc && audio ){
        try{
                const audioRef=ref(storage,
                    `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
                    );
                    await uploadBytes(audioRef,audio);
                    const audioURL=await getDownloadURL(audioRef);
                    const episodeData={
                        title:title,
                        description:desc,
                        audio:audioURL,

                    }
                    await addDoc(
                            collection(db,"podcasts",id,"episodes"),
                            episodeData
                    )
                toast.success("Episode Created Successfully")
                setLoading(false)
                navigate(`/podcasts/${id}`)
                setAudio(null)
                setTitle("")
                setDesc("")
            }
            catch(e){
                toast.error("e.message");
            }
        }
            else{
                toast.error("ALL Feilds are mandatory");
                setLoading(false);
        }
    }
  return (
    <div>
        <Header/>
        <div className='input-wrapper'>
            <h1>Create An Episode</h1>
            <InputComponent
          type={"text"}
          state={title}
          setState={setTitle}
          placeholder={"Title"}
          required={true}
        />
        <InputComponent 
          type={"text"}
          state={desc}
          setState={setDesc}
          placeholder={"Enter Description"}
          required={true}
        />
        <FileInput 
        accept={"audio/*"} 
        id="audio-input" 
        fileHandleFnc={audioFileHandleFnc} 
        text={"upload File"}
        />
        <Button text={loading? "Loading":"Create Episode"} disabled={loading} onClick={handleSubmit} />
        </div>
    </div>
  )
}

export default CreateAnEpisodePage