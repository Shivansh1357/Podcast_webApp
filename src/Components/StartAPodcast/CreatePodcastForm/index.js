import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../../Common/Input';
import { toast } from 'react-toastify';
import Button from '../../Common/Button';
import FileInput from '../../Common/Input/FileInput';
import {storage,auth, db} from  "../../../firebase"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
const CreateAPodcastForm = () => {
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [displayImage,setDisplayImage]=useState();
  const [bannerImage,setBannerImage]=useState();
  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  async function handlePodcast(){
    if(title && desc && displayImage && bannerImage){
      setLoading(true)
      // 1. Upload files -> get Downloadable links
      try{
        const bannerImageRef=ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        const uploaded=await uploadBytes(bannerImageRef,bannerImage);
        const bannerImageUrl=await getDownloadURL(bannerImageRef);

        const displayImageRef=ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef,displayImage);
        const displayImageUrl=await getDownloadURL(displayImageRef);

        const podcastData={
          title:title,
          description:desc,
          bannerImage:bannerImageUrl,
          displayImage:displayImageUrl,
          createdBy: auth.currentUser.uid,
        };
        const docRef=await addDoc(collection(db,"podcasts"),podcastData);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        setLoading(false);
        toast.success("Podcast Created!")
        // toast.success("Upload Successful")
      }
      catch(e){
          toast.error(e.message);
          console.log(e.message);
          setLoading(false);

      }
      // 2. create a new Doc in a new collection called podcasts
      // 3. save this new podcasts episodes states into our new podcasts
    }
    else{
      toast.error("Please enter all values")
      setLoading(false);

    }
  }
  const displayImageFileHandleFnc=(file)=>{
    setDisplayImage(file);
  }
  const bannerImageFileHandleFnc=(file)=>{
    setBannerImage(file);
  }

  return (
    <>
        <h1>Create A Podcast</h1>
        <InputComponent 
          type={"text"}
          state={title}
          setState={setTitle}
          placeholder={"Enter Title"}
          required={true}
        />
        <InputComponent 
          type={"text"}
          state={desc}
          setState={setDesc}
          placeholder={"Enter Description"}
          required={true}
        />
        <FileInput accept={"image/*"} id="display-image-input" fileHandleFnc={displayImageFileHandleFnc} text={"import Display Image"}/>
        <FileInput accept={"image/*"} id="banner-image-input" fileHandleFnc={bannerImageFileHandleFnc} text={"Import Banner Image"}/>
        <Button text={loading?"Loading...":"Create A Podcast"} disabled={loading} onClick={handlePodcast} />

    </>
  )
}

export default CreateAPodcastForm