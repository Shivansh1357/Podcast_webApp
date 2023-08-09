import React from 'react'
import CreateAPodcastForm from '../Components/StartAPodcast/CreatePodcastForm'
import Header from '../Components/Common/Header'

const CreateAPodcastPage = () => {
  return (
    <div>
        <Header/>
        <div className='input-wrapper'>
                <CreateAPodcastForm/>
        </div>
    </div>
  )
}

export default CreateAPodcastPage