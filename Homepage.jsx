import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import PodcastCard  from '../components/PodcastCard'

const Homepage = ({token}) => {
    let navigate = useNavigate

    const  [podcastData, setPodcastData] = useState(null)

    //  const PodcastCard = ({podcastData}) => {
        
    //     return (
    //         <div className='preview__display'>
    //             <div className='preview__content'>
    //         {podcastData.map((podcast) => (
            
    //             <button key={podcast.id}>
    //                 <h2 className='preview__title'>{podcast.title}</h2>
    //                 <img className='preview__image' src={podcast.image} width="150px"/>
    //                 <h3 className='preview__description'>{podcast.description}</h3>
    //                 <p className='preview__seasons'>Seasons: {podcast.seasons}</p>
    //                 <p className='preview__genres'>{podcast.genres}</p>
    //                 <p className='preview__updated'>Last updated: {podcast.updated}</p>
    //             </button>  
    //       ))}  
    //       </div>
    //       </div>
    //     )
    // }

 console.log(podcastData)
    
    useEffect(() => {
        fetch('https://podcast-api.netlify.app/shows')
        .then(res => { 
            return res.json()
        })
        .then(data => {
            setPodcastData(data)
        })
    }, [])

    const podcasts = podcastData.map((item) => {
        
        return (
            <PodcastCard 
            key={item.id}
            {...item}
            />
        )
    })

    function handleLogout() {
        sessionStorage.removeItem('token')
        navigate('/') 
    }
    console.log(podcastData)
    return (
        <div className='homepage'>
            <header className="home__header">
            <img src=".\src\images\3.png" width="100px" className="logoImage" />
           <h3 className='welcome'>Welcome back, {token.user.user_metadata.full_name}!</h3> 
           </header>
          {/* {podcastData && <PodcastCard podcastData={podcastData} className='preview__list'/>} */}
         
           <div className="podcastCard">
            <p>{podcasts}</p>
           </div>
            <button onClick={handleLogout}>Logout</button>
            </div>
    )
}

export default Homepage